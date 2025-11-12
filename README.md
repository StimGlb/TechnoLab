# 📚 TechnoLab

> Mon atelier numérique pour organiser et structurer mes cours de technologie au collège

![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 À propos

**TechnoLab** est une application web personnelle qui me sert de mémento interactif et d'outil d'organisation pour mes cours de technologie au collège (cycle 4).

Objectifs :
- 🎓 Professionnel : centraliser et structurer séquences pédagogiques, fiches d'activités et suivis de compétences.
- 💻 Apprentissage : se former au développement web moderne (React + Node) en créant un outil utile au quotidien.

## Sommaire

- [Fonctionnalités](#-fonctionnalités-prévues)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet-reactvite--nodejs)
- [Prérequis](#-prérequis)
- [Installation & exécution](#-installation--exécution)
- [Variables d'environnement](#-variables-denvironnement)
- [Flux de développement](#-flux-de-développement)
- [Contribuer](#-contribuer)
- [Roadmap](#-roadmap)
- [Licence](#-licence)
- [Contact](#-contact)

## ✨ Fonctionnalités prévues

### Phase 1 - MVP
- [ ] 📋 Liste des séquences pédagogiques par niveau (5ème, 4ème, 3ème)  
- [ ] 📝 Création et édition de fiches d'activités  
- [ ] 🎯 Tableau de suivi des compétences du cycle 4  
- [ ] 🔍 Recherche et filtres par thématique/niveau  

### Phase 2 - Enrichissement
- [ ] 📊 Visualisation des progressions annuelles  
- [ ] 📎 Gestion des ressources (liens, fichiers)  
- [ ] 🗓️ Calendrier de planification des séances  
- [ ] 📈 Statistiques de couverture du programme  

### Phase 3 - Avancé
- [ ] 🤖 Générateur de fiches avec templates  
- [ ] 🔗 Export PDF / HTML  
- [ ] 💾 Sauvegarde cloud & synchronisation  
- [ ] 📱 Version mobile responsive  

## 🛠️ Stack technique

- Frontend : React 18+ (Vite)
- Styling : Tailwind CSS
- Routing : React Router
- État : Context API / Redux (au besoin)
- Backend : Node.js (ESM)
- Déploiement : Vercel (frontend) / (backend selon setup)
- Versionning : Git / GitHub

## 🗂️ Structure du projet (résumé)

Le projet est divisé en deux parties principales :
- project/client — application React (Vite)
- project/server — API Node.js

Chaque dossier contient son propre package.json et scripts (start / dev / build).

## ✅ Prérequis

- Node.js >= 18
- npm (ou pnpm / yarn)
- Git

## 🚀 Installation & exécution (développement)

1. Clonez le dépôt :
   ```
   git clone https://github.com/StimGlb/TechnoLab.git
   cd TechnoLab/project
   ```

2. Installer les dépendances :
   - Si vous utilisez npm (ex. pour chaque sous-projet) :
     ```
     cd client
     npm ci
     cd ../server
     npm ci
     ```
   - Ou utilisez un workspace / monorepo si configuré.

3. Lancer en développement :
   - Frontend :
     ```
     cd client
     npm run dev
     ```
   - Backend :
     ```
     cd server
     npm run dev
     ```

4. Accéder :
   - Frontend : http://localhost:5173 (ou port Vite)
   - Backend : http://localhost:5001 (ou port défini)

Remarque : adaptez les ports dans les fichiers .env si nécessaire.

## 🔐 Variables d'environnement (exemples)

Créez un fichier `.env` dans les dossiers `client` et `server` si nécessaire. Exemple pour server/.env :
```
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:5173
# JWT_SECRET=changeme
# MONGO_URI=mongodb://localhost:27017/technolab
```

## 🧭 Flux de développement recommandé

- Travaillez sur des branches nommées feature/xxx ou fix/xxx.
- Ouvrez des PRs pour fusionner dans main.
- Ajoutez des tests unitaires et des petits commits atomiques.
- Documentez les étapes importantes dans les fichiers README locaux (client/server).

## 🤝 Contribuer

Contributions bienvenues :
- Signalez issues (bugs, idées)
- Proposez des PR pour corriger ou améliorer
- Respectez les guidelines : messages de commit clairs, PR descriptives

Processus :
1. Fork → branch feature → commit → PR
2. CI / Review → merge

## 🛣️ Roadmap (rappel)

- Q1 2025 : Architecture + page d'accueil  
- Q2 2025 : Gestion des séquences & fiches  
- Q3 2025 : Tableau des compétences, recherche  
- Q4 2025 : Fonctionnalités avancées & optimisations  

## 📜 Licence

Ce projet est sous licence MIT — voir le fichier LICENSE pour les détails.

## 📬 Contact

Auteur : StimGlb  
Repo : https://github.com/StimGlb/TechnoLab

Merci d'avoir choisi TechnoLab — si vous voulez, j'intègre ce README dans le dépôt et je crée une PR avec d'autres fichiers d'assistance (ex. .env.example, README dans client/server). 