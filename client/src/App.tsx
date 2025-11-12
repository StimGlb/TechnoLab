import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={viteLogo} alt="Vite" className="h-8 w-8" />
            <img src={reactLogo} alt="React" className="h-8 w-8" />
            <h1 className="text-lg font-semibold tracking-tight">
              TechnoLab
            </h1>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              href="https://vite.dev"
              target="_blank"
              rel="noreferrer"
            >
              Vite
            </a>
            <a
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
            >
              React
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Hero */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Bienvenue dans TechnoLab
          </h2>
          <p className="mt-2 text-gray-600">
            Organise tes cours et suis les activités des élèves facilement.
          </p>
        </section>

        {/* Card démo compteur */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold">Compteur de démonstration</h3>
              <p className="mt-1 text-sm text-gray-500">
                Clique pour incrémenter et tester le Hot Module Reload (HMR).
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              React + Vite
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm ring-1 ring-indigo-600/10 transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Incrémenter
            </button>
            <button
              onClick={() => setCount(0)}
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Réinitialiser
            </button>
            <span className="ml-auto text-sm text-gray-500">
              Valeur actuelle: <span className="font-semibold text-gray-800">{count}</span>
            </span>
          </div>
        </section>

        {/* Liens utiles */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            <h4 className="font-semibold text-gray-800 group-hover:text-indigo-700">
              Docs Tailwind
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Utilitaires, patterns, bonnes pratiques.
            </p>
          </a>
          <a
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            href="https://vite.dev/guide/"
            target="_blank"
            rel="noreferrer"
          >
            <h4 className="font-semibold text-gray-800 group-hover:text-indigo-700">
              Guide Vite
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Démarrage rapide, HMR, config, plugins.
            </p>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t bg-white/70">
        <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} TechnoLab — Collège Moulin à Vent. Fait avec React, Vite et Tailwind.
        </div>
      </footer>
    </div>
  )
}
