import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

// Simple hash function (use bcrypt in production)
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
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create user
    const passwordHash = hashPassword(password);
    const result = db.prepare(
      'INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)'
    ).run(email, name || null, passwordHash);

    const userId = result.lastInsertRowid;

    // Create initial credits (0 for new users, they need to subscribe)
    db.prepare(
      'INSERT INTO credits (user_id, balance, monthly_allowance) VALUES (?, 0, 0)'
    ).run(userId);

    // Generate token
    const token = generateToken(userId as number);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: userId,
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
