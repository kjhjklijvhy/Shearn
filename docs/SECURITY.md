# 🔐 Guide de Sécurité Shearn

## Standards de Sécurité

### Authentification

#### Registration
```
✓ Email verification obligatoire
✓ Password requirements:
  - Minimum 8 caractères
  - Au moins 1 majuscule
  - Au moins 1 chiffre
  - Au moins 1 caractère spécial
✓ Email token expire après 24h
✓ Compte non actif jusqu'à vérification
```

#### Login
```
✓ Rate limiting: 5 tentatives / 15 minutes
✓ Email verification required
✓ Account lockout check
✓ JWT avec expiration 24h
✓ Refresh token séparé (7 jours)
✓ Session tracking (IP, User-Agent)
```

### Password Security

```typescript
// Argon2 Configuration
{
  type: 2,              // Argon2id
  memoryCost: 65540,    // 64 MB
  timeCost: 3,          // 3 passes
  parallelism: 4        // 4 threads
}
```

### Token Management

```typescript
// JWT Payload
{
  id: string,
  email: string,
  iat: number,
  exp: number
}

// Stored securely in .env
JWT_SECRET = "min 32 chars"
JWT_REFRESH_SECRET = "min 32 chars"
```

## Protection contre les attaques

### SQL Injection
- ✓ Prisma ORM (prepared statements)
- ✓ Zod validation
- ✓ Input sanitization

### XSS (Cross-Site Scripting)
- ✓ CSP headers
- ✓ React escaping automatique
- ✓ HTML sanitization
- ✓ DOMPurify pour user-generated content

### CSRF (Cross-Site Request Forgery)
- ✓ CSRF tokens
- ✓ SameSite=Strict cookies
- ✓ Origin validation

### Clickjacking
- ✓ X-Frame-Options: DENY
- ✓ Content-Security-Policy

### Brute Force
- ✓ Rate limiting middleware
- ✓ Account lockout après 5 tentatives
- ✓ IP blocking configurable

### Session Hijacking
- ✓ Token rotation
- ✓ IP validation
- ✓ User-Agent validation
- ✓ Session timeout
- ✓ Secure + HttpOnly cookies

## Headers HTTP Sécurisés

```typescript
// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.API_URL]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));
```

## Variables d'environnement sécurisées

### Backend (.env - JAMAIS committé)
```
JWT_SECRET
JWT_REFRESH_SECRET
SMTP_PASS
TELEGRAM_BOT_TOKENS
DATABASE_URL
```

### Frontend (Vite .env - PUBLIC seulement)
```
VITE_API_URL=https://api.shearn.com
VITE_APP_NAME=Shearn
```

## Validation des données

### Frontend
```typescript
// Zod schemas pour validation
const schema = z.object({
  email: z.string().email(),
  amount: z.number().min(100).max(200),
  password: z.string().min(8)
});
```

### Backend
```typescript
// Double validation
1. Zod schema validation
2. Business logic validation
3. Database constraint validation
```

## Audit Logging

Toutes les actions critiques sont loggées:
- ✓ Login/Logout
- ✓ Changement password
- ✓ Investissements créés
- ✓ Retraits demandés
- ✓ Admin actions
- ✓ Tentatives d'accès non autorisé

## GDPR Compliance

- ✓ Data encryption
- ✓ Right to be forgotten
- ✓ Data portability
- ✓ Privacy policy
- ✓ Terms of service

## Checklist de déploiement

- [ ] HTTPS enabled
- [ ] Environnement variables configurés
- [ ] Database backups
- [ ] SSL certificates valides
- [ ] Rate limiting actif
- [ ] Logging fonctionnel
- [ ] Email service testé
- [ ] Telegram bots configurés
- [ ] Monitoring en place
- [ ] Alertes configurées
