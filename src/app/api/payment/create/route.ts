import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, PLANS, calculateSubscriptionPrice } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, userId, userEmail, userName, redirectUrl, isAnnual = false } = body;

    // Validate plan
    if (!PLANS[planId as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get user's formations for discount calculation
    const { data: formations } = await supabase
      .from('formation_purchases')
      .select('formation_type')
      .eq('user_id', userId)
      .eq('status', 'completed');

    const formationIds = formations?.map((f) => f.formation_type) || [];
    const { finalPrice, discount } = calculateSubscriptionPrice(planId, formationIds);

    // Calculate annual price if needed (10 months = 2 months free)
    const intervalAmount = isAnnual ? finalPrice * 10 : finalPrice;
    const description = `${PLANS[planId as keyof typeof PLANS].name} ${isAnnual ? 'Annuel' : 'Mensuel'} - bocco.ai`;

    // Check if user already has a Mollie customer ID
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('mollie_customer_id')
      .eq('user_id', userId)
      .single();

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
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase
        .from('subscriptions')
        .update({ plan: planId, status: 'pending', mollie_customer_id: customerId })
        .eq('user_id', userId);
    } else {
      await supabase
        .from('subscriptions')
        .insert({ user_id: userId, plan: planId, status: 'pending', mollie_customer_id: customerId });
    }

    // Create payment record
    await supabase
      .from('payments')
      .insert({
        user_id: userId,
        mollie_payment_id: payment.id,
        amount: intervalAmount,
        currency: 'EUR',
        status: 'pending',
        description,
        metadata: { planId, isAnnual, discount },
      });

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
