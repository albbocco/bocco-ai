import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS, calculateSubscriptionPrice } from '@/lib/mollie';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, userId, userEmail, userName, redirectUrl, isAnnual = false } = body;

    // Validate plan
    if (!PLANS[planId as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get user's formations for discount calculation
    const formations = db
      .prepare('SELECT formation_type FROM formation_purchases WHERE user_id = ? AND status = ?')
      .all(userId, 'completed') as { formation_type: string }[];

    const formationIds = formations.map((f) => f.formation_type);
    const { finalPrice, discount } = calculateSubscriptionPrice(planId, formationIds);

    // Calculate annual price if needed (10 months = 2 months free)
    const intervalAmount = isAnnual ? finalPrice * 10 : finalPrice;
    const description = `${PLANS[planId as keyof typeof PLANS].name} ${isAnnual ? 'Annuel' : 'Mensuel'} - bocco.ai`;

    // Check if user already has a Mollie customer ID
    const existingSub = db
      .prepare('SELECT mollie_customer_id FROM subscriptions WHERE user_id = ?')
      .get(userId) as { mollie_customer_id: string } | undefined;

    let customerId = existingSub?.mollie_customer_id;

    // Create customer if not exists
    if (!customerId) {
      const customer = await mollieClient.customers.create({
        email: userEmail,
        name: userName || userEmail,
        metadata: { userId: userId.toString() },
      });
      customerId = customer.id;
    }

    // Create payment
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: intervalAmount.toFixed(2),
      },
      description,
      customerId,
      redirectUrl,
      webhookUrl: `${process.env.NEXTAUTH_URL}/api/webhook/mollie`,
      metadata: {
        userId: userId.toString(),
        planId,
        isAnnual: isAnnual.toString(),
        discount: discount.toString(),
      },
    } as any);

    // Create or update subscription record
    const existing = db
      .prepare('SELECT id FROM subscriptions WHERE user_id = ?')
      .get(userId);

    if (existing) {
      db.prepare(`
        UPDATE subscriptions 
        SET plan = ?, status = 'pending', mollie_customer_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).run(planId, customerId, userId);
    } else {
      db.prepare(`
        INSERT INTO subscriptions (user_id, plan, status, mollie_customer_id)
        VALUES (?, ?, 'pending', ?)
      `).run(userId, planId, customerId);
    }

    // Create payment record
    db.prepare(`
      INSERT INTO payments (user_id, mollie_payment_id, amount, currency, status, description, metadata)
      VALUES (?, ?, ?, 'EUR', 'pending', ?, ?)
    `).run(userId, payment.id, intervalAmount, description, JSON.stringify({ planId, isAnnual, discount }));

    return NextResponse.json({
      success: true,
      checkoutUrl: payment.getCheckoutUrl(),
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
