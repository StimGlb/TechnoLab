
---

## **🛠 Choix Techniques et Dépendances**
### **1. Frontend (React + Vite + Tailwind)**
| Outil/Dépendance       | Version       | Rôle                                                                 | Pourquoi ce choix ?                                                                 |
|------------------------|---------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------|
| **Vite**               | `^5.0.0`      | Bundler et serveur de développement                                  | ⚡ **Rapidité** (HMR instantané), configuration minimale, optimisé pour React.       |
| **React**              | `^18.2.0`     | Bibliothèque UI                                                      | Composants réutilisables, écosystème mature, idéal pour les interfaces dynamiques. |
| **TypeScript**         | `^5.0.0`      | Typage statique                                                      | ✅ Réduction des bugs, meilleure maintenabilité, autocomplétion IDE.               |
| **Tailwind CSS**       | `^3.3.0`      | Framework CSS utilitaire                                             | 🎨 **Design systématique**, personnalisation facile, pas de noms de classes arbitraires. |
| **Framer Motion**       | `^10.0.0`     | Animations                                                           | 🔄 Animations fluides pour les transitions (ex: apparition des cartes de cours).  |
| **Axios**              | `^1.6.0`      | Requêtes HTTP                                                        | 📡 Plus simple que `fetch`, interceptors pour les headers (JWT, etc.).             |
| **Zustand**            | `^4.4.0`      | Gestion d'état                                                      | ⚖️ Alternative légère à Redux, idéale pour les états globaux (ex: utilisateur connecté). |
| **React Router DOM**    | `^6.20.0`     | Routing                                                             | 🗺️ Navigation entre pages (ex: `/dashboard`, `/courses/:id`).                      |
| **Date-fns**           | `^2.30.0`     | Manipulation de dates                                               | 📅 Plus léger que Moment.js, pour afficher les dates des devoirs.                 |
| **Zod**                | `^3.22.0`     | Validation de données                                               | 🛡️ Validation des formulaires (ex: création de cours).                           |
| **ESLint** + **Prettier** | Latest      | Linting et formatage                                                | 🧹 Code propre et cohérent, intégration avec VSCode.                                |

### **2. Backend (Optionnel)**
| Outil/Dépendance       | Version       | Rôle                                                                 |
|------------------------|---------------|----------------------------------------------------------------------|
| **Node.js**            | `^20.0.0`     | Runtime JavaScript                                                   |
| **Express**            | `^4.18.0`     | Framework web                                                        |
| **Prisma**             | `^5.0.0`      | ORM (Base de données)                                                |
| **JWT**                | `^9.0.0`      | Authentification                                                    |

### **3. Outils DevOps**
| Outil                 | Rôle                                                                 |
|-----------------------|----------------------------------------------------------------------|
| **GitHub Actions**    | CI/CD (tests, build, déploiement)                                    |
| **Docker**            | Conteneurisation (si déploiement sur un serveur)                    |
| **Vercel/Netlify**    | Hébergement frontend (pour les démos)                               |

---

## **📌 Philosophies et Conventions**
1. **Nommage des composants** :
   - **PascalCase** pour les composants React (`CourseCard.tsx`).
   - **kebab-case** pour les fichiers non-composants (ex: `course-utils.ts`).
   - Préfixes pour les composants métiers : `Pedago` (ex: `PedagoCourseCard`).

2. **Structure des fichiers** :
   - **1 fichier = 1 composant/logique** (éviter les fichiers géants).
   - **Colocation** : Les styles, tests et types d’un composant sont dans le même dossier.
     ```
     components/
     └── pedagogie/
         └── CourseCard/
             ├── CourseCard.tsx       # Composant principal
             ├── CourseCard.test.tsx  # Tests
             ├── CourseCard.types.ts  # Types TypeScript
             └── index.ts             # Export par défaut
     ```

3. **Gestion d’état** :
   - **État local** : `useState`/`useReducer` pour les composants isolés.
   - **État global** : **Zustand** pour les données partagées (ex: liste des cours, utilisateur connecté).
   - **Évitez les props drilling** : Utilisez le **Context API** pour les données profondes (ex: thème sombre).

4. **Styles avec Tailwind** :
   - **Classes utilitaires** pour les styles simples (ex: `bg-pedagogie-math`).
   - **Composants réutilisables** dans `src/components/common/` (ex: `Button.tsx`, `Card.tsx`).
   - **Variantes dark mode** : Toujours tester les composants en mode sombre (`dark:bg-gray-800`).

5. **Tests** :
   - **Jest** + **React Testing Library** pour les tests unitaires.
   - **Cypress** ou **Playwright** pour les tests E2E (ex: parcours "créer un cours").

---

## **🎯 Premiers Composants à Développer**
### **1. `Dashboard.tsx`**
**Objectif** : Tableau de bord central pour les enseignants/élèves, avec :
- **Stats clés** :
  - Nombre de cours en cours.
  - Devoirs à rendre (avec échéances).
  - Moyenne des notes (si applicable).
- **Widgets** :
  - Calendrier des prochains devoirs.
  - Liste des cours récents.
  - Graphique de progression (ex: avec `Chart.js`).
- **Actions rapides** :
  - Bouton "Créer un nouveau cours".
  - Filtres par matière/date.

**Dépendances suggérées** :
- `react-router-dom` (liens vers les détails des cours).
- `date-fns` (formater les dates des devoirs).
- `framer-motion` (animations pour les widgets).

**Exemple de props** :
```tsx
type DashboardProps = {
  userRole: 'teacher' | 'student';  // Affiche des widgets différents
  upcomingAssignments: Assignment[];
  recentCourses: Course[];
  stats: {
    averageGrade?: number;
    pendingReviews: number;
  };
};
