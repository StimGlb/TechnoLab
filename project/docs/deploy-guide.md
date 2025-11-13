# 🚀 Guide de Déploiement - TechnoLab Backend

Ce guide explique comment déployer le backend sur différentes plateformes.

---

## Option 1 : Railway.app (Recommandé)

Railway est gratuit pour débuter et super simple.

### Étapes :

1. **Créer un compte sur [Railway.app](https://railway.app)**

2. **Connecter ton repo GitHub**
   - Clique sur "New Project"
   - Sélectionne "Deploy from GitHub repo"
   - Choisis ton repo TechnoLab

3. **Configurer les variables d'environnement**
   - Va dans l'onglet "Variables"
   - Ajoute :
     ```
     PORT=3001
     NODE_ENV=production
     ANTHROPIC_API_KEY=sk-ant-xxxxx
     CORS_ORIGIN=https://ton-app.vercel.app
     ```

4. **Déployer**
   - Railway détecte automatiquement Node.js
   - Le déploiement se lance automatiquement
   - Tu obtiens une URL : `https://ton-backend.railway.app`

5. **Configurer le frontend**
   - Dans ton frontend Vercel, ajoute :
     ```
     VITE_API_URL=https://ton-backend.railway.app
     ```

---

## Option 2 : Render.com (Gratuit)

### Étapes :

1. **Créer un compte sur [Render.com](https://render.com)**

2. **Créer un nouveau Web Service**
   - "New" → "Web Service"
   - Connecte ton repo GitHub

3. **Configuration**
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node

4. **Variables d'environnement**
   - Ajoute les mêmes que Railway

5. **Déployer**
   - Render déploie automatiquement à chaque push

⚠️ **Note** : Le plan gratuit Render "s'endort" après 15 min d'inactivité (premier appel = lent).

---

## Option 3 : Vercel (Serverless)

Vercel supporte aussi le backend Node.js !

### Étapes :

1. **Créer `vercel.json` à la racine du backend :**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Déployer**
```bash
cd server
vercel
```

3. **Configurer les variables d'environnement**
   - Dashboard Vercel → Settings → Environment Variables
   - Ajoute `ANTHROPIC_API_KEY`, `CORS_ORIGIN`, etc.

⚠️ **Limitation** : SQLite ne fonctionne pas sur Vercel (serverless). Il faut passer à PostgreSQL/MySQL.

---

## Option 4 : VPS (OVH, Digital Ocean, etc.)

Pour un contrôle total.

### Prérequis :
- Serveur Ubuntu 22.04+
- Node.js 20+
- Nginx (reverse proxy)

### Étapes :

1. **Se connecter au serveur**
```bash
ssh user@ton-serveur.com
```

2. **Installer Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

3. **Cloner le repo**
```bash
git clone https://github.com/ton-pseudo/technolab.git
cd technolab/server
npm install
```

4. **Configurer .env**
```bash
nano .env
# Renseigner les variables
```

5. **Démarrer avec PM2**
```bash
sudo npm install -g pm2
pm2 start src/app.js --name technolab-backend
pm2 save
pm2 startup
```

6. **Configurer Nginx**
```nginx
server {
    listen 80;
    server_name api.ton-domaine.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Activer SSL avec Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.ton-domaine.com
```

---

## 🔄 Workflow de déploiement recommandé

### Développement local
```bash
npm run dev  # Mode développement
```

### Staging (Railway/Render)
- Branche `develop` → Auto-deploy sur Railway
- Tester avant de merger en `main`

### Production (Railway/VPS)
- Branche `main` → Auto-deploy production
- Tags Git pour les versions : `git tag v1.0.0`

---

## 🧪 Vérifier le déploiement

Une fois déployé, teste :

```bash
curl https://ton-backend.railway.app/api/health
```

Résultat attendu :
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## 📊 Monitoring

### Railway / Render
- Logs intégrés dans le dashboard
- Métriques CPU/RAM automatiques

### VPS avec PM2
```bash
pm2 logs technolab-backend  # Voir les logs
pm2 monit                    # Monitoring temps réel
```

### Sentry (optionnel)
Pour tracker les erreurs en production :
```bash
npm install @sentry/node
```

---

## 🔐 Checklist de sécurité

Avant de déployer en production :

- [ ] Variables `.env` configurées (jamais commiter `.env` !)
- [ ] `NODE_ENV=production`
- [ ] Rate limiting activé
- [ ] CORS configuré avec les bonnes origines
- [ ] HTTPS activé (Certbot, Railway/Render le font auto)
- [ ] Clé API Anthropic sécurisée (jamais dans le code)
- [ ] Base de données sauvegardée régulièrement

---

## 🆘 Problèmes courants

### "Cannot connect to database"
→ Sur serverless (Vercel), passe à PostgreSQL au lieu de SQLite

### "CORS error"
→ Vérifie que `CORS_ORIGIN` contient l'URL exacte de ton frontend

### "API rate limited"
→ Augmente `API_RATE_LIMIT_MAX` dans `.env`

### "Module not found"
→ `npm install` après chaque `git pull`

---

**Besoin d'aide ?** Consulte la doc de ta plateforme :
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)