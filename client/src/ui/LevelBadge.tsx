import type { Level } from '../domain/types'

const styles: Record<Level, string> = {
  '5e': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  '4e': 'bg-sky-50 text-sky-700 ring-sky-200',
  '3e': 'bg-violet-50 text-violet-700 ring-violet-200',
}

export default function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${styles[level]}`}>
      {level}
    </span>
  )
}
