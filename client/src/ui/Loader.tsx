export function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <svg className="h-5 w-5 animate-spin text-indigo-600" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
      </svg>
      {label}
    </div>
  )
}
