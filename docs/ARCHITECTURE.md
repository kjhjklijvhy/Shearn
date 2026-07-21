# 🏗️ Architecture de Shearn

## Vue d'ensemble

Shearn utilise une architecture moderne **monorepo** avec séparation frontend/backend.

```
┌─────────────────────────────────────┐
│         Frontend (React/TS)          │
│  - Vite + TypeScript                 │
│  - Redux Toolkit                     │
│  - Tailwind CSS                      │
│  - Framer Motion                     │
│  - Recharts                          │
└────────────────┬────────────────────┘
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────┐
│      Backend (Node/Express/TS)       │
│  - Express.js                        │
│  - Prisma ORM                        │
│  - JWT Authentication                │
│  - Rate Limiting                     │
│  - Telegram Integration              │
└────────────────┬────────────────────┘
                 │ SQL
                 ▼
┌─────────────────────────────────────┐
│     PostgreSQL Database              │
│  - Users, Investments                │
│  - Transactions                      │
│  - Audit Logs                        │
└─────────────────────────────────────┘
```

## Flux d'authentification

1. **Inscription**
   - Email + Password validation
   - Envoi email de confirmation
   - Création utilisateur avec status non vérifié
   - Génération unique referral code

2. **Vérification Email**
   - Token dans l'email
   - Confirmation du lien
   - Activation du compte

3. **Login**
   - Email + Password
   - Vérification password (Argon2)
   - Génération JWT (accessToken + refreshToken)
   - Session enregistrée en BD

## Flux d'investissement

1. **Création d'investissement**
   - Montant entre 100€ et 200€
   - Status: "pending" (en attente de paiement)
   - Rendement quotidien appliqué

2. **Rechargement (Paiement)**
   - Utilisateur choisit: Transcash/Neosurf/Paysafecard
   - Saisit montant + code voucher
   - TransactionID généré
   - Notification Telegram admin
   - Validation manuelle admin
   - Crédit du compte

3. **Gains quotidiens**
   - Cron job calcule 0.05% par jour
   - Balance mise à jour
   - Notification utilisateur

## Flux de retrait

1. **Demande de retrait**
   - Vérification conditions:
     - Investissement ≥ 30 jours
     - ≥ 20 filleuls validés
     - Investissement actif
   - Choix méthode: Virement bancaire ou Crypto
   - Status: "pending"

2. **Notification admin**
   - Message Telegram avec détails
   - Admin approuve/refuse

3. **Paiement**
   - Transfert vers compte utilisateur
   - Status: "completed"

## Système de parrainage

- Code unique hexadécimal (16 bytes)
- URL: `https://shearn.netlify.app/auth?ref=XXXX`
- Bonus: 1€ par filleul validé
- Compteur filleuls en temps réel

## Sécurité

### Frontend
- Pas de secrets stockés
- Tokens en localStorage (httpOnly cookies côté server)
- CORS restrictif
- CSP headers
- XSS prevention

### Backend
- JWT RS256 avec expiration
- Passwords: Argon2 (4 passes, 1GB)
- Rate limiting: 100 req/15min global, 5 req/15min auth
- SQL Injection prevention: Prisma ORM
- CSRF tokens
- Session validation (IP, User-Agent)
- Audit logging complet
- HTTPS enforced

### Database
- Connexion cryptée
- Données sensibles chiffrées
- Backups réguliers
- Transactions ACID

## Déploiement

```
Frontend → Netlify (automatic deploy from main)
  ↓
Backend → Render/Railway/VPS (Docker)
  ↓
Database → PostgreSQL hosted
```

## Performance

- Frontend: Code splitting, lazy loading
- Backend: Connection pooling, caching
- Database: Indexes optimisés
- CDN: Netlify Edge

## Monitoring

- Winston logging
- Error tracking
- Performance metrics
- User activity audit
