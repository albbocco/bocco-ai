import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
  return crypto.createHmac('sha256', secret).update(userId).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Get user from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordHash = hashPassword(password);
    if (passwordHash !== user.password_hash) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id);

    // Get credits
    const { data: credits } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get formations
    const { data: formations } = await supabase
      .from('formations_purchases')
      .select('formation_type')
      .eq('user_id', user.id)
      .eq('status', 'completed');

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      credits: credits || { balance: 0, monthly_allowance: 0 },
      subscription: subscription || null,
      formations: formations?.map((f: any) => f.formation_type) || [],
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
