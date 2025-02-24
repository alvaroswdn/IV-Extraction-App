import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  type: 'primary' | 'secondary'
  label: string
  icon: LucideIcon
  children?: ReactNode
}

const meta = {
  primary: {
    parentClass: 'bg-gradient-to-b from-[#99bcd7] to-[#535b71]',
    iconClass: 'bg-secondary text-quaternary',
  },
  secondary: {
    parentClass: 'border border-neutral-200',
    iconClass: 'bg-primary text-secondary',
  },
}

export default function Card({ type, label, icon: Icon, children }: Props) {
  return (
    <div
      className={`text-quinary flex min-h-52 flex-col justify-between gap-2 rounded-xl p-3 ${meta[type].parentClass}`}
    >
      <div>
        <Icon className="h-14 w-14" />
        <h2 className="mt-2 text-2xl font-medium">{label}</h2>
      </div>
      <div className="text-lg">{children}</div>
    </div>
  )
}
