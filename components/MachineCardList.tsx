'use client'

import { MachineData } from '@/utils/supabase/types'
import { BriefcaseMedicalIcon, DropletIcon } from 'lucide-react'
import Link from 'next/link'
import Card from './Card'

type Props = {
  data: MachineData
}

export default function MachineCardList({ data }: Props) {
  return (
    <Link href={`/machines/${data.id}`}>
      <Card className="bg-primary flex-row items-center border-none pr-4 pl-2">
        <div className="flex items-center gap-3">
          {data.online && <div className="h-13 w-1 rounded-full bg-green-500" />}
          {!data.online && <div className="h-13 w-1 rounded-full bg-red-400" />}
          <div>
            <h2 className="text-lg font-semibold">{data.name}</h2>
            <span>{data.online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="grid">
            <h4 className="flex items-center justify-end gap-1 font-semibold">
              <BriefcaseMedicalIcon size={16} />
              {data.bags}
            </h4>
            <span className="text-xs font-light">of {data.max_bags}</span>
          </div>
          <div className="grid">
            <h4 className="flex items-center justify-end gap-1 font-semibold">
              <DropletIcon size={16} />
              {data.volume} L
            </h4>
            <span className="text-center text-xs font-light">of {data.max_volume} L</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
