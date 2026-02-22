import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield, Play, Check } from "lucide-react"

// v2 - Minimalist design refresh
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0">
        <div className="section-padding">
          <div className="container-tight flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Bocco.ai</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Fonctionnalités</Link>
              <Link href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Tarifs</Link>
              <Link href="#testimonials" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Témoignages</Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Connexion
              </Link>
              <Link href="/signup">
                <Button size="sm" className="btn-primary rounded-full px-5">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-60" />
        
        <div className="relative section-padding">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 mb-8 fade-in">
                <Sparkles className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">Nouveau : Création de vidéos faceless</span>
              </div>
              
              {/* Heading */}
              <h1 className="heading-xl text-neutral-900 mb-6 fade-in-up">
                Créez votre{" "}
                <span className="text-gradient-subtle">avatar IA</span>{" "}
                en quelques minutes
              </h1>
              
              {/* Subheading */}
              <p className="body-lg max-w-2xl mx-auto mb-10 fade-in-up stagger-1">
                Transformez votre présence en ligne avec des avatars IA réalistes et des vidéos 
                faceless professionnelles. Le compagnon idéal pour les vendeurs de formations.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up stagger-2">
                <Link href="/signup">
                  <Button size="lg" className="btn-primary rounded-full px-8 text-base">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <button className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                  <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm">Voir la démo</span>
                </button>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 fade-in-up stagger-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Essai gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Sans carte bancaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Annulation à tout moment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 lg:py-32 bg-neutral-50/50">
        <div className="section-padding">
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Fonctionnalités</span>
              <h2 className="heading-lg text-neutral-900 mt-3 mb-4">
                Tout ce qu&apos;il faut pour scaler votre business
              </h2>
              <p className="body-md">
                Une suite complète d&apos;outils IA conçue pour les entrepreneurs et vendeurs de formations en ligne.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group bg-white rounded-2xl p-8 hover-lift border border-neutral-100">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-neutral-900 transition-colors">
                  <Zap className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Avatars IA Réalistes</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Créez votre clone numérique à partir de quelques photos. Notre IA génère des avatars ultra-réalistes.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="group bg-white rounded-2xl p-8 hover-lift border border-neutral-100">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-neutral-900 transition-colors">
                  <Play className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Vidéos Faceless Pro</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Générez des vidéos professionnelles sans montrer votre visage. Idéal pour le marketing d&apos;affiliation.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="group bg-white rounded-2xl p-8 hover-lift border border-neutral-100">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-neutral-900 transition-colors">
                  <Shield className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Crédits Flexibles</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Payez uniquement pour ce que vous utilisez. Les crédits n&apos;expirent jamais et sont valables pour tous les services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Tarifs</span>
              <h2 className="heading-lg text-neutral-900 mt-3 mb-4">
                Simple et transparent
              </h2>
              <p className="body-md">
                Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free/Credits Plan */}
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
                <Link href="/signup" className="block">
                  <Button variant="outline" className="w-full btn-secondary rounded-full">
                    Acheter des crédits
                  </Button>
                </Link>
              </div>
              
              {/* Pro Plan */}
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
                    <Check className="w-4 h-4 text-white" />
                    30 crédits/mois inclus
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white" />
                    Crédits reportés
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white" />
                    Priorité de traitement
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white" />
                    Support prioritaire
                  </li>
                </ul>
                <Link href="/signup" className="block">
                  <Button className="w-full bg-white text-neutral-900 hover:bg-neutral-100 rounded-full">
                    Commencer l&apos;essai
                  </Button>
                </Link>
              </div>
              
              {/* Annual Plan */}
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
                <Link href="/signup" className="block">
                  <Button variant="outline" className="w-full btn-secondary rounded-full">
                    Souscrire
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Discounts */}
            <div className="mt-12 text-center">
              <p className="text-sm text-neutral-500 mb-4">Réductions formations MRR</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-neutral-600">
                  DSA = -5€/mois
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-neutral-600">
                  ASA = -3€/mois
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-neutral-600">
                  Code Liberté = -2€/mois
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32 bg-neutral-50/50">
        <div className="section-padding">
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Témoignages</span>
              <h2 className="heading-lg text-neutral-900 mt-3">
                Ce que disent nos utilisateurs
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Bocco.ai a révolutionné ma façon de créer du contenu. J'ai pu générer 20 vidéos en une seule journée pour promouvoir mes formations.",
                  author: "Thomas Dubois",
                  role: "Créateur de formations"
                },
                {
                  quote: "L'avatar IA est bluffant de réalisme. Mes clients ne réalisent même pas que ce n'est pas moi dans les vidéos. Un gain de temps incroyable.",
                  author: "Marie Laurent",
                  role: "Entrepreneuse MRR"
                },
                {
                  quote: "Le système de crédits est parfait. Je paie uniquement quand j'en ai besoin, pas d'abonnement forcé. Le rapport qualité/prix est imbattable.",
                  author: "Pierre Martin",
                  role: "Affilié marketing"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <p className="text-neutral-600 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{testimonial.author}</p>
                      <p className="text-sm text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-tight">
            <div className="bg-neutral-900 rounded-3xl p-12 lg:p-20 text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Prêt à transformer votre contenu ?
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
                Rejoignez des centaines de créateurs qui utilisent Bocco.ai pour développer leur business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 rounded-full px-8">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-100">
        <div className="section-padding">
          <div className="container-tight">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-semibold">Bocco.ai</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-neutral-600">
                <Link href="/privacy" className="hover:text-neutral-900 transition-colors">Confidentialité</Link>
                <Link href="/terms" className="hover:text-neutral-900 transition-colors">CGU</Link>
                <Link href="/contact" className="hover:text-neutral-900 transition-colors">Contact</Link>
              </div>
              
              <p className="text-sm text-neutral-500">
                © 2026 Bocco.ai. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
