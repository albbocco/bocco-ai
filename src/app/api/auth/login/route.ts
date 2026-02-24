import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(userId: number): string {
  const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
  return crypto.createHmac('sha256', secret).update(userId.toString()).digest('hex');
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

    // Get user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
      id: number;
      email: string;
      name: string;
      password_hash: string;
    } | undefined;

    if (!user) {
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
    const credits = db.prepare('SELECT * FROM credits WHERE user_id = ?').get(user.id);

    // Get subscription
    const subscription = db.prepare('SELECT * FROM subscriptions WHERE user_id = ?').get(user.id);

    // Get formations
    const formations = db
      .prepare('SELECT formation_type FROM formation_purchases WHERE user_id = ? AND status = ?')
      .all(user.id, 'completed') as { formation_type: string }[];

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
      formations: formations.map((f) => f.formation_type),
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
