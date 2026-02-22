import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (err: any) {
      return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
    }

    const supabase = await createClient()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === "subscription") {
          // Abonnement mensuel/annuel
          const customerId = session.customer as string
          const subscriptionId = session.subscription as string
          const userId = session.metadata?.userId
          const plan = session.metadata?.plan || "base"
          
          if (userId) {
            // Mettre à jour l'utilisateur
            await supabase.from("users").update({
              subscription_status: "active",
              subscription_plan: plan,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              credits_remaining: 30,
              credits_monthly: 30,
            }).eq("id", userId)
            
            // Créer transaction crédits
            await supabase.from("credit_transactions").insert({
              user_id: userId,
              amount: 30,
              type: "monthly",
              description: `Abonnement ${plan} - Attribution mensuelle`,
            })
          }
        } else if (session.mode === "payment") {
          // Achat de crédits supplémentaires
          const userId = session.metadata?.userId
          const credits = parseInt(session.metadata?.credits || "0")
          
          if (userId && credits > 0) {
            await supabase.from("users").update({
              credits_remaining: supabase.rpc("increment_credits", { user_id: userId, amount: credits }),
            }).eq("id", userId)
            
            await supabase.from("credit_transactions").insert({
              user_id: userId,
              amount: credits,
              type: "purchase",
              description: `Achat de ${credits} crédits`,
            })
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        
        // Récupérer l'utilisateur
        const { data: user } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()
        
        if (user) {
          await supabase.from("users").update({
            subscription_status: "past_due",
          }).eq("id", user.id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        const { data: user } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()
        
        if (user) {
          await supabase.from("users").update({
            subscription_status: "cancelled",
          }).eq("id", user.id)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
