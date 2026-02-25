import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, prompt } = body;

    // Check credits
    const { data: credits } = await supabase
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (!credits || credits.balance < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
    }

    // Create avatar record
    const { data: avatar, error: avatarError } = await supabase
      .from('avatars')
      .insert({
        user_id: userId,
        name: name,
        status: 'processing',
      })
      .select()
      .single();

    if (avatarError || !avatar) {
      return NextResponse.json({ error: 'Failed to create avatar' }, { status: 500 });
    }

    // Call FAL.ai API
    const falKey = process.env.FAL_AI_KEY;
    const falResponse = await fetch('https://api.fal.ai/v1/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt || 'Professional portrait photo, high quality, detailed face, studio lighting',
        image_size: '1024x1024',
        num_inference_steps: 4,
      }),
    });

    if (!falResponse.ok) {
      await supabase.from('avatars').update({ status: 'failed' }).eq('id', avatar.id);
      return NextResponse.json({ error: 'FAL.ai API error' }, { status: 500 });
    }

    const falData = await falResponse.json();

    // Update avatar with image URL
    await supabase
      .from('avatars')
      .update({
        image_url: falData.images?.[0]?.url || falData.image?.url,
        status: 'completed',
        fal_ai_prediction_id: falData.request_id,
      })
      .eq('id', avatar.id);

    // Deduct credit
    await supabase
      .from('credits')
      .update({ balance: credits.balance - 1 })
      .eq('user_id', userId);

    // Add transaction
    await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: -1,
      type: 'usage',
      description: 'Avatar generation',
    });

    return NextResponse.json({
      success: true,
      avatar: {
        id: avatar.id,
        image_url: falData.images?.[0]?.url || falData.image?.url,
      },
    });
  } catch (error) {
    console.error('Avatar creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
