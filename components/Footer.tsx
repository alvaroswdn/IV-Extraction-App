'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/settings')) return null

  return (
    <footer className="row-start-3 mt-8 flex flex-wrap items-center justify-center gap-6 p-6">
      <span>a couple of folks - 2025</span>
    </footer>
  )
}
