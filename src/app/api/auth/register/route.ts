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
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create user
    const passwordHash = hashPassword(password);
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        name: name || null,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create initial credits
    await supabase
      .from('credits')
      .insert({
        user_id: user.id,
        balance: 0,
        monthly_allowance: 0,
      });

    // Generate token
    const token = generateToken(user.id);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email,
        name: name || null,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
