import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type Props = {
  label: string
  icon: LucideIcon
  data: string | number
  type?: CardType
}

type CardType = 'primary' | 'secondary'

export function SimpleCard({ label, data, icon: Icon, type }: Props) {
  return (
    <Card className={cn(type === 'secondary' ? 'bg-transparent' : '', 'px-3')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0.5">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="hidden size-4 lg:block" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{data}</div>
      </CardContent>
    </Card>
  )
}
