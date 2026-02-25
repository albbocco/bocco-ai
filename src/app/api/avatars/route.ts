import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const { data: avatars, error } = await supabase
      .from('avatars')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch avatars' }, { status: 500 });
    }

    return NextResponse.json({ success: true, avatars: avatars || [] });
  } catch (error) {
    console.error('Fetch avatars error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
