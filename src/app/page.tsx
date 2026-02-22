import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">Bocco.ai</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</Link>
              <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tarifs</Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900">
                Connexion
              </Link>
              <Link 
                href="/signup" 
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-8">
              <span className="text-sm text-gray-600">✨ Nouveau : Création de vidéos faceless</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Créez votre avatar IA en quelques minutes
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Transformez votre présence en ligne avec des avatars IA réalistes et des vidéos 
              faceless professionnelles. Le compagnon idéal pour les vendeurs de formations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                href="/signup"
                className="bg-gray-900 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
              >
                Commencer gratuitement
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Essai gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Annulation à tout moment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Fonctionnalités</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-3 mb-4">
              Tout ce qu&apos;il faut pour scaler votre business
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Une suite complète d&apos;outils IA conçue pour les entrepreneurs et vendeurs de formations en ligne.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Avatars IA Réalistes</h3>
              <p className="text-gray-600 leading-relaxed">
                Créez votre clone numérique à partir de quelques photos. Notre IA génère des avatars ultra-réalistes.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vidéos Faceless Pro</h3>
              <p className="text-gray-600 leading-relaxed">
                Générez des vidéos professionnelles sans montrer votre visage. Idéal pour le marketing d&apos;affiliation.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crédits Flexibles</h3>
              <p className="text-gray-600 leading-relaxed">
                Payez uniquement pour ce que vous utilisez. Les crédits n&apos;expirent jamais et sont valables pour tous les services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tarifs</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-3 mb-4">
              Simple et transparent
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crédits</h3>
              <p className="text-sm text-gray-500 mb-6">Payez à l&apos;usage</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">1€</span>
                <span className="text-gray-500">/crédit</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 crédit = 1 avatar ou vidéo
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Crédits valables à vie
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support par email
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-full border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Acheter des crédits
              </Link>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                  Populaire
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <p className="text-sm text-gray-400 mb-6">Pour les créateurs réguliers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">45€</span>
                <span className="text-gray-400">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30 crédits/mois inclus
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Crédits reportés
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priorité de traitement
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support prioritaire
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
              >
                Commencer l&apos;essai
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Annuel</h3>
              <p className="text-sm text-gray-500 mb-6">Économisez 60€/an</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">40€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30 crédits/mois inclus
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Facturation annuelle
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support VIP
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access (bientôt)
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-full border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Souscrire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl p-12 lg:p-20 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à transformer votre contenu ?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Rejoignez des centaines de créateurs qui utilisent Bocco.ai pour développer leur business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup"
                className="bg-white text-gray-900 px-8 py-3 rounded-full text-base font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Commencer gratuitement
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/pricing"
                className="border border-gray-700 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-gray-900">Bocco.ai</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">Confidentialité</Link>
              <Link href="/terms" className="hover:text-gray-900">CGU</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
            <p className="text-sm text-gray-500">© 2026 Bocco.ai</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
