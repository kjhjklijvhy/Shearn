# 🚀 Shearn - Plateforme d'Investissement Sécurisée

## 📋 Vue d'ensemble

Shearn est une plateforme web moderne, sécurisée et responsive d'investissement avec système de parrainage intégré.

**URL:** https://shearn.netlify.app

### ✨ Caractéristiques principales

- 💰 Investissements de 100€ à 200€ avec rendement quotidien configurable (0,05% par défaut)
- 👥 Système de parrainage avec gains automatiques (1€ par filleul)
- 📊 Tableau de bord moderne avec statistiques en temps réel
- 🔐 Sécurité maximale (JWT, Argon2, protection XSS/SQL/CSRF)
- 🌍 Support multilingue (FR/EN) et multi-devise (€)
- 📱 Design responsive avec mode clair/sombre
- ⚙️ Panneau administrateur complet et sécurisé
- 🤖 Intégration Telegram pour notifications
- 💳 Paiements: Transcash, Neosurf, Paysafecard
- 🏦 Retraits: Virement bancaire ou Crypto (USDT, BTC, TON)

---

## 🛠️ Architecture Technique

### Frontend
- **Framework:** React 18+ avec TypeScript
- **Styling:** Tailwind CSS + animations fluides
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios avec intercepteurs
- **Forms:** React Hook Form + Zod validation
- **Charting:** Recharts pour statistiques
- **Deployment:** Netlify

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL avec Prisma ORM
- **Authentication:** JWT (RS256)
- **Password Hashing:** Argon2
- **Email:** Nodemailer + SMTP
- **Rate Limiting:** express-rate-limit
- **Validation:** Zod + class-validator
- **Logging:** Winston
- **Deployment:** Render/Railway/VPS

---

## 📁 Structure du Projet

```
Shearn/
├── frontend/                    # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/              # Pages principales
│   │   ├── hooks/              # Hooks personnalisés
│   │   ├── store/              # Redux store
│   │   ├── services/           # API calls
│   │   ├── utils/              # Utilitaires
│   │   ├── styles/             # Styles globaux
│   │   ├─�� types/              # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Serveur Express
│   ├── src/
│   │   ├── controllers/        # Contrôleurs métier
│   │   ├── services/           # Logique métier
│   │   ├── middleware/         # Middlewares
│   │   ├── routes/             # Routes API
│   │   ├── models/             # Schémas Prisma
│   │   ├── utils/              # Utilitaires
│   │   ├── config/             # Configuration
│   │   ├── validators/         # Validation Zod
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                        # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
└── .github/
    └── workflows/              # CI/CD
```

---

## 🔒 Sécurité

### Mesures Implémentées

✅ **Authentification**
- Email verification obligatoire
- JWT avec RS256 + refresh tokens
- Sessions sécurisées (httpOnly, Secure, SameSite)
- Logout sécurisé

✅ **Protection des Données**
- Mots de passe: Argon2 (4 passes, 1GB mémoire)
- Encryption des données sensibles
- TLS/HTTPS enforced
- CORS configuré

✅ **Défense contre les Attaques**
- SQL Injection: Prisma ORM + prepared statements
- XSS: Content Security Policy + sanitization
- CSRF: CSRF tokens + SameSite cookies
- Clickjacking: X-Frame-Options: DENY
- Brute Force: Rate limiting + account lockout
- Session Hijacking: Token rotation + IP validation

✅ **Infrastructure**
- Variables d'environnement (.env)
- Audit logging complet
- Monitoring & alertes
- GDPR compliance

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Installation Frontend

```bash
cd frontend
npm install
npm run dev
```

### Installation Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npx prisma migrate dev
npm run dev
```

---

## 📚 Documentation

- [Architecture Détaillée](./docs/ARCHITECTURE.md)
- [Spécifications API](./docs/API.md)
- [Guide Sécurité](./docs/SECURITY.md)
- [Déploiement](./docs/DEPLOYMENT.md)

---

## 📞 Support

- **Email:** support@shearn.com
- **Telegram:** [Lien du support]

---

## 📄 Licence

Propriétaire - 2024
