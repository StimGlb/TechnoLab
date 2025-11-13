export default function EmptyState({
  title = 'Rien à afficher',
  message = 'Ajuste les filtres ou crée un premier élément.',
  action,
}: {
  title?: string
  message?: string
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-white p-8 text-center">
      <div className="mx-auto mb-3 h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center">
        <span className="text-lg">ℹ️</span>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
