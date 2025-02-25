import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={`flex flex-col justify-between gap-2 rounded-xl border-2 border-neutral-300 p-3 ${className}`}
    >
      {children}
    </div>
  )
}
