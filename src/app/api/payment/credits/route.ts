import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, userName, amount, redirectUrl } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Get user's plan for credit pricing
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    const planId = sub?.plan || 'starter';
    const creditPrice = PLANS[planId as keyof typeof PLANS].extraCreditPrice;
    const totalPrice = amount * creditPrice;

    const description = `${amount} crédits supplémentaires - bocco.ai`;

    // Get or create Mollie customer
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('mollie_customer_id')
      .eq('user_id', userId)
      .single();

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
    await supabase
      .from('payments')
      .insert({
        user_id: userId,
        mollie_payment_id: payment.id,
        amount: totalPrice,
        currency: 'EUR',
        status: 'pending',
        description,
        metadata: { type: 'credits', credits: amount },
      });

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
