# 🚀 bocco.ai

SaaS de création d'avatars IA et vidéos faceless pour vendeurs de formations MRR.

## 📋 Stack technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Auth & Database** : Supabase
- **Paiements** : Stripe
- **Stockage** : Cloudflare R2
- **Emails** : Brevo (via n8n)
- **Automatisations** : n8n

## 🚀 Déploiement rapide

### 1. Prérequis

- Compte [Vercel](https://vercel.com)
- Compte [Supabase](https://supabase.com)
- Compte [Stripe](https://stripe.com)
- Compte [Cloudflare](https://cloudflare.com) (pour R2)
- Node.js 18+

### 2. Installation locale

```bash
# Cloner le projet
git clone <repo-url>
cd bocco-ai

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Remplir les variables dans .env.local
```

### 3. Configuration Supabase

1. Créer un projet sur Supabase
2. Ouvrir l'éditeur SQL
3. Copier-coller le contenu de `supabase/schema.sql`
4. Exécuter

### 4. Variables d'environnement

Remplir `.env.local` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudflare R2
R2_ACCOUNT_ID=votre-account-id
R2_ACCESS_KEY_ID=votre-access-key
R2_SECRET_ACCESS_KEY=votre-secret-key
R2_BUCKET_NAME=bocco-ai

# n8n (Webhooks)
N8N_WEBHOOK_URL=https://votre-n8n.com/webhook
N8N_WEBHOOK_SECRET=votre-secret

# App
NEXT_PUBLIC_APP_URL=https://bocco.org
```

### 5. Configuration Stripe

#### Produits à créer :

**Abonnement Mensuel (Base)**
- Prix : 45€/mois
- ID produit : `prod_base_monthly`

**Abonnement Mensuel (DSA)**
- Prix : 40€/mois
- ID produit : `prod_dsa_monthly`

**Abonnement Mensuel (ASA)**
- Prix : 42€/mois
- ID produit : `prod_asa_monthly`

**Abonnement Mensuel (Code)**
- Prix : 43€/mois
- ID produit : `prod_code_monthly`

**Abonnement Annuel**
- Prix : 360€/an (30€/mois)
- ID produit : `prod_annual`

**Pack Crédits (10 crédits)**
- Prix : 10€
- ID produit : `prod_credits_10`

#### Webhook Stripe :
- URL : `https://bocco.org/api/webhook/stripe`
- Events : `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.deleted`

### 6. Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ou connecter repo GitHub sur Vercel dashboard
```

### 7. Configuration domaine

1. Dans Vercel dashboard → Project Settings → Domains
2. Ajouter `bocco.org`
3. Configurer DNS chez Cloudflare selon instructions Vercel

## 🎨 Structure du projet

```
app/
├── (marketing)/          # Pages publiques
│   ├── page.tsx          # Landing
│   ├── pricing/page.tsx  # Tarifs
│   └── formations/page.tsx # Formations MRR
├── (dashboard)/          # Dashboard protégé
│   ├── dashboard/page.tsx
│   ├── dashboard/avatar/new/page.tsx
│   └── dashboard/video/new/page.tsx
├── api/webhook/          # Webhooks Stripe & n8n
components/
├── landing/              # Composants landing page
├── dashboard/            # Composants dashboard
└── ui/                   # Composants shadcn/ui
lib/
├── supabase/             # Clients Supabase
├── stripe/               # Config Stripe
└── n8n.ts               # Config n8n
supabase/
└── schema.sql           # Schéma BDD
```

## 💳 Grille tarifaire

| Action | Crédits | Coût API estimé |
|--------|---------|-----------------|
| Avatar + anim 5s (gratuit 1x) | 1 | ~0,40€ |
| Vidéo courte (<1min) | 1 | ~0,75€ |
| Vidéo longue (1-2min) | 2 | ~1,45€ |

### Abonnements (30 crédits/mois)

| Plan | Prix |
|------|------|
| Base | 45€/mois |
| -DSA (-5€) | 40€/mois |
| -ASA (-3€) | 42€/mois |
| -Code (-2€) | 43€/mois |
| -Annuel (-5€) | 40€/mois |
| Cumul max | 30€/mois |

## 🔗 Intégration n8n

Les webhooks n8n suivants doivent être configurés :

### Création Avatar
- **URL** : `https://votre-n8n.com/webhook/avatar`
- **Payload** : `{ userId, avatarId, photoUrl, description, gender }`
- **Retour** : `POST /api/webhook/n8n/avatar`

### Création Vidéo
- **URL** : `https://votre-n8n.com/webhook/video`
- **Payload** : `{ userId, videoId, sourceUrl, format, avatarId, formation }`
- **Retour** : `POST /api/webhook/n8n/video`

## 📧 Support

Pour toute question : support@bocco.ai

---

Made with ❤️ by Bocco.ai
