'use client'

import {
  ArrowRightIcon,
  BellIcon,
  FormInputIcon,
  GlobeIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Settings() {
  return (
    <nav className="mt-4 flex h-full w-full flex-col gap-4 bg-white px-10 text-xl text-neutral-900 *:border-b">
      <Link href="/settings/profile" className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <UserIcon />
          Profile
        </div>
        <ArrowRightIcon />
      </Link>
      <Link href="/settings/notification" className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <BellIcon />
          Notification
        </div>
        <ArrowRightIcon />
      </Link>
      <Link href="/settings/language" className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <GlobeIcon />
          Language
        </div>
        <ArrowRightIcon />
      </Link>
      <Link href="/settings/changepassword" className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <FormInputIcon />
          Change Password
        </div>
        <ArrowRightIcon />
      </Link>
      <button
        onClick={() => signOut()}
        className="flex cursor-pointer items-center justify-between py-4 text-red-500"
      >
        <div className="flex items-center gap-4">
          <LogOutIcon />
          Logout
        </div>
        <ArrowRightIcon />
      </button>
    </nav>
  )
}
