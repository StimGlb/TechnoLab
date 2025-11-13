import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md text-center space-y-4">
      <h1 className="text-3xl font-bold text-indigo-700">Page introuvable</h1>
      <p className="text-gray-600">
        Oups… La page demandée n’existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Revenir à l’accueil
      </Link>
    </div>
  )
}
