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
    const finalPrice = Math.max(30, 45 - discount);
    return { discount, finalPrice, savings: 45 - finalPrice };
  };

  const { discount, finalPrice, savings } = updatePrice();

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
              <a href="#how" className="text-sm text-gray-600 hover:text-gray-900 transition">Comment ça marche</a>
              <a href="#formations" className="text-sm text-gray-600 hover:text-gray-900 transition">Formations</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition">Tarifs</a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={openModal} className="text-sm text-gray-600 hover:text-gray-900 transition">Connexion</button>
              <button onClick={openModal} className="btn-primary px-4 py-2 rounded-full text-sm font-medium">Essai Gratuit</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 mb-6">✨ Génère tes 1ers revenus en ligne 2026</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">Même sans expérience,<br/>sans visage,<br/><span className="text-gray-400">sans budget pub</span></h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">Crée ton avatar IA anonyme, génère des vidéos pro automatiquement, et vends tes formations avec un abonnement qui s&apos;adapte à ton investissement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openModal} className="btn-primary px-8 py-4 rounded-full text-lg font-medium">Créer mon avatar gratuit →</button>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 float-animation">
              <div className="text-4xl font-bold text-gray-900 mb-2">3 247</div>
              <div className="text-gray-500">avatars créés</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 float-animation" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-500">vidéos générées</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 float-animation" style={{ animationDelay: '1s' }}>
              <div className="text-4xl font-bold text-gray-900 mb-2">€2.4M</div>
              <div className="text-gray-500">revenus générés</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Comment ça <span className="text-gray-400">marche</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Un système simple : abonnement + crédits. Plus tu investis dans les formations, moins tu paies chaque mois.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Crée ton avatar</h3>
              <p className="text-gray-600">Télécharge une photo ou décris ton avatar idéal. Notre IA génère ton clone numérique en quelques minutes.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Génère des vidéos</h3>
              <p className="text-gray-600">Utilise tes crédits pour créer des vidéos faceless. 1 crédit = vidéo courte, 2 crédits = vidéo longue.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Vends tes formations</h3>
              <p className="text-gray-600">Poste tes vidéos, attire du trafic et vends les formations MRR. Garde 100% des profits.</p>
            </div>
          </div>

          {/* Credits System */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Système de crédits</h3>
              <p className="text-gray-600">Disponible uniquement après abonnement. Aucun engagement, tu ne paies que ce que tu utilises.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Coût des actions</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Création d&apos;avatar</span>
                    <span className="font-bold text-gray-900">1 crédit</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Vidéo courte (&lt;1min)</span>
                    <span className="font-bold text-gray-900">1 crédit</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Vidéo longue (1-2min)</span>
                    <span className="font-bold text-gray-900">2 crédits</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">1 crédit = 1€</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Packs de crédits</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">10€</span>
                    <span className="font-bold text-gray-900">10 crédits</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">30€</span>
                    <span className="font-bold text-gray-900">35 crédits <span className="text-green-600 text-sm">+5 bonus</span></span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">50€</span>
                    <span className="font-bold text-gray-900">65 crédits <span className="text-green-600 text-sm">+15 bonus</span></span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">100€</span>
                    <span className="font-bold text-gray-900">150 crédits <span className="text-green-600 text-sm">+50 bonus</span></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">💡 Ton abonnement inclut 30 crédits/mois. Tu peux acheter des crédits supplémentaires à tout moment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formations MRR Section */}
      <section id="formations" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Formations <span className="text-gray-400">MRR</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Achète une formation, cumule les réductions sur ton abonnement bocco.ai</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DSA */}
            <div className="bg-white rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5 shadow-lg border border-gray-100">
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
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">997€</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">-5€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir DSA</button>
            </div>
            
            {/* ASA */}
            <div className="bg-white rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5 shadow-lg border border-gray-100">
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
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">497€</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">-3€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir ASA</button>
            </div>
            
            {/* Code Liberté */}
            <div className="bg-white rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5 shadow-lg border border-gray-100">
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
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">350€</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">-2€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir Code Liberté</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Calcule ton <span className="text-gray-400">économie</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Plus tu achètes de formations, plus ton abonnement est bas</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Calculateur */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Mes formations</h3>
              
              <label className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer mb-3 hover:bg-gray-50 transition border border-gray-100">
                <input 
                  type="checkbox" 
                  checked={formations.dsa}
                  onChange={(e) => setFormations({...formations, dsa: e.target.checked})}
                  className="w-5 h-5 accent-gray-900"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">DSA</div>
                  <div className="text-sm text-gray-500">997€</div>
                </div>
                <span className="text-green-600 font-semibold">-5€</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer mb-3 hover:bg-gray-50 transition border border-gray-100">
                <input 
                  type="checkbox" 
                  checked={formations.asa}
                  onChange={(e) => setFormations({...formations, asa: e.target.checked})}
                  className="w-5 h-5 accent-gray-900"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">ASA</div>
                  <div className="text-sm text-gray-500">497€</div>
                </div>
                <span className="text-green-600 font-semibold">-3€</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer mb-3 hover:bg-gray-50 transition border border-gray-100">
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
                <span className="text-green-600 font-semibold">-2€</span>
              </label>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Prix de base</span>
                  <span>45€/mois</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Réductions cumulées</span>
                  <span>-{discount}€</span>
                </div>
              </div>
            </div>
            
            {/* Résultat */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Ton abonnement mensuel</h3>
              
              <div className="mb-4">
                <span className="text-6xl font-bold">{finalPrice}€</span>
                {discount > 0 && <span className="text-2xl text-gray-400 line-through ml-2">45€</span>}
                <span className="text-gray-400">/mois</span>
              </div>
              
              <div className="text-green-400 font-semibold mb-8">
                {savings > 0 ? `Économise ${savings}€/mois` : 'Prix de base'}
              </div>
              
              <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 30 crédits/mois inclus</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Avatar IA personnalisé</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Support prioritaire</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Annulable à tout moment</li>
              </ul>
              
              <button onClick={openModal} className="w-full bg-white text-gray-900 py-4 rounded-xl font-medium hover:bg-gray-100 transition">Commencer avec ce tarif</button>
            </div>
          </div>

          {/* Annual Pricing */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Engagement annuel</h3>
                  <p className="text-gray-600">Paiement annuel pour économiser encore plus</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-4xl font-bold text-gray-900">{Math.round(finalPrice * 0.9 * 12)}€<span className="text-lg text-gray-500 font-normal">/an</span></div>
                  <div className="text-green-600 font-medium">Économise 10% ({Math.round(finalPrice * 0.1 * 12)}€)</div>
                  <div className="text-sm text-gray-500">Soit {Math.round(finalPrice * 0.9)}€/mois</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Garanties */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-600">✓</span> Annulable n&apos;importe quand</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-600">✓</span> 30 jours satisfait ou remboursé</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-600">✓</span> Support réactif</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Me <span className="text-gray-400">contacter</span></h2>
              <p className="text-gray-600">Une question ? Je te réponds rapidement.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé !'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Prénom" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-900 outline-none" required />
                <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-900 outline-none" required />
              </div>
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-900 outline-none" required />
              <textarea placeholder="Ton message" rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-900 outline-none" required></textarea>
              <button type="submit" className="w-full btn-primary py-4 rounded-xl font-medium text-lg">Envoyer</button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-600">Ou contacte-moi directement :</p>
              <a href="mailto:contact@bocco.ai" className="text-gray-900 hover:text-gray-600 font-medium">contact@bocco.ai</a>
            </div>
          </div>
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
            <p className="text-gray-600 mb-6">Cette fonctionnalité est en cours de développement. Laisse ton email pour être informé du lancement !</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); alert('Merci ! On te tient au courant.'); }} className="space-y-4">
              <input type="email" placeholder="ton@email.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-900 outline-none" required />
              <button type="submit" className="w-full btn-primary py-3 rounded-xl font-medium">Me tenir informé</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
