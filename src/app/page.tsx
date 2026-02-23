'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.card-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">bocco.ai</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#comment" className="text-sm text-gray-600 hover:text-gray-900 transition">Comment ça marche</a>
              <a href="#tarifs" className="text-sm text-gray-600 hover:text-gray-900 transition">Tarifs</a>
              <a href="#formations" className="text-sm text-gray-600 hover:text-gray-900 transition">Formations</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition">FAQ</a>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={openModal} className="text-sm text-gray-600 hover:text-gray-900 transition">Connexion</button>
              <button onClick={openModal} className="btn-primary px-4 py-2 rounded-full text-sm font-medium">Essai gratuit</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 mb-6">✨ Génère tes 1ers revenus en ligne 2026</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">Crée des vidéos faceless<br/>avec ton <span className="text-gray-400">avatar IA</span></h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">Sans montrer ton visage, sans équipe, sans compétences techniques. Un abonnement, un avatar, des vidéos illimitées.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={openModal} className="btn-primary px-8 py-4 rounded-full text-lg font-medium">Créer mon avatar gratuit →</button>
            <a href="#comment" className="px-8 py-4 rounded-full text-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition">Voir comment ça marche</a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">3 247</div>
              <div className="text-gray-500">créateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-gray-500">vidéos générées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">€2.4M</div>
              <div className="text-gray-500">revenus générés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Comment ça <span className="text-gray-400">marche</span> ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">3 étapes pour créer ton contenu faceless</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 card-animate opacity-0 translate-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Crée ton avatar</h3>
              <p className="text-gray-600">Upload une photo ou décris ton avatar idéal. Notre IA génère ton clone numérique en 2 minutes.</p>
            </div>
            <div className="text-center p-8 card-animate opacity-0 translate-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Clone une vidéo virale</h3>
              <p className="text-gray-600">Colle le lien d&apos;une vidéo qui fonctionne. Notre IA recrée la même vidéo avec ton avatar.</p>
            </div>
            <div className="text-center p-8 card-animate opacity-0 translate-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Poste et monetise</h3>
              <p className="text-gray-600">Télécharge ta vidéo, poste sur les réseaux et vends tes formations MRR. Garde 100% des profits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Choisis ton <span className="text-gray-400">plan</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Commence gratuitement, upgrade quand tu es prêt</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-sm text-gray-500">Pour tester</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900">29€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 15 crédits/mois</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 1 avatar</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Export HD</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Support email</li>
              </ul>
              <button onClick={openModal} className="w-full py-3 rounded-xl font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">Choisir Starter</button>
            </div>
            
            {/* Pro */}
            <div className="bg-gray-900 rounded-3xl p-8 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-gray-900 text-xs font-medium px-4 py-1 rounded-full">POPULAIRE</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-sm text-gray-400">Pour les créateurs</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-white">59€</span>
                <span className="text-gray-400">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 30 crédits/mois (1 vidéo/jour)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 3 avatars</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Export HD + 4K</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Support prioritaire</li>
              </ul>
              <button onClick={openModal} className="w-full bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition">Choisir Pro</button>
            </div>
            
            {/* Business */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
                <p className="text-sm text-gray-500">Pour les agences</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900">149€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 100 crédits/mois</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 10 avatars</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 5 utilisateurs</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> API access</li>
              </ul>
              <button onClick={openModal} className="w-full py-3 rounded-xl font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">Choisir Business</button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">Engagement annuel : <span className="font-bold text-gray-900">2 mois offerts</span> (-17%)</p>
            <p className="text-sm text-gray-500">Starter : 290€/an · Pro : 590€/an · Business : 1 490€/an</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Prêt à créer ton avatar ?</h2>
          <p className="text-xl text-gray-300 mb-8">Commence gratuitement, pas de carte bancaire requise.</p>
          <button onClick={openModal} className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition">Créer mon avatar gratuit →</button>
          <p className="text-sm text-gray-400 mt-4">30 secondes · Gratuit · Sans engagement</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">bocco.ai</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 bocco.ai. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Bientôt disponible</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 text-2xl">×</button>
            </div>
            <p className="text-gray-600 mb-6">Cette fonctionnalité est en cours de développement.</p>
            <button onClick={closeModal} className="w-full btn-primary py-3 rounded-xl font-medium">Compris</button>
          </div>
        </div>
      )}
    </main>
  );
}