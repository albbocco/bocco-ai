import { NextRequest, NextResponse } from 'next/server';
import { mollieClient } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json({ error: 'No payment ID' }, { status: 400 });
    }

    // Get from database
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('mollie_payment_id', paymentId)
      .single();

    if (error || !payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Get fresh status from Mollie
    let mollieStatus;
    try {
      const molliePayment = await mollieClient.payments.get(paymentId);
      mollieStatus = molliePayment.status;
    } catch (err) {
      console.error('Error fetching from Mollie:', err);
    }

    return NextResponse.json({
      success: true,
      payment: {
        ...payment,
        mollieStatus: mollieStatus || payment.status,
      },
    });
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}
