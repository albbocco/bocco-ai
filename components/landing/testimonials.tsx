import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "Bocco.ai a révolutionné ma façon de créer du contenu. J'ai pu générer 20 vidéos en une seule journée pour promouvoir mes formations. Un gain de temps incroyable !",
    author: "Thomas Dubois",
    role: "Créateur de formations",
    avatar: "TD",
    rating: 5,
  },
  {
    content:
      "L'avatar IA est bluffant de réalisme. Mes clients ne réalisent même pas que ce n'est pas moi dans les vidéos. Ça m'a permis de scaler mon business sans sacrifier ma vie privée.",
    author: "Marie Laurent",
    role: "Entrepreneuse MRR",
    avatar: "ML",
    rating: 5,
  },
  {
    content:
      "Le système de crédits est parfait. Je paie uniquement quand j'en ai besoin, pas d'abonnement forcé. Le rapport qualité/prix est imbattable.",
    author: "Pierre Martin",
    role: "Affilié marketing",
    avatar: "PM",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ce que disent nos <span className="text-gradient">utilisateurs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez des centaines de créateurs qui utilisent Bocco.ai pour développer leur business.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-violet-600 text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
