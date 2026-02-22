import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Crédits",
    description: "Payez à l'usage, sans engagement",
    price: "1€",
    unit: "par crédit",
    features: [
      "1 crédit = 1 avatar ou 1 vidéo courte",
      "Vidéos longues = 2 crédits",
      "Crédits valables à vie",
      "Support par email",
    ],
    cta: "Acheter des crédits",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "Pour les créateurs réguliers",
    price: "45€",
    unit: "par mois",
    features: [
      "30 crédits inclus par mois",
      "Crédits non utilisés reportés",
      "Priorité de traitement",
      "Support prioritaire",
      "Accès aux nouveautés en avant-première",
    ],
    cta: "Commencer l'essai gratuit",
    href: "/signup",
    popular: true,
  },
  {
    name: "Annuel",
    description: "Économisez 60€ par an",
    price: "40€",
    unit: "par mois",
    badge: "-11%",
    features: [
      "30 crédits inclus par mois",
      "Facturation annuelle (480€)",
      "Équivalent à 16 crédits offerts",
      "Support VIP",
      "API access (bientôt)",
    ],
    cta: "Souscrire à l'annuel",
    href: "/signup",
    popular: false,
  },
]

const formationDiscounts = [
  { name: "DSA", price: "997€", discount: "-5€/mois" },
  { name: "ASA", price: "497€", discount: "-3€/mois" },
  { name: "Code Liberté", price: "350€", discount: "-2€/mois" },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Des tarifs <span className="text-gradient">simples et transparents</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "border-violet-500/50 bg-violet-950/10"
                  : "border-border/50 bg-card/50"
              } backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-violet-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Populaire
                </div>
              )}
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  {plan.badge}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.unit}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formation Discounts */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <span className="text-lg font-medium">Réductions formations MRR</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Possédez déjà une formation ? Bénéficiez de réductions sur votre abonnement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {formationDiscounts.map((formation, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm"
              >
                {formation.name} ({formation.price}) ={" "}
                <span className="text-violet-400">{formation.discount}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
