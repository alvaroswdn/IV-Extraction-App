import { ArrowRightIcon, LucideIcon } from 'lucide-react'
import Link from 'next/link'

export default function SettingsLink({
  name,
  href,
  icon: Icon,
}: {
  name: string
  href: string
  icon: LucideIcon
}) {
  return (
    <Link href={`/settings/${href}`} className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Icon />
        {name}
      </div>
      <ArrowRightIcon />
    </Link>
  )
}
