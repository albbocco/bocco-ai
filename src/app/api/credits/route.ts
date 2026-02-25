import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function verifyToken(token: string, userId: string): boolean {
  const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
  const expected = crypto.createHmac('sha256', secret).update(userId).digest('hex');
  return token === expected;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const userId = req.headers.get('x-user-id');

    if (!userId || !verifyToken(token, userId)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: credits, error } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !credits) {
      return NextResponse.json({ error: 'Credits not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      credits: {
        balance: credits.balance,
        monthly_allowance: credits.monthly_allowance,
      },
    });
  } catch (error) {
    console.error('Get credits error:', error);
    return NextResponse.json(
      { error: 'Failed to get credits' },
      { status: 500 }
    );
  }
}
