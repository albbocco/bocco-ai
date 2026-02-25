import { NextRequest, NextResponse } from 'next/server';
import { mollieClient, FORMATIONS } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formationId, userId, userEmail, userName, redirectUrl } = body;

    // Validate formation
    const formation = FORMATIONS[formationId as keyof typeof FORMATIONS];
    if (!formation) {
      return NextResponse.json({ error: 'Invalid formation' }, { status: 400 });
    }

    const description = `Formation ${formation.name} - bocco.ai`;

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
        value: formation.price.toFixed(2),
      },
      description,
      customerId,
      redirectUrl,
      webhookUrl: `${process.env.NEXTAUTH_URL}/api/webhook/mollie`,
      metadata: {
        userId: userId.toString(),
        type: 'formation',
        formationId,
      },
    });

    // Create formation purchase record
    await supabase
      .from('formation_purchases')
      .insert({
        user_id: userId,
        formation_type: formationId,
        amount_paid: formation.price,
        mollie_payment_id: payment.id,
        status: 'pending',
      });

    return NextResponse.json({
      success: true,
      checkoutUrl: payment.getCheckoutUrl(),
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Formation purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to create formation purchase' },
      { status: 500 }
    );
  }
}
