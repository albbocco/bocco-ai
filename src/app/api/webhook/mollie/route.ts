import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

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
    const userId = metadata?.userId;

    if (!userId) {
      console.error('No userId in payment metadata');
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }

    // Update payment status
    await supabase
      .from('payments')
      .update({
        status: payment.status,
        paid_at: payment.paidAt || null,
      })
      .eq('mollie_payment_id', id);

    // Handle successful payment
    if (payment.status === 'paid') {
      const paymentType = metadata?.type;

      if (paymentType === 'credits') {
        // Handle credit purchase
        const credits = parseInt(metadata?.credits || '0');
        
        // Update credit balance
        await supabase.rpc('increment_credits', {
          user_id: userId,
          amount: credits,
        });

        // Add transaction record
        await supabase
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: credits,
            type: 'purchase',
            description: `Achat de ${credits} crédits`,
            metadata: { paymentId: id },
          });

      } else if (paymentType === 'formation') {
        // Handle formation purchase
        const formationId = metadata?.formationId;
        
        await supabase
          .from('formation_purchases')
          .update({ status: 'completed' })
          .eq('mollie_payment_id', id);

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

          await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              status: 'active',
              plan: planId,
              current_period_start: new Date().toISOString(),
              current_period_end: periodEnd.toISOString(),
            });

          // Add or update credits
          const { data: existingCredits } = await supabase
            .from('credits')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (existingCredits) {
            await supabase
              .from('credits')
              .update({
                balance: supabase.rpc('increment', { amount: creditsToAdd }),
                monthly_allowance: plan.credits,
              })
              .eq('user_id', userId);
          } else {
            await supabase
              .from('credits')
              .insert({
                user_id: userId,
                balance: creditsToAdd,
                monthly_allowance: plan.credits,
              });
          }

          // Add transaction record
          await supabase
            .from('credit_transactions')
            .insert({
              user_id: userId,
              amount: creditsToAdd,
              type: 'subscription_renewal',
              description: `Abonnement ${plan.name} ${isAnnual ? 'annuel' : 'mensuel'}`,
              metadata: { planId, isAnnual, paymentId: id },
            });
        }
      }

      // Trigger n8n webhook for post-payment actions
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
