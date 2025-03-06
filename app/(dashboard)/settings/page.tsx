'use client'

import SettingsLink from '@/components/SettingsLink'
import { createClient } from '@/utils/supabase/client'
import {
  ArrowRightIcon,
  BellIcon,
  FormInputIcon,
  GlobeIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const supabase = createClient()
  const router = useRouter()

  return (
    <nav className="mt-4 flex h-full w-full flex-col gap-4 bg-white px-10 text-xl text-neutral-900 *:border-b">
      <SettingsLink name="Profile" href="profile" icon={UserIcon} />
      <SettingsLink name="Notification" href="notification" icon={BellIcon} />
      <SettingsLink name="Language" href="language" icon={GlobeIcon} />
      <SettingsLink name="Change Password" href="changepassword" icon={FormInputIcon} />
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
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
