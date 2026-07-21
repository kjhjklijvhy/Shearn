# 🚀 Guide de Déploiement Shearn

## Prérequis

- Node.js 18+
- PostgreSQL 14+
- Docker (optionnel)
- Git
- Comptes Netlify, Render/Railway

---

## 📦 Étape 1: Configuration locale

### Clone le repo
```bash
git clone https://github.com/kjhjklijvhy/Shearn.git
cd Shearn
```

### Configuration Backend
```bash
cd backend
cp .env.example .env
# Éditer .env avec les vraies valeurs

npm install
npx prisma migrate dev
npm run dev
```

### Configuration Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Tester sur `http://localhost:3000`

---

## 🌍 Étape 2: Déploiement Frontend (Netlify)

### Via Netlify UI

1. Aller sur [netlify.com](https://netlify.com)
2. "New site from Git"
3. Connecter votre repo GitHub
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

5. Environment variables:
   ```
   VITE_API_URL=https://api.shearn.com
   ```

6. Deploy!

### Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 🖥️ Étape 3: Déploiement Backend (Render)

### Préparer l'app

```bash
cd backend
npm install
npm run build
```

### Créer sur Render

1. Aller sur [render.com](https://render.com)
2. "New +" → "Web Service"
3. Connecter repo GitHub
4. Settings:
   - Name: `shearn-api`
   - Environment: `Node`
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`

5. Environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://...
   JWT_SECRET=<generate-strong-key>
   JWT_REFRESH_SECRET=<generate-strong-key>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=<app-password>
   SMTP_FROM=noreply@shearn.com
   FRONTEND_URL=https://shearn.netlify.app
   TELEGRAM_CHAT_ID=7945670305
   TELEGRAM_BOT_RECHARGE=8965595214:AAHL4WKBOAFfY7IxZiAOP9yLy5ZmxwJcpkA
   TELEGRAM_BOT_WITHDRAWAL=8521340361:AAGac1W0I66Hjs0y2eSZ2bX1J46rmC44g98
   ```

6. Deploy!

---

## 🗄️ Étape 4: Configuration Database (PostgreSQL)

### Option A: Managed Database sur Render

1. Dashboard Render
2. "New +" → "PostgreSQL"
3. Name: `shearn-db`
4. Récupérer `DATABASE_URL`
5. Ajouter à l'app backend

### Option B: Serveur PostgreSQL externe

```bash
# Connexion
psql -h <host> -U <user> -d shearn -W

# Créer database
CREATE DATABASE shearn;
CREATE USER shearn_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE shearn TO shearn_user;
```

### Option C: Docker local

```bash
docker run -d \
  --name shearn-db \
  -e POSTGRES_DB=shearn \
  -e POSTGRES_USER=shearn_user \
  -e POSTGRES_PASSWORD=strong_password \
  -p 5432:5432 \
  postgres:15-alpine
```

---

## 🔧 Étape 5: Configuration DNS

### Netlify (Frontend)
1. Dashboard Netlify
2. Site settings → Domain management
3. Configurer custom domain: `shearn.netlify.app` (par défaut)

### Render (Backend)
1. Dashboard Render
2. Web Service settings
3. Note l'URL: `https://shearn-api.onrender.com`
4. Ajouter au frontend `.env`

---

## ✅ Checklist de déploiement

- [ ] Database migré et seed initial
- [ ] Variables d'environnement configurées
- [ ] HTTPS forcé sur tous les domaines
- [ ] CORS configuré correctement
- [ ] Email service testé (vérification)
- [ ] Telegram bots actifs
- [ ] Rate limiting en place
- [ ] Logging fonctionnel
- [ ] Monitoring configuré
- [ ] Backups programmés
- [ ] Alertes configurées
- [ ] Tests en production

---

## 📊 Monitoring

### Logs

**Render:**
```bash
# En ligne de commande
render logs shearn-api
```

**Netlify:**
Dashboard → Deploys → logs

### Métriques

- Response time
- Error rate
- CPU/Memory usage
- Database connections

---

## 🔄 CI/CD (GitHub Actions)

### `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Frontend
        run: |
          npm install
          npm run build
          npx netlify deploy --prod --dir=frontend/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      
      - name: Deploy Backend
        run: git push heroku main
```

---

## 🚨 Troubleshooting

### Database connection error
```bash
# Vérifier DATABASE_URL
echo $DATABASE_URL

# Tester la connexion
psql $DATABASE_URL
```

### Email not sending
```
1. Vérifier les credentials SMTP
2. Activer "Less secure apps" sur Gmail
3. Vérifier les logs Render
```

### Telegram not working
```
1. Vérifier les tokens de bot
2. Tester le message manuellement
3. Vérifier le TELEGRAM_CHAT_ID
```

### CORS errors
```
# Backend: Vérifier CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_PROD_URL,
  credentials: true
};
```

---

## 📝 Logs Utiles

```bash
# Backend logs
render logs shearn-api | grep -i error

# Database logs
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements LIMIT 10;"

# Frontend build
netlify deploy --debug
```
