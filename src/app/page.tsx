'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formations, setFormations] = useState({
    dsa: false,
    asa: false,
    code: false,
    annual: false
  });

  const updatePrice = () => {
    let discount = 0;
    if (formations.dsa) discount += 5;
    if (formations.asa) discount += 3;
    if (formations.code) discount += 2;
    if (formations.annual) discount += 10;
    const finalPrice = Math.max(40, 60 - discount);
    return { discount, finalPrice, savings: 60 - finalPrice };
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
              <p className="text-gray-600">Utilise tes crédits pour créer des vidéos faceless. 1 crédit = 1 avatar OU 1 vidéo courte, 2 crédits = 1 vidéo longue.</p>
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
            
            {/* Comment créer une vidéo */}
            <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-gray-200">
              <h4 className="text-2xl font-bold mb-6 text-gray-900 text-center">Comment créer une vidéo faceless ?</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                  <h5 className="font-bold mb-2">Choisis une vidéo virale</h5>
                  <p className="text-sm text-gray-600">Colle le lien d&apos;une vidéo YouTube ou TikTok qui fonctionne bien dans ta niche.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                  <h5 className="font-bold mb-2">Sélectionne ton avatar</h5>
                  <p className="text-sm text-gray-600">Utilise ton avatar créé chez bocco.ai pour incarner la vidéo.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                  <h5 className="font-bold mb-2">Reçois ta vidéo</h5>
                  <p className="text-sm text-gray-600">Notre IA recrée la vidéo avec ton avatar. Télécharge et poste !</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">💡 1 crédit = 1 vidéo courte (utilise ton avatar existant)</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">🎁</span>
                <h4 className="text-2xl font-bold text-gray-900">30 crédits offerts par mois</h4>
              </div>
              <p className="text-center text-gray-700 text-lg mb-4">
                Avec ton abonnement, tu reçois <strong>30 crédits chaque mois</strong> — soit <strong>1 vidéo par jour</strong> pendant 30 jours.
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-600">
                <span>✓ 30 avatars possibles</span>
                <span>✓ ou 30 vidéos courtes</span>
                <span>✓ ou 15 vidéos longues</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Coût des actions</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">1 avatar</span>
                    <span className="font-bold text-gray-900">1 crédit</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">1 vidéo courte</span>
                    <span className="font-bold text-gray-900">1 crédit</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Vidéo longue</span>
                    <span className="font-bold text-gray-900">2 crédits</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Crédits inclus</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between"><span className="text-gray-600">Starter :</span> <span className="font-bold">15/mois</span></li>
                  <li className="flex justify-between"><span className="text-gray-600">Pro :</span> <span className="font-bold">30/mois</span></li>
                  <li className="flex justify-between"><span className="text-gray-600">Business :</span> <span className="font-bold">100/mois</span></li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  Renouvelés chaque mois
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Crédits supplémentaires</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Besoin de plus de crédits ce mois-ci ?
                </p>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Prix unitaire</span>
                  <span className="font-bold text-gray-900">2€</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Achat à l&apos;unité. Valables 12 mois.
                </p>
              </div>
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

      {/* Pricing Plans Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Choisis ton <span className="text-gray-400">plan</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Un plan pour chaque besoin. Plus tu t&apos;engages, plus tu économises.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan Starter */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-sm text-gray-500">Pour commencer</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900">29€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 15 crédits/mois</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 1 avatar inclus</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Export HD</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Support email</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Max 5 vidéos/jour</li>
              </ul>
              <button onClick={openModal} className="w-full py-3 rounded-xl font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">Choisir Starter</button>
            </div>
            
            {/* Plan Pro */}
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
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 3 avatars inclus</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Export HD + 4K</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Support prioritaire</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Max 10 vidéos/jour</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Analytics dashboard</li>
              </ul>
              <button onClick={openModal} className="w-full bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition">Choisir Pro</button>
            </div>
            
            {/* Plan Business */}
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
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 10 avatars inclus</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 5 utilisateurs</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> API access</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Support dédié</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> White-label</li>
              </ul>
              <button onClick={openModal} className="w-full py-3 rounded-xl font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition">Choisir Business</button>
            </div>
          </div>

          {/* Réductions annuelles */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">Engagement annuel : <span className="font-bold text-gray-900">2 mois offerts</span></p>
            <p className="text-sm text-gray-500">Soit 290€/an (Starter), 590€/an (Pro), 1 490€/an (Business)</p>
          </div>

          {/* Réductions formations */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <h4 className="text-center font-bold text-gray-900 mb-4">Réductions avec les formations MRR</h4>
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-gray-600">DSA (997€) : <span className="font-bold text-green-600">-5€/mois</span></span>
              <span className="text-gray-600">ASA (497€) : <span className="font-bold text-green-600">-3€/mois</span></span>
              <span className="text-gray-600">Code (350€) : <span className="font-bold text-green-600">-2€/mois</span></span>
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
