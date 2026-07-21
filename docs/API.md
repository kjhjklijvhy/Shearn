# 📚 API Shearn - Documentation Complète

## Base URL
```
Production: https://api.shearn.com
Development: http://localhost:5000
```

## Authentication
Tous les endpoints (sauf auth) nécessitent un JWT token:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### POST /api/auth/register
Créer un nouveau compte

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "referralCode": "optional_referral_code"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Check email to verify.",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST /api/auth/login
Se connecter

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John"
    }
  }
}
```

### POST /api/auth/verify-email
Vérifier l'adresse email

**Request Body:**
```json
{
  "token": "verification_token_from_email"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### POST /api/auth/logout
Se déconnecter

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👤 User Endpoints

### GET /api/users/me
Obtenir le profil utilisateur

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "balance": 150.50,
    "totalInvested": 200.00,
    "totalEarnings": 50.50,
    "referralEarnings": 10.00,
    "referralCode": "abc123def456",
    "referralLink": "https://shearn.netlify.app/auth?ref=abc123def456",
    "referralCount": 5,
    "language": "fr",
    "currency": "EUR"
  }
}
```

### PUT /api/users/me
Mettre à jour le profil

**Request Body:**
```json
{
  "firstName": "Jane",
  "language": "en",
  "cryptoAddress": "0x123...",
  "cryptoType": "USDT"
}
```

### GET /api/users/notifications
Obtenir les notifications

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "notif_id",
      "type": "investment_accepted",
      "title": "Investissement accepté",
      "message": "Votre investissement de 200€ a été accepté",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 💰 Investment Endpoints

### GET /api/investments
Lister les investissements

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "inv_id",
      "amount": 200.00,
      "rate": 0.0005,
      "status": "active",
      "dailyEarnings": 0.10,
      "totalEarnings": 5.00,
      "startDate": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/investments
Créer un investissement

**Request Body:**
```json
{
  "amount": 150.00
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Investment created. Awaiting payment.",
  "data": {
    "id": "inv_id",
    "amount": 150.00,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### POST /api/investments/{id}/renew
Renouveler un investissement

**Response (200):**
```json
{
  "success": true,
  "message": "Investment renewed",
  "data": { ... }
}
```

---

## 💳 Recharge Endpoints

### POST /api/recharges
Demander un rechargement

**Request Body:**
```json
{
  "amount": 100.00,
  "method": "transcash",
  "voucherCode": "XXXXX-XXXXX"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recharge request sent to admin",
  "data": {
    "id": "recharge_id",
    "transactionId": "TXN-20240115-001",
    "amount": 100.00,
    "method": "transcash",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🏦 Withdrawal Endpoints

### GET /api/withdrawals
Lister les demandes de retrait

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "withdraw_id",
      "amount": 50.00,
      "method": "bank",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### POST /api/withdrawals
Demander un retrait

**Request Body:**
```json
{
  "amount": 50.00,
  "method": "USDT",
  "walletAddress": "0x123..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Withdrawal request created",
  "data": {
    "id": "withdraw_id",
    "amount": 50.00,
    "method": "USDT",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## ⚙️ Admin Endpoints

### GET /api/admin/users
Lister tous les utilisateurs (admin only)

### PUT /api/admin/recharges/{id}
Valider/Rejeter un rechargement

**Request Body:**
```json
{
  "status": "validated",
  "rejectionReason": null
}
```

### PUT /api/admin/withdrawals/{id}
Valider/Rejeter un retrait

**Request Body:**
```json
{
  "status": "approved",
  "rejectionReason": null
}
```

### PUT /api/admin/settings
Modifier les paramètres

**Request Body:**
```json
{
  "dailyReturnRate": 0.0005,
  "minInvestment": 100,
  "maxInvestment": 200
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "path": "email",
      "message": "Invalid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```
