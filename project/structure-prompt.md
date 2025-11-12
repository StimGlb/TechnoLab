## Racine du projet

/
├── client/         # Application React/Vite (front-end)
├── server/         # Application Node.js (back-end)
├── package.json    # Gestion des scripts globaux (optionnel)
├── README.md       # Présentation générale du projet
├── STRUCTURE.md    # Ce fichier : description de l’architecture
├── .gitignore
└── docs/           # Documentation additionnelle

---

## Côté Client (React/Vite)

client/
├── public/         # Fichiers statiques (favicon, images, etc.)
├── src/
│   ├── assets/         # Images, styles, polices
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages principales (routing)
│   ├── features/       # Modules métier (domaines fonctionnels)
│   ├── hooks/          # Custom hooks React
│   ├── context/        # Contexts globaux (ex : Auth, Theme)
│   ├── services/       # Appels API, gestion des données
│   ├── App.tsx         # Composant racine
│   ├── main.tsx        # Point d’entrée
│   └── index.css       # Styles globaux
├── vite.config.ts      # Configuration Vite
├── tsconfig.json       # Configuration TypeScript (si TS)
└── package.json        # Dépendances front-end

---

## Côté Serveur (Node.js)

server/
├── src/
│   ├── controllers/    # Logique des routes
│   ├── models/         # Modèles de données (ex : Mongoose)
│   ├── routes/         # Définition des endpoints API
│   ├── middleware/     # Middlewares Express
│   ├── services/       # Services métier, accès BDD
│   ├── utils/          # Fonctions utilitaires
│   └── app.js          # Point d’entrée Express
├── package.json        # Dépendances back-end
├── .env                # Variables d’environnement
└── README.md           # Documentation serveur