import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      userId,
      videoId,
      previewUrl,
      finalUrl,
      status,
      format,
      creditsUsed,
      error,
    } = body

    if (!userId || !videoId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    if (status === "completed") {
      // Mettre à jour la vidéo
      await (supabase
        .from("videos") as any)
        .update({
          preview_url: previewUrl,
          final_url: finalUrl,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", videoId)
        .eq("user_id", userId)

      // Déduire les crédits
      await supabase.rpc("decrement_credits", {
        user_id: userId,
        amount: creditsUsed,
      })

      await (supabase.from("credit_transactions") as any).insert({
        user_id: userId,
        amount: -creditsUsed,
        type: "usage",
        description: `Création vidéo ${format}`,
        related_video_id: videoId,
      })

      return NextResponse.json({ success: true })
    } else if (status === "failed") {
      // Marquer comme failed
      await (supabase
        .from("videos") as any)
        .update({ status: "failed" })
        .eq("id", videoId)
        .eq("user_id", userId)

      // Rembourser les crédits
      await supabase.rpc("increment_credits", {
        user_id: userId,
        amount: creditsUsed,
      })

      await (supabase.from("credit_transactions") as any).insert({
        user_id: userId,
        amount: creditsUsed,
        type: "refund",
        description: `Remboursement - Échec création vidéo: ${error}`,
        related_video_id: videoId,
      })

      return NextResponse.json({ refunded: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("n8n video webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
