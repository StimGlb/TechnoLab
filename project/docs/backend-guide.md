# 🎓 TechnoLab Backend

Backend Node.js/Express pour l'application TechnoLab - Assistant pédagogique IA pour l'enseignement de la Technologie au collège.

## 🚀 Démarrage rapide

### 1. Installation

```bash
cd server  # ou technolab-backend selon ton organisation
npm install
```

### 2. Configuration

Copie le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Puis édite `.env` et renseigne tes variables :

```env
PORT=3001
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxx
CORS_ORIGIN=http://localhost:5173,https://ton-app.vercel.app
```

### 3. Initialiser la base de données

```bash
npm run init-db
```

Cela crée le fichier SQLite avec les tables nécessaires.

### 4. Lancer le serveur

**Mode développement** (avec rechargement automatique) :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

Le serveur démarre sur http://localhost:3001

---

## 📚 API Endpoints

### 🏥 Santé de l'API

#### `GET /api/health`
Vérifier l'état de santé du serveur

**Réponse :**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "database": "connected",
  "uptime": 3600
}
```

#### `GET /api/health/db`
Statistiques de la base de données

**Réponse :**
```json
{
  "success": true,
  "stats": {
    "conversations": 5,
    "messages": 42
  }
}
```

---

### 💬 Chat / Conversations

#### `POST /api/chat/conversations`
Créer une nouvelle conversation

**Body :**
```json
{
  "titre": "Fiche activité robot",
  "contexte": "Séquence 5ème - Objets connectés"
}
```

**Réponse :**
```json
{
  "success": true,
  "conversation": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titre": "Fiche activité robot",
    "contexte": "Séquence 5ème - Objets connectés"
  }
}
```

---

#### `GET /api/chat/conversations`
Récupérer toutes les conversations

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "conversations": [
    {
      "id": "550e8400-...",
      "titre": "Fiche activité robot",
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

#### `GET /api/chat/conversations/:id`
Récupérer une conversation avec son historique

**Réponse :**
```json
{
  "success": true,
  "conversation": {
    "id": "550e8400-...",
    "titre": "Fiche activité robot",
    "messages": [
      {
        "role": "user",
        "content": "Crée une fiche d'activité...",
        "timestamp": "2025-01-15T10:00:00Z"
      },
      {
        "role": "assistant",
        "content": "Voici une fiche d'activité...",
        "timestamp": "2025-01-15T10:00:05Z"
      }
    ]
  }
}
```

---

#### `POST /api/chat/conversations/:id/messages`
Envoyer un message dans une conversation

**Body :**
```json
{
  "message": "Peux-tu ajouter une partie évaluation ?",
  "systemPrompt": "Tu es un assistant..." (optionnel)
}
```

**Réponse :**
```json
{
  "success": true,
  "message": {
    "role": "assistant",
    "content": "Voici la partie évaluation ajoutée...",
    "timestamp": "2025-01-15T10:05:00Z"
  },
  "usage": {
    "input_tokens": 1200,
    "output_tokens": 800
  }
}
```

---

#### `DELETE /api/chat/conversations/:id`
Supprimer une conversation (et tous ses messages)

**Réponse :**
```json
{
  "success": true,
  "message": "Conversation supprimée"
}
```

---

#### `DELETE /api/chat/conversations/:id/history`
Effacer l'historique (garder la conversation)

**Réponse :**
```json
{
  "success": true,
  "message": "Historique effacé"
}
```

---

## 🗄️ Base de données

Le backend utilise **SQLite** via `better-sqlite3`. Pas de serveur SQL à installer !

### Structure des tables

#### Table `conversations`
```sql
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  titre TEXT NOT NULL,
  contexte TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Table `messages`
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
)
```

---

## 🔐 Sécurité

### Rate Limiting
- **Général** : 100 requêtes / 15 minutes par IP
- **Routes /chat** : 10 requêtes / minute (protection contre les abus)

### CORS
Configure les origines autorisées dans `.env` :
```env
CORS_ORIGIN=http://localhost:5173,https://ton-app.vercel.app
```

### Helmet
Headers de sécurité HTTP automatiquement configurés.

---

## 🧪 Tester l'API

### Avec curl

**Créer une conversation :**
```bash
curl -X POST http://localhost:3001/api/chat/conversations \
  -H "Content-Type: application/json" \
  -d '{"titre": "Test conversation", "contexte": "Test"}'
```

**Envoyer un message :**
```bash
curl -X POST http://localhost:3001/api/chat/conversations/CONVERSATION_ID/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour Claude !"}'
```

### Avec Postman
Importe la collection fournie dans `/docs/postman-collection.json` (à créer).

---

## 📦 Structure des fichiers

```
server/
├── src/
│   ├── controllers/       # Logique métier
│   │   └── chatController.js
│   ├── middleware/        # Middlewares Express
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── rateLimiter.js
│   ├── models/           # Base de données
│   │   └── database.js
│   ├── routes/           # Définition des routes
│   │   ├── chatRoutes.js
│   │   └── healthRoutes.js
│   ├── services/         # Services externes (API)
│   │   └── claudeService.js
│   ├── utils/            # Utilitaires
│   │   └── initDb.js
│   └── app.js            # Point d'entrée
├── data/                 # Base de données SQLite
│   └── technolab.db
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚧 Roadmap

### Phase 1 (Actuel) ✅
- [x] API REST complète
- [x] Gestion des conversations
- [x] Intégration Claude API
- [x] Base SQLite
- [x] Rate limiting
- [x] Gestion d'erreurs

### Phase 2 (Prochaine)
- [ ] Authentification JWT
- [ ] Streaming des réponses (Server-Sent Events)
- [ ] Upload de fichiers (PDF, images)
- [ ] Export des conversations
- [ ] Statistiques d'utilisation

### Phase 3 (Future)
- [ ] Multi-utilisateurs
- [ ] Rôles et permissions
- [ ] Templates de prompts personnalisés
- [ ] Webhooks
- [ ] API GraphQL (optionnel)

---

## 🐛 Débogage

### Logs détaillés
Le middleware `requestLogger` affiche toutes les requêtes dans la console :
```
🔵 POST /api/chat/conversations/abc123/messages
   📍 Origin: http://localhost:5173
   🕐 2025-01-15T10:30:00Z

✅ POST /api/chat/conversations/abc123/messages - 200 (1234ms)
```

### Erreurs courantes

**"Non autorisé par CORS"**
→ Ajoute l'origine de ton frontend dans `.env` : `CORS_ORIGIN`

**"Clé API invalide"**
→ Vérifie `ANTHROPIC_API_KEY` dans `.env`

**"Database locked"**
→ SQLite est mono-thread. Si plusieurs requêtes simultanées, augmente `busy_timeout` dans `database.js`

---

## 📞 Support

Besoin d'aide ? Consulte :
- [Documentation Anthropic API](https://docs.anthropic.com/)
- [Better-SQLite3 docs](https://github.com/WiseLibs/better-sqlite3)
- [Express.js Guide](https://expressjs.com/)

---

**Développé avec 💙 pour l'enseignement de la Technologie**