import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Video, Wallet } from "lucide-react"

const features = [
  {
    icon: UserCircle,
    title: "Avatars IA Réalistes",
    description:
      "Créez votre clone numérique à partir de quelques photos. Notre IA génère des avatars ultra-réalistes prêts à animer vos vidéos.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Video,
    title: "Vidéos Faceless Pro",
    description:
      "Générez des vidéos professionnelles sans montrer votre visage. Idéal pour le marketing d'affiliation et la vente de formations.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Wallet,
    title: "Crédits Flexibles",
    description:
      "Payez uniquement pour ce que vous utilisez. Les crédits ne expirent jamais et sont valables pour tous les services.",
    gradient: "from-emerald-500 to-teal-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tout ce qu&apos;il faut pour <span className="text-gradient">booster vos ventes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une suite complète d&apos;outils IA conçue pour les entrepreneurs et vendeurs de formations en ligne.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300 hover-lift"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
