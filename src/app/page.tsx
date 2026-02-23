'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formations, setFormations] = useState({
    dsa: false,
    asa: false,
    code: false
  });

  const updatePrice = () => {
    let discount = 0;
    if (formations.dsa) discount += 10;
    if (formations.asa) discount += 5;
    if (formations.code) discount += 5;
    return { discount, finalPrice: Math.max(10, 30 - discount), savings: 30 - Math.max(10, 30 - discount) };
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
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500"></div>
              <span className="text-xl font-semibold tracking-tight">AvatarStudio</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#formations" className="text-sm text-gray-300 hover:text-white transition">Formations</a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition">Tarifs</a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-white transition">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={openModal} className="text-sm text-gray-300 hover:text-white transition">Connexion</button>
              <button onClick={openModal} className="btn-primary px-4 py-2 rounded-full text-sm font-medium">Essai Gratuit</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-purple-300 mb-6">✨ Génère tes 1ers revenus en ligne 2026</span>
          <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-tight mb-6">Même sans expérience,<br/>sans visage,<br/><span className="gradient-text">sans budget pub</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">Crée ton avatar IA anonyme, génère 10 vidéos pro automatiquement, et vends tes formations avec l&apos;argument &quot;Abo IA 10€/mois&quot; imbattable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openModal} className="btn-primary px-8 py-4 rounded-full text-lg font-medium">Créer mon avatar gratuit →</button>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-6 float-animation">
              <div className="text-4xl font-bold gradient-text mb-2">3 247</div>
              <div className="text-gray-400">avatars créés</div>
            </div>
            <div className="glass rounded-2xl p-6 float-animation" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-gray-400">vidéos générées</div>
            </div>
            <div className="glass rounded-2xl p-6 float-animation" style={{ animationDelay: '1s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">€2.4M</div>
              <div className="text-gray-400">revenus générés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations MRR Section */}
      <section id="formations" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Formations <span className="gradient-text">MRR</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Achète une formation, cumule les réductions sur ton abonnement AvatarStudio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DSA */}
            <div className="glass rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold">DSA</div>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">POPULAIRE</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Success Academy</h3>
              <p className="text-gray-400 mb-6">Formation complète par Ayoub Rehane. 48 modules, 200+ vidéos.</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>✓ 48 modules complets</li>
                <li>✓ 200+ vidéos</li>
                <li>✓ MRR inclus (revends à 100%)</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">997€</span>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">-10€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir DSA</button>
            </div>
            
            {/* ASA */}
            <div className="glass rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-2xl font-bold">ASA</div>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">SHORTS</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced Success Academy</h3>
              <p className="text-gray-400 mb-6">Focus YouTube Shorts et batching. 45-60 modules.</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>✓ Focus YouTube Shorts</li>
                <li>✓ Stratégies batching</li>
                <li>✓ MRR inclus</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">497€</span>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">-5€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir ASA</button>
            </div>
            
            {/* Code Liberté */}
            <div className="glass rounded-3xl p-8 card-hover card-animate opacity-0 translate-y-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl font-bold">CL</div>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">PLR</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Code Liberté</h3>
              <p className="text-gray-400 mb-6">18 modules + 20 PLR products prêts à vendre.</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>✓ 18 modules complets</li>
                <li>✓ 20 PLR products</li>
                <li>✓ MRR inclus</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">350€</span>
                <span className="credit-badge px-3 py-1 rounded-full text-xs font-medium">-5€/mois</span>
              </div>
              <button onClick={openModal} className="w-full mt-6 btn-primary py-3 rounded-xl font-medium">Choisir Code Liberté</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="pricing" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Calcule ton <span className="gradient-text">économie</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Plus tu achètes de formations, plus ton abonnement est bas</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Calculateur */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Mes formations</h3>
              
              <label className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl cursor-pointer mb-3 hover:bg-white/[0.05] transition">
                <input 
                  type="checkbox" 
                  checked={formations.dsa}
                  onChange={(e) => setFormations({...formations, dsa: e.target.checked})}
                  className="w-5 h-5 accent-purple-500"
                />
                <div className="flex-1">
                  <div className="font-semibold">DSA</div>
                  <div className="text-sm text-gray-400">997€</div>
                </div>
                <span className="text-green-500 font-semibold">-10€</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl cursor-pointer mb-3 hover:bg-white/[0.05] transition">
                <input 
                  type="checkbox" 
                  checked={formations.asa}
                  onChange={(e) => setFormations({...formations, asa: e.target.checked})}
                  className="w-5 h-5 accent-purple-500"
                />
                <div className="flex-1">
                  <div className="font-semibold">ASA</div>
                  <div className="text-sm text-gray-400">497€</div>
                </div>
                <span className="text-green-500 font-semibold">-5€</span>
              </label>
              
              <label className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl cursor-pointer mb-3 hover:bg-white/[0.05] transition">
                <input 
                  type="checkbox" 
                  checked={formations.code}
                  onChange={(e) => setFormations({...formations, code: e.target.checked})}
                  className="w-5 h-5 accent-purple-500"
                />
                <div className="flex-1">
                  <div className="font-semibold">Code Liberté</div>
                  <div className="text-sm text-gray-400">350€</div>
                </div>
                <span className="text-green-500 font-semibold">-5€</span>
              </label>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between mb-2 text-gray-400">
                  <span>Prix de base</span>
                  <span>30€/mois</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Réductions cumulées</span>
                  <span>-{discount}€</span>
                </div>
              </div>
            </div>
            
            {/* Résultat */}
            <div className="glass rounded-3xl p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', borderColor: 'rgba(99,102,241,0.3)' }}>
              <h3 className="text-xl font-bold mb-6">Ton abonnement</h3>
              
              <div className="mb-4">
                <span className="text-6xl font-bold gradient-text">{finalPrice}€</span>
                {discount > 0 && <span className="text-2xl text-gray-400 line-through ml-2">30€</span>}
                <span className="text-gray-400">/mois</span>
              </div>
              
              <div className="text-green-500 font-semibold mb-8">
                {savings > 0 ? `Économise ${savings}€/mois` : 'Prix de base'}
              </div>
              
              <ul className="space-y-2 mb-8 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Avatar IA personnalisé</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 10 vidéos/mois incluses</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 12 styles d&apos;avatars</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Support prioritaire</li>
              </ul>
              
              <button onClick={openModal} className="w-full btn-primary py-4 rounded-xl font-medium">Commencer avec ce tarif</button>
            </div>
          </div>
          
          {/* Garanties */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-400"><span className="text-green-500">✓</span> Annulable n&apos;importe quand</div>
            <div className="flex items-center gap-2 text-sm text-gray-400"><span className="text-green-500">✓</span> Pas de carte requise</div>
            <div className="flex items-center gap-2 text-sm text-gray-400"><span className="text-green-500">✓</span> 30j satisfait remboursé</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Me <span className="gradient-text">contacter</span></h2>
              <p className="text-gray-400">Une question ? Je te réponds rapidement.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé !'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Prénom" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none" required />
                <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none" required />
              </div>
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none" required />
              <textarea placeholder="Ton message" rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none" required></textarea>
              <button type="submit" className="w-full btn-primary py-4 rounded-xl font-medium text-lg">Envoyer</button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-400">Ou contacte-moi directement :</p>
              <a href="mailto:contact@avatarstudio.com" className="text-purple-400 hover:text-purple-300">contact@avatarstudio.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500"></div>
              <span className="text-xl font-semibold">AvatarStudio</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 AvatarStudio. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="glass rounded-3xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Bientôt disponible</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <p className="text-gray-400 mb-6">Cette fonctionnalité est en cours de développement. Laisse ton email pour être informé du lancement !</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); alert('Merci ! On te tient au courant.'); }} className="space-y-4">
              <input type="email" placeholder="ton@email.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none" required />
              <button type="submit" className="w-full btn-primary py-3 rounded-xl font-medium">Me tenir informé</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
