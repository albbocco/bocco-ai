'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formations, setFormations] = useState({
    dsa: false,
    asa: false,
    code: false
  });

  const updatePrice = () => {
    let discount = 0;
    if (formations.dsa) discount += 5;
    if (formations.asa) discount += 3;
    if (formations.code) discount += 2;
    return { discount };
  };

  const { discount } = updatePrice();

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

  // Prix de base avec +10€
  const starterPrice = 39;
  const proPrice = 69;
  const businessPrice = 159;

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
              <a href="#abonnement" className="text-sm text-gray-600 hover:text-gray-900 transition">Abonnement</a>
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

      {/* Hero Section */}
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

      {/* Abonnement avec calculateur */}
      <section id="abonnement" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Choisis ton <span className="text-gray-400">abonnement</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Achète une formation et réduis ton abonnement jusqu&apos;à -10€/mois</p>
          </div>

          {/* Calculateur */}
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">Calcule ta réduction</h3>
            
            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <input 
                  type="checkbox" 
                  checked={formations.dsa}
                  onChange={(e) => setFormations({...formations, dsa: e.target.checked})}
                  className="w-5 h-5 accent-gray-900"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">DSA (Digital Success Academy)</div>
                  <div className="text-sm text-gray-500">997€</div>
                </div>
                <span className="text-green-600 font-semibold">-5€/mois</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <input 
                  type="checkbox" 
                  checked={formations.asa}
                  onChange={(e) => setFormations({...formations, asa: e.target.checked})}
                  className="w-5 h-5 accent-gray-900"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">ASA (Advanced Success Academy)</div>
                  <div className="text-sm text-gray-500">497€</div>
                </div>
                <span className="text-green-600 font-semibold">-3€/mois</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <input 
                  type="checkbox" 
                  checked={formations.code}
                  onChange={(e) => setFormations({...formations, code: e.target.checked})}
                  className="w-5 h-5 accent-gray-900"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Code Liberté</div>
                  <div className="text-sm text-gray-500">350€</div>
                </div>
                <span className="text-green-600 font-semibold">-2€/mois</span>
              </label>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-gray-600">Réduction totale : <span className="text-2xl font-bold text-green-600">-{discount}€/mois</span></p>
              <p className="text-sm text-gray-500 mt-1">Sur tous les plans</p>
            </div>
          </div>
          
          {/* 3 Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-sm text-gray-500">Pour tester</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900">{starterPrice - discount}€</span>
                {discount > 0 && <span className="text-xl text-gray-400 line-through ml-2">{starterPrice}€</span>}
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 15 crédits/mois</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 1 avatar</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Export HD</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Support email</li>
                <li className="flex items-center gap-2 text-gray-400 text-xs mt-4 pt-4 border-t"><span>ℹ️</span> 1 crédit supplémentaire = 3€</li>
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
                <span className="text-5xl font-bold text-white">{proPrice - discount}€</span>
                {discount > 0 && <span className="text-xl text-gray-400 line-through ml-2">{proPrice}€</span>}
                <span className="text-gray-400">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 30 crédits/mois (1 vidéo/jour)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 3 avatars</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Export HD + 4K</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Support prioritaire</li>
                <li className="flex items-center gap-2 text-gray-400 text-xs mt-4 pt-4 border-t border-gray-700"><span>ℹ️</span> 1 crédit supplémentaire = 2,50€</li>
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
                <span className="text-5xl font-bold text-gray-900">{businessPrice - discount}€</span>
                {discount > 0 && <span className="text-xl text-gray-400 line-through ml-2">{businessPrice}€</span>}
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 100 crédits/mois</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 10 avatars</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 5 utilisateurs</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> API access</li>
                <li className="flex items-center gap-2 text-gray-400 text-xs mt-4 pt-4 border-t"><span>ℹ️</span> 1 crédit supplémentaire = 2€</li>
              </ul>
              <button onClick={openModal} className="w-full py-3 rounded-xl font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">Choisir Business</button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">Engagement annuel : <span className="font-bold text-gray-900">2 mois offerts</span> (-17%)</p>
            <p className="text-sm text-gray-500">Sur tous les plans</p>
          </div>
        </div>
      </section>

      {/* Formations MRR */}
      <section id="formations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Formations <span className="text-gray-400">MRR</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Achète une formation, réduis ton abonnement à vie</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* DSA */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-2xl font-bold text-white">DSA</div>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">POPULAIRE</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Digital Success Academy</h3>
              <p className="text-gray-600 mb-6">Formation complète par Ayoub Rehane. 48 modules, 200+ vidéos.</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li>✓ 48 modules complets</li>
                <li>✓ 200+ vidéos</li>
                <li>✓ MRR inclus (revends à 100%)</li>
              </ul>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">997€</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">-5€/mois sur ton abo</span>
              </div>
              <button onClick={openModal} className="w-full btn-primary py-3 rounded-xl font-medium">Acheter DSA</button>
            </div>
            
            {/* ASA */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-700 flex items-center justify-center text-2xl font-bold text-white">ASA</div>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">SHORTS</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advanced Success Academy</h3>
              <p className="text-gray-600 mb-6">Focus YouTube Shorts et batching. 45-60 modules.</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li>✓ Focus YouTube Shorts</li>
                <li>✓ Stratégies batching</li>
                <li>✓ MRR inclus</li>
              </ul>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">497€</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">-3€/mois sur ton abo</span>
              </div>
              <button onClick={openModal} className="w-full btn-primary py-3 rounded-xl font-medium">Acheter ASA</button>
            </div>
            
            {/* Code Liberté */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-500 flex items-center justify-center text-2xl font-bold text-white">CL</div>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">PLR</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Code Liberté</h3>
              <p className="text-gray-600 mb-6">18 modules + 20 PLR products prêts à vendre.</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li>✓ 18 modules complets</li>
                <li>✓ 20 PLR products</li>
                <li>✓ MRR inclus</li>
              </ul>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">350€</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">-2€/mois sur ton abo</span>
              </div>
              <button onClick={openModal} className="w-full btn-primary py-3 rounded-xl font-medium">Acheter Code Liberté</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Questions <span className="text-gray-400">fréquentes</span></h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Puis-je essayer gratuitement ?</h3>
              <p className="text-gray-600">Oui ! Tu peux créer ton premier avatar gratuitement. Aucune carte bancaire requise.</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Que se passe-t-il si je dépasse mes crédits ?</h3>
              <p className="text-gray-600">Tu peux acheter des crédits supplémentaires : 3€ sur Starter, 2,50€ sur Pro, 2€ sur Business. Ou upgrader ton plan.</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Comment fonctionnent les réductions des formations ?</h3>
              <p className="text-gray-600">Quand tu achètes une formation MRR, tu obtiens une réduction permanente sur ton abonnement bocco.ai. Ces réductions sont cumulables jusqu&apos;à -10€/mois.</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Puis-je annuler mon abonnement ?</h3>
              <p className="text-gray-600">Oui, à tout moment. Pas de frais, pas de question. Tu gardes tes crédits jusqu&apos;à la fin de la période payée.</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Les vidéos sont-elles libres de droits ?</h3>
              <p className="text-gray-600">Oui, tu as 100% des droits sur les vidéos créées. Tu peux les utiliser commercialement sans restriction.</p>
            </div>
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