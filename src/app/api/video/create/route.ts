import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, avatarId, prompt, duration = 'short' } = body;

    // Calculate required credits
    const requiredCredits = duration === 'long' ? 2 : 1;

    // Check credits
    const { data: credits } = await supabase
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (!credits || credits.balance < requiredCredits) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
    }

    // Get avatar image
    const { data: avatar } = await supabase
      .from('avatars')
      .select('image_url')
      .eq('id', avatarId)
      .eq('user_id', userId)
      .single();

    if (!avatar?.image_url) {
      return NextResponse.json({ error: 'Avatar not found' }, { status: 404 });
    }

    // Create video record
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({
        user_id: userId,
        avatar_id: avatarId,
        prompt: prompt,
        status: 'processing',
        credits_used: requiredCredits,
      })
      .select()
      .single();

    if (videoError || !video) {
      return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }

    // Call Hailuo API via PiAPI
    const piapiKey = process.env.HAILUO_API_KEY;
    const hailuoResponse = await fetch('https://api.piapi.ai/v1/video/hailuo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${piapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'hailuo-video-2.0',
        prompt: prompt,
        image_url: avatar.image_url,
        duration: duration === 'long' ? 10 : 6,
        aspect_ratio: '9:16',
      }),
    });

    if (!hailuoResponse.ok) {
      await supabase.from('videos').update({ status: 'failed' }).eq('id', video.id);
      return NextResponse.json({ error: 'Hailuo API error' }, { status: 500 });
    }

    const hailuoData = await hailuoResponse.json();

    // Update video with prediction ID
    await supabase
      .from('videos')
      .update({
        hailuo_prediction_id: hailuoData.task_id,
      })
      .eq('id', video.id);

    // Deduct credits
    await supabase
      .from('credits')
      .update({ balance: credits.balance - requiredCredits })
      .eq('user_id', userId);

    // Add transaction
    await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: -requiredCredits,
      type: 'usage',
      description: `Video generation (${duration})`,
    });

    return NextResponse.json({
      success: true,
      video: {
        id: video.id,
        task_id: hailuoData.task_id,
        status: 'processing',
      },
    });
  } catch (error) {
    console.error('Video creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
