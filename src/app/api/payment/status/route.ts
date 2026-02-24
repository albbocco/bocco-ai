import { NextRequest, NextResponse } from 'next/server';
import { mollieClient } from '@/lib/mollie';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json({ error: 'No payment ID' }, { status: 400 });
    }

    // Get from database first
    const payment = db
      .prepare('SELECT * FROM payments WHERE mollie_payment_id = ?')
      .get(paymentId) as { status: string } | undefined;

    if (!payment) {
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
