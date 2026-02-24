# BOCCO.AI - Avatar & Video Generation Platform

Plateforme SaaS de génération de contenu IA (avatars et vidéos) avec modèle d'abonnement et crédits.

## 🚀 Stack Technique

- **Frontend**: Next.js 14 + React + Tailwind CSS
- **Backend**: Next.js API Routes + SQLite
- **Paiements**: Mollie
- **Automatisation**: n8n
- **AI APIs**: FAL.ai (avatars), Hailuo (vidéos), VEED (lip-sync), Unreal Speech (TTS)
- **Stockage**: Cloudflare R2

## 📁 Structure du projet

```
bocco-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/           # Routes auth (register/login)
│   │   │   ├── payment/        # Routes paiement (create/credits/formation/status)
│   │   │   ├── webhook/        # Webhooks Mollie
│   │   │   └── credits/        # Gestion crédits
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Layout app
│   │   └── globals.css         # Styles globaux
│   ├── lib/
│   │   ├── db.ts               # Base de données SQLite
│   │   └── mollie.ts           # Configuration Mollie
│   └── scripts/
│       └── init-db.ts          # Script init DB
├── n8n-workflows/              # Workflows n8n (JSON)
│   ├── create-avatar.json
│   ├── create-video.json
│   └── video-completion.json
└── .env.example                # Variables d'environnement
```

## 🛠️ Installation

### 1. Cloner et installer

```bash
git clone <repo>
cd bocco-ai
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
# Éditer .env.local avec vos clés API
```

### 3. Initialiser la base de données

```bash
mkdir -p data
npx ts-node src/scripts/init-db.ts
```

### 4. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000

## 💳 Configuration Mollie

1. Créer un compte sur https://mollie.com
2. Récupérer votre clé API test/live
3. Configurer le webhook URL: `https://votre-domaine.com/api/webhook/mollie`
4. Tester en mode sandbox

## 🤖 Workflows n8n

### Import des workflows

1. Démarrer n8n: `n8n start`
2. Ouvrir http://localhost:5678
3. Menu → Workflows → Import from file
4. Sélectionner les fichiers dans `n8n-workflows/`

### Configuration des credentials

Créer les credentials suivants dans n8n:
- `bocco-db`: SQLite (pointeur vers `data/bocco.db`)
- `falAiKey`: Header Auth avec clé FAL.ai
- `piapiKey`: Header Auth avec clé PiAPI (Hailuo)
- `veedKey`: Header Auth avec clé VEED

## 🎯 Fonctionnalités

### Plans d'abonnement

| Plan | Prix | Crédits/mois | Crédit extra |
|------|------|--------------|--------------|
| Starter | 29€ | 10 | 3€ |
| Pro | 69€ | 30 | 2,50€ |
| Business | 159€ | 100 | 2€ |

### Réductions formations

| Formation | Prix | Réduction/mois |
|-----------|------|----------------|
| Code Liberté | 350€ | -10€ |
| ASA | 497€ | -5€ |
| DSA | 997€ | -10€ |

### Coûts en crédits

- 1 avatar = 1 crédit
- 1 vidéo courte (<1min) = 1 crédit
- 1 vidéo longue (1-2min) = 2 crédits

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Paiement
- `POST /api/payment/create` - Créer abonnement
- `POST /api/payment/credits` - Acheter crédits
- `POST /api/payment/formation` - Acheter formation
- `GET /api/payment/status?id=xxx` - Statut paiement

### Credits
- `GET /api/credits` - Solde crédits (auth requis)

### Webhooks
- `POST /api/webhook/mollie` - Webhook Mollie

## 🔒 Sécurité

- JWT pour l'authentification
- Hash SHA256 des mots de passe (remplacer par bcrypt en production)
- Webhook Mollie vérifié via signature
- Rate limiting recommandé en production

## 🚀 Déploiement

### Vercel (Frontend + API)

```bash
npm i -g vercel
vercel --prod
```

### Variables d'environnement Vercel

Configurer dans Vercel Dashboard:
- `MOLLIE_API_KEY`
- `JWT_SECRET`
- `DATABASE_URL` (ou utiliser Supabase/PlanetScale)
- Toutes les clés API

### n8n (Backend workflows)

Déployer sur:
- n8n Cloud (payant)
- VPS perso (Docker)
- Railway/Render (gratuit avec limitations)

## 📊 Monitoring

Suivre les métriques clés:
- MRR (Monthly Recurring Revenue)
- Churn rate
- ARPU (Average Revenue Per User)
- Coût API / utilisateur
- LTV/CAC ratio

## 📝 TODO

- [ ] Implémenter bcrypt pour les mots de passe
- [ ] Ajouter rate limiting
- [ ] Créer dashboard utilisateur
- [ ] Intégrer TTS (Unreal Speech)
- [ ] Ajouter sous-titres auto
- [ ] Tests automatisés
- [ ] Documentation API (Swagger)

## 🐛 Support

Problèmes connus:
- SQLite en production: migrer vers PostgreSQL/MySQL
- JWT simple: remplacer par NextAuth.js
- Pas de rate limiting: ajouter `express-rate-limit`

## 📄 License

MIT - BOCCO.AI 2026
