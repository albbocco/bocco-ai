import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, BookOpen, Lightbulb, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Formations MRR - Bocco.ai",
  description: "Bénéficiez de réductions sur votre abonnement Bocco.ai avec nos formations partenaires.",
}

const formations = [
  {
    name: "DSA",
    fullName: "Digital Startup Academy",
    price: 997,
    discount: 5,
    description: "La formation complète pour créer et scaler votre business digital de A à Z.",
    features: [
      "40+ heures de contenu vidéo",
      "Templates et ressources premium",
      "Accès à la communauté privée",
      "Mises à jour à vie",
    ],
    icon: BookOpen,
  },
  {
    name: "ASA",
    fullName: "Affiliate Startup Academy",
    price: 497,
    discount: 3,
    description: "Maîtrisez l'affiliation marketing et générez des revenus passifs durables.",
    features: [
      "25+ heures de formation",
      "Stratégies avancées d'affiliation",
      "Outils et automations",
      "Coaching mensuel",
    ],
    icon: Lightbulb,
  },
  {
    name: "Code Liberté",
    fullName: "Code Liberté",
    price: 350,
    discount: 2,
    description: "Apprenez à coder et créez vos propres outils et SaaS sans dépendre de personne.",
    features: [
      "30+ heures de tutoriels",
      "Projets pratiques guidés",
      "Code source fourni",
      "Support technique",
    ],
    icon: Code,
  },
]

export default function FormationsPage() {
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
            <Badge className="mb-4 bg-neutral-100 text-neutral-700 hover:bg-neutral-100" variant="secondary">
              Partenariats formations
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Formations MRR
            </h1>
            <p className="text-lg text-neutral-600">
              Investissez dans votre formation et bénéficiez de réductions exclusives sur votre abonnement Bocco.ai.
            </p>
          </div>
        </div>
      </section>

      {/* Formations Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {formations.map((formation, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-neutral-200 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-900" />
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6">
                  <formation.icon className="w-6 h-6 text-neutral-700" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{formation.name}</h3>
                <p className="text-sm text-neutral-500 mb-4">{formation.fullName}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-neutral-900">{formation.price}€</span>
                  <Badge className="ml-2 bg-neutral-900 text-white hover:bg-neutral-800">
                    -{formation.discount}€/mois
                  </Badge>
                </div>
                <p className="text-neutral-600 mb-6">{formation.description}</p>
                <ul className="space-y-3 mb-8">
                  {formation.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <Check className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-neutral-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-center text-neutral-900 mb-12">
              Comment ça marche ?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Achetez la formation", desc: "Investissez dans votre avenir avec nos formations partenaires." },
                { step: "2", title: "Vérifiez votre achat", desc: "Uploadez votre preuve d'achat sur Bocco.ai." },
                { step: "3", title: "Obtenez la réduction", desc: "Votre remise est automatiquement appliquée." },
                { step: "4", title: "Économisez", desc: "Profitez de crédits supplémentaires chaque mois !" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
              ))}
            </div>
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
