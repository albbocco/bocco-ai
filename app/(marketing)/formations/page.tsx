import { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, BookOpen, Code, Lightbulb } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Formations MRR - Bocco.ai",
  description: "Bénéficiez de réductions sur votre abonnement Bocco.ai avec nos formations partenaires DSA, ASA et Code Liberté.",
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
    color: "from-blue-500 to-cyan-600",
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
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Code Liberté",
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
    color: "from-emerald-500 to-teal-600",
  },
]

export default function FormationsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Partenariats formations
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Formations <span className="text-gradient">MRR</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Investissez dans votre formation et bénéficiez de réductions exclusives sur votre abonnement Bocco.ai.
            </p>
          </div>

          {/* Formation Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {formations.map((formation, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${formation.color}`} />
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${formation.color} flex items-center justify-center mb-4`}>
                    <formation.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{formation.name}</CardTitle>
                  <CardDescription>{formation.fullName}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{formation.price}€</span>
                    <Badge className="ml-2" variant="secondary">
                      -{formation.discount}€/mois sur Bocco.ai
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{formation.description}</p>
                  <ul className="space-y-3">
                    {formation.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full">En savoir plus</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
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
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
