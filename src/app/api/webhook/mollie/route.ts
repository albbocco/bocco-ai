import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS } from '@/lib/mollie';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const id = body.get('id') as string;

    if (!id) {
      return NextResponse.json({ error: 'No payment ID' }, { status: 400 });
    }

    // Get payment details from Mollie
    const payment = await mollieClient.payments.get(id);
    const metadata = payment.metadata as Record<string, string>;
    const userId = parseInt(metadata?.userId || '0');

    if (!userId) {
      console.error('No userId in payment metadata');
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }

    // Update payment status
    db.prepare(`
      UPDATE payments 
      SET status = ?, paid_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE mollie_payment_id = ?
    `).run(payment.status, payment.paidAt || null, id);

    // Handle successful payment
    if (payment.status === 'paid') {
      const paymentType = metadata?.type;

      if (paymentType === 'credits') {
        // Handle credit purchase
        const credits = parseInt(metadata?.credits || '0');
        
        // Update credit balance
        db.prepare(`
          UPDATE credits 
          SET balance = balance + ?, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).run(credits, userId);

        // Add transaction record
        db.prepare(`
          INSERT INTO credit_transactions (user_id, amount, type, description, metadata)
          VALUES (?, ?, 'purchase', ?, ?)
        `).run(userId, credits, `Achat de ${credits} crédits`, JSON.stringify({ paymentId: id }));

      } else if (paymentType === 'formation') {
        // Handle formation purchase
        const formationId = metadata?.formationId;
        
        db.prepare(`
          UPDATE formation_purchases 
          SET status = 'completed', updated_at = CURRENT_TIMESTAMP
          WHERE mollie_payment_id = ?
        `).run(id);

        // Get formation discount
        const { FORMATIONS } = await import('@/lib/mollie');
        const formation = FORMATIONS[formationId as keyof typeof FORMATIONS];
        
        if (formation) {
          // Apply discount to subscription
          db.prepare(`
            UPDATE subscriptions 
            SET updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
          `).run(userId);
        }

      } else {
        // Handle subscription payment
        const planId = metadata?.planId;
        const isAnnual = metadata?.isAnnual === 'true';

        if (planId && PLANS[planId as keyof typeof PLANS]) {
          const plan = PLANS[planId as keyof typeof PLANS];
          const creditsToAdd = isAnnual ? plan.credits * 12 : plan.credits;

          // Update subscription status
          const periodEnd = new Date();
          if (isAnnual) {
            periodEnd.setFullYear(periodEnd.getFullYear() + 1);
          } else {
            periodEnd.setMonth(periodEnd.getMonth() + 1);
          }

          db.prepare(`
            UPDATE subscriptions 
            SET status = 'active', 
                plan = ?,
                current_period_start = CURRENT_TIMESTAMP,
                current_period_end = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
          `).run(planId, periodEnd.toISOString(), userId);

          // Add or update credits
          const existingCredits = db
            .prepare('SELECT id FROM credits WHERE user_id = ?')
            .get(userId);

          if (existingCredits) {
            db.prepare(`
              UPDATE credits 
              SET balance = balance + ?, 
                  monthly_allowance = ?,
                  updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ?
            `).run(creditsToAdd, plan.credits, userId);
          } else {
            db.prepare(`
              INSERT INTO credits (user_id, balance, monthly_allowance)
              VALUES (?, ?, ?)
            `).run(userId, creditsToAdd, plan.credits);
          }

          // Add transaction record
          db.prepare(`
            INSERT INTO credit_transactions (user_id, amount, type, description, metadata)
            VALUES (?, ?, 'subscription_renewal', ?, ?)
          `).run(userId, creditsToAdd, `Abonnement ${plan.name} ${isAnnual ? 'annuel' : 'mensuel'}`, JSON.stringify({ planId, isAnnual, paymentId: id }));
        }
      }

      // Trigger n8n webhook for post-payment actions (emails, etc.)
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        try {
          await fetch(`${n8nWebhookUrl}/payment-success`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              paymentId: id,
              type: paymentType,
              amount: payment.amount.value,
              metadata,
            }),
          });
        } catch (err) {
          console.error('N8N webhook error:', err);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
