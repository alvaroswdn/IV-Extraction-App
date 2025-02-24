'use client'

import { usePathname } from 'next/navigation'

const pageMap: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
}

export default function PageName() {
  const pathname = usePathname()
  return <h1 className="text-lg">{pageMap[pathname]}</h1>
}
