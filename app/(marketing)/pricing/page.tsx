import { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Pricing } from "@/components/landing/pricing"

export const metadata: Metadata = {
  title: "Tarifs - Bocco.ai",
  description: "Découvrez nos tarifs transparents. Payez à l'usage avec des crédits ou optez pour un abonnement mensuel avec 30 crédits inclus.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <Pricing />
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions <span className="text-gradient">fréquentes</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Comment fonctionnent les crédits ?",
                a: "Chaque crédit vous permet de créer un avatar ou une vidéo courte (moins d'1 minute). Les vidéos longues (1-2 minutes) coûtent 2 crédits. Les crédits sont valables à vie et ne expirent jamais.",
              },
              {
                q: "Puis-je changer de forfait ?",
                a: "Oui, vous pouvez changer de forfait à tout moment. Si vous passez à un forfait supérieur, la différence vous est facturée au prorata. Si vous descendez, le changement prend effet à la fin de la période en cours.",
              },
              {
                q: "Quels sont les moyens de paiement acceptés ?",
                a: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express) via Stripe. Pour les forfaits annuels, nous acceptons également les virements bancaires sur demande.",
              },
              {
                q: "Comment fonctionnent les réductions formations ?",
                a: "Si vous possédez une formation DSA, ASA ou Code Liberté, vous pouvez bénéficier d'une réduction mensuelle sur votre abonnement. Uploadez simplement votre preuve d'achat dans votre dashboard.",
              },
              {
                q: "Y a-t-il un engagement ?",
                a: "Non, il n'y a aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre dashboard. Vos crédits restants vous restent accessibles même après résiliation.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-border/50 rounded-lg p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
