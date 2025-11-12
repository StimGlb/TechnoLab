1) Fondations à poser (1 journée)

Layout et routing
Pages: Home, Séquences, Activités, Compétences, À propos.
Un Layout de base avec navbar + container centré.


Design system minimal Tailwind
Boutons, badge, input, select, card, table. Réutilisables.


Types et conventions
Types TS communs (Sequence, Activity, Competency, Level).
Utils: cn() pour concaténer des classes, formatters (date FR), etc.



Exemples:
// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Home from './pages/Home'
import SequencesList from './pages/sequences/SequencesList'
import SequenceDetail from './pages/sequences/SequenceDetail'
// à compléter: Activities, Competencies, About

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sequences', element: <SequencesList /> },
      { path: 'sequences/:id', element: <SequenceDetail /> },
    ],
  },
])
// src/ui/AppLayout.tsx
import { Outlet, NavLink } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-800">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-5xl px-6 py-3 flex gap-4">
          {[
            ['Accueil','/'],
            ['Séquences','/sequences'],
            ['Activités','/activities'],
            ['Compétences','/competencies'],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({isActive}) =>
                `text-sm px-3 py-1.5 rounded ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
              }
              end={to==='/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-sm text-gray-500">
          TechnoLab — {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

2) Modèles de données et mock (une demi‑journée)
Commence sans dépendre du serveur: données mockées puis remplace par l’API.
// src/domain/types.ts
export type Level = '5e' | '4e' | '3e'
export type Competency =
  | 'Imaginer' | 'Représenter' | 'OutilsNum' | 'Analyser'
  | 'FluxInfo' | 'Programmer' | 'Comparer' | 'Communiquer' | 'Concevoir'

export interface Activity {
  id: string
  title: string
  level: Level
  durationMin: number
  competencies: Competency[]
  tags: string[]
  updatedAt: string // ISO
}

export interface Sequence {
  id: string
  title: string
  level: Level
  theme: string
  weekRange?: string // ex: "Semaine 36-40"
  activities: Activity[]
  updatedAt: string
}
// src/mock/db.ts
import { Sequence } from '../domain/types'
export const sequencesMock: Sequence[] = [
  {
    id: 'seq-ost-5e',
    title: 'Évolution des objets et systèmes techniques',
    level: '5e',
    theme: 'Culture technologique',
    weekRange: 'Sem. 36-40',
    updatedAt: '2025-09-15',
    activities: [
      { id:'act-1', title:'Ligne du temps', level:'5e', durationMin:55, competencies:['Comparer','Communiquer'], tags:['Histoire','Frise'], updatedAt:'2025-09-10' },
      { id:'act-2', title:'Objets du quotidien', level:'5e', durationMin:55, competencies:['Analyser'], tags:['Usage'], updatedAt:'2025-09-12' },
    ],
  },
]

3) Client API minimal + stratégie d’état (une demi‑journée)

Court terme: React Query n’est pas indispensable; commence simple:
Un fetcher avec gestion d’erreurs, et un cache en mémoire très léger.


État global: Context pour filtres et préférences; garde Redux pour plus tard si besoin.

// src/lib/api.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export async function api<T>(path: string, options?: RequestInit & { method?: HttpMethod }) {
  const res = await fetch(`${BASE}${path}`, { headers:{'Content-Type':'application/json'}, ...options })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.status !== 204 ? (await res.json() as T) : (undefined as T)
}
Plus tard, tu remplaceras sequencesMock par api<Sequence[]>('/sequences').

4) Première page utile: Liste des séquences + filtres (1 journée)
Objectif: couvrir MVP “📋 Liste des séquences” et “🔍 Recherche/filtre”.
// src/pages/sequences/SequencesList.tsx
import { useMemo, useState } from 'react'
import { sequencesMock } from '../../mock/db'
import { Sequence, Level } from '../../domain/types'
import { Link } from 'react-router-dom'

export default function SequencesList() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState<Level | 'all'>('all')

  const filtered = useMemo(() => {
    return sequencesMock.filter(s => {
      const okLevel = level==='all' || s.level===level
      const okQuery =
        q.trim()==='' ||
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.theme.toLowerCase().includes(q.toLowerCase())
      return okLevel && okQuery
    })
  }, [q, level])

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">Séquences</h1>
          <p className="text-sm text-gray-600">Liste filtrable par niveau et mot‑clé.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un titre ou thème…"
            className="w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tous niveaux</option>
            <option value="5e">5e</option>
            <option value="4e">4e</option>
            <option value="3e">3e</option>
          </select>
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {filtered.map((s: Sequence) => (
          <li key={s.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.theme}</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {s.level}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {s.activities.length} activité(s) • {s.weekRange ?? 'Période à définir'}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/sequences/${s.id}`}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                Ouvrir
              </Link>
              <button className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                Dupliquer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
          Aucune séquence trouvée. Ajuste les filtres.
        </div>
      )}
    </section>
  )
}

5) Page détail séquence (une demi‑journée)

Objectif: fournir un aperçu des activités de la séquence.
Table simple avec durée, compétences (badges), actions “éditer”/“voir”.

// src/pages/sequences/SequenceDetail.tsx
import { useParams, Link } from 'react-router-dom'
import { sequencesMock } from '../../mock/db'

export default function SequenceDetail() {
  const { id } = useParams()
  const seq = sequencesMock.find(s => s.id === id)
  if (!seq) return <div>Introuvable</div>

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{seq.title}</h1>
          <p className="text-sm text-gray-600">{seq.theme} • {seq.level}</p>
        </div>
        <Link to="/sequences" className="text-sm text-indigo-700 hover:underline">← Retour</Link>
      </header>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Activité</th>
              <th className="px-4 py-2 text-left">Durée</th>
              <th className="px-4 py-2 text-left">Compétences</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {seq.activities.map(a => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2 font-medium text-gray-900">{a.title}</td>
                <td className="px-4 py-2">{a.durationMin} min</td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {a.competencies.map(c => (
                      <span key={c} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button className="rounded-md border px-3 py-1.5 hover:bg-gray-50">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

6) Ensuite: éditeur d’activité simple (Phase 1)

Formulaire minimal: titre, niveau, durée, compétences (checkboxes), tags.
Validation légère côté client.
Mode “draft” en localStorage tant que l’API n’est pas branchée.


7) Intégration serveur progressive
Quand prêt:

Remplace les mocks par des appels api('/sequences').
Ajoute un “loader state” et “error state” par page.
Si tu fais du CRUD, introduis React Query pour la synchro cache <-> serveur.


8) Qualité de vie

i18n FR: formatage de date “fr-FR”.
Accessibilité: focus styles visibles, aria-labels sur boutons icône.
Tests vitaux: un test de rendu par page et un test de filtrage avec Vitest/RTL.


Ordre recommandé sur 3–4 jours
Jour 1:

Layout, router, DS boutons/inputs, types, mocks.

Jour 2:

Page Séquences (liste + filtres), navigation vers détail.

Jour 3:

Page Détail séquence (table activités), petites polishes UI.
Formulaire d’activité en brouillon (si temps).

Jour 4:

Brancher API pour “GET /sequences”, gérer loading/error, remplacer mocks.