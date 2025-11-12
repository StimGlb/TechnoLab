# 🚀 Guide de migration vers le serveur optimisé

## 📋 Étape 1 : Installation des nouvelles dépendances

```bash
cd server
npm install winston zod
```

## 📁 Étape 2 : Créer l'arborescence

```bash
# Créer les dossiers
mkdir -p src/{config,middlewares,routes,controllers,services,utils,validators}
mkdir -p logs
mkdir -p test

# Copier les fichiers générés
# (Copier tous les fichiers .js créés dans leurs dossiers respectifs)
```

## 🔄 Étape 3 : Remplacer l'ancien server.js

```bash
# Sauvegarder l'ancien fichier
mv server.js server.old.js

# Copier le nouveau
# (Utiliser le nouveau server.js fourni)
```

## ⚙️ Étape 4 : Configuration environnement

```bash
# Copier le template .env
cp .env.example .env

# Éditer avec vos valeurs
nano .env
```

## 🧪 Étape 5 : Tester le serveur

```bash
# Mode développement (avec hot-reload)
npm run dev

# Mode production
npm start
```

## ✅ Vérification des endpoints

### Healthcheck simple
```bash
curl http://localhost:5001/api/health
```

### Healthcheck détaillé
```bash
curl http://localhost:5001/api/health/detailed
```

### API racine
```bash
curl http://localhost:5001/api
```

## 📊 Consulter les logs

```bash
# Logs d'erreurs en temps réel
npm run logs:error

# Tous les logs
npm run logs:combined
```

---

## 🎯 Prochaines étapes

1. **Ajouter les routes Claude AI** (voir section suivante)
2. **Configurer les tests unitaires**
3. **Mettre en place CI/CD avec GitHub Actions**
4. **Ajouter Swagger pour documentation API**

---

## ⚠️ Points d'attention

- Les logs sont maintenant dans `logs/` (gitignorer ce dossier)
- Le rate limiting est activé sur `/api/*`
- CORS est configuré avec whitelist
- Validation stricte des variables d'env au démarrage
