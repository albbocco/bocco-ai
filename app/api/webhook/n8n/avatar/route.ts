import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      userId,
      avatarId,
      imageUrl,
      videoUrl,
      status,
      error,
    } = body

    if (!userId || !avatarId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    if (status === "completed") {
      // Mettre à jour l'avatar avec les URLs
      await (supabase
        .from("avatars") as any)
        .update({
          image_url: imageUrl,
          video_url: videoUrl,
          status: "active",
        })
        .eq("id", avatarId)
        .eq("user_id", userId)

      // Déduire les crédits (si pas gratuit)
      const { data: avatar } = await (supabase
        .from("avatars") as any)
        .select("is_free")
        .eq("id", avatarId)
        .single()

      if (!avatar?.is_free) {
        // Déduire 1 crédit
        await (supabase.rpc as any)("decrement_credits", {
          user_id: userId,
          amount: 1,
        })

        await (supabase.from("credit_transactions") as any).insert({
          user_id: userId,
          amount: -1,
          type: "usage",
          description: "Création d'avatar",
          related_avatar_id: avatarId,
        })
      }

      // Envoyer email confirmation (via Brevo/n8n)
      // Cette partie est gérée par n8n

      return NextResponse.json({ success: true })
    } else if (status === "failed") {
      // Marquer comme failed
      await (supabase
        .from("avatars") as any)
        .update({ status: "failed" })
        .eq("id", avatarId)
        .eq("user_id", userId)

      // Rembourser les crédits si déduits
      await (supabase.rpc as any)("increment_credits", {
        user_id: userId,
        amount: 1,
      })

      await (supabase.from("credit_transactions") as any).insert({
        user_id: userId,
        amount: 1,
        type: "refund",
        description: `Remboursement - Échec création avatar: ${error}`,
        related_avatar_id: avatarId,
      })

      return NextResponse.json({ refunded: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("n8n avatar webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
