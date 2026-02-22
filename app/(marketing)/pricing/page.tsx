import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Tarifs - Bocco.ai",
  description: "Découvrez nos tarifs transparents. Payez à l'usage avec des crédits ou optez pour un abonnement mensuel avec 30 crédits inclus.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-lg">Bocco.ai</span>
            </Link>
            <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900">
              Connexion
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Tarifs</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mt-4 mb-6">
              Simple et transparent
            </h1>
            <p className="text-lg text-neutral-600">
              Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Credits */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Crédits</h3>
              <p className="text-sm text-neutral-500 mb-6">Payez à l&apos;usage</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900">1€</span>
                <span className="text-neutral-500">/crédit</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  1 crédit = 1 avatar ou vidéo
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  Crédits valables à vie
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  Support par email
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full rounded-full border-neutral-200 hover:bg-neutral-50">
                  Acheter des crédits
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-neutral-900 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-neutral-900 text-xs font-medium px-3 py-1 rounded-full">
                  Populaire
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <p className="text-sm text-neutral-400 mb-6">Pour les créateurs réguliers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">45€</span>
                <span className="text-neutral-400">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4" />
                  30 crédits/mois inclus
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4" />
                  Crédits reportés
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4" />
                  Priorité de traitement
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4" />
                  Support prioritaire
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-white text-neutral-900 hover:bg-neutral-100 rounded-full">
                  Commencer l&apos;essai
                </Button>
              </Link>
            </div>

            {/* Annual */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Annuel</h3>
              <p className="text-sm text-neutral-500 mb-6">Économisez 60€/an</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900">40€</span>
                <span className="text-neutral-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  30 crédits/mois inclus
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  Facturation annuelle
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  Support VIP
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-neutral-900" />
                  API access (bientôt)
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full rounded-full border-neutral-200 hover:bg-neutral-50">
                  Souscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Comment fonctionnent les crédits ?",
                a: "Chaque crédit vous permet de créer un avatar ou une vidéo courte (moins d'1 minute). Les vidéos longues (1-2 minutes) coûtent 2 crédits. Les crédits sont valables à vie.",
              },
              {
                q: "Puis-je changer de forfait ?",
                a: "Oui, vous pouvez changer de forfait à tout moment. Si vous passez à un forfait supérieur, la différence vous est facturée au prorata.",
              },
              {
                q: "Quels sont les moyens de paiement acceptés ?",
                a: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express) via Stripe.",
              },
              {
                q: "Comment fonctionnent les réductions formations ?",
                a: "Si vous possédez une formation DSA, ASA ou Code Liberté, vous pouvez bénéficier d'une réduction mensuelle sur votre abonnement.",
              },
              {
                q: "Y a-t-il un engagement ?",
                a: "Non, il n'y a aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre dashboard.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold">Bocco.ai</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <Link href="/privacy" className="hover:text-neutral-900">Confidentialité</Link>
              <Link href="/terms" className="hover:text-neutral-900">CGU</Link>
              <Link href="/contact" className="hover:text-neutral-900">Contact</Link>
            </div>
            <p className="text-sm text-neutral-500">© 2026 Bocco.ai</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
