import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS } from '@/lib/mollie';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, userName, amount, redirectUrl } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Get user's plan for credit pricing
    const sub = db
      .prepare('SELECT plan FROM subscriptions WHERE user_id = ? AND status = ?')
      .get(userId, 'active') as { plan: keyof typeof PLANS } | undefined;

    const planId = sub?.plan || 'starter';
    const creditPrice = PLANS[planId].extraCreditPrice;
    const totalPrice = amount * creditPrice;

    const description = `${amount} crédits supplémentaires - bocco.ai`;

    // Get or create Mollie customer
    const existingSub = db
      .prepare('SELECT mollie_customer_id FROM subscriptions WHERE user_id = ?')
      .get(userId) as { mollie_customer_id: string } | undefined;

    let customerId = existingSub?.mollie_customer_id;

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
        value: totalPrice.toFixed(2),
      },
      description,
      customerId,
      redirectUrl,
      webhookUrl: `${process.env.NEXTAUTH_URL}/api/webhook/mollie`,
      metadata: {
        userId: userId.toString(),
        type: 'credits',
        credits: amount.toString(),
      },
    });

    // Create payment record
    db.prepare(`
      INSERT INTO payments (user_id, mollie_payment_id, amount, currency, status, description, metadata)
      VALUES (?, ?, ?, 'EUR', 'pending', ?, ?)
    `).run(userId, payment.id, totalPrice, description, JSON.stringify({ type: 'credits', credits: amount }));

    return NextResponse.json({
      success: true,
      checkoutUrl: payment.getCheckoutUrl(),
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Credit purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to create credit purchase' },
      { status: 500 }
    );
  }
}
