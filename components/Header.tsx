'use client'

import { ArrowLeftIcon, MenuIcon, SettingsIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const links: Record<string, string> = {
  '/': 'Home',
  '/machines': 'Machines',
}

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [showNav, setShowNav] = useState(false)

  useEffect(() => setShowNav(false), [pathname])

  return (
    <>
      <header className="z-10 flex items-center justify-between bg-white p-4 font-semibold text-neutral-900">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            if (pathname.startsWith('/settings')) {
              router.back()
            } else {
              setShowNav(true)
            }
          }}
        >
          {!pathname.startsWith('/settings') && <MenuIcon size={24} />}
          {pathname.startsWith('/settings') && <ArrowLeftIcon size={24} />}
        </button>
        <h1 className="text-lg">{getTitle(pathname)}</h1>
        <Link href="/settings" className={pathname.startsWith('/settings') ? 'invisible' : ''}>
          <SettingsIcon size={24} />
        </Link>
      </header>
      {showNav && (
        <nav className="fixed top-0 z-20 flex h-full w-full flex-col border-b bg-white font-semibold text-neutral-900">
          <header className="z-10 flex items-center justify-between bg-white p-4 pb-10 text-neutral-900">
            <button type="button" className="cursor-pointer" onClick={() => setShowNav(false)}>
              <XIcon size={24} />
            </button>
            <h1 className="text-lg">{getTitle(pathname)}</h1>
            <Link href="/settings">
              <SettingsIcon size={24} />
            </Link>
          </header>
          {Object.entries(links).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`px-8 py-4 ${(href === '/' ? href === pathname : pathname.startsWith(href)) ? 'bg-primary text-secondary font-bold' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}

function getTitle(pathname: string): string {
  if (pathname.startsWith('/machines')) {
    return 'Machines'
  }

  if (pathname.startsWith('/settings')) {
    return 'Settings'
  }

  switch (pathname) {
    case '/':
      return 'Home'
    default:
      return pathname.replace(/\//g, '')
  }
}
