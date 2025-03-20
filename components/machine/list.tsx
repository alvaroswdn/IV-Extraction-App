'use client'

import { CardContent, Card as GenericCard } from '@/components/ui/card'
import { MachineData } from '@/utils/supabase/types'
import { BriefcaseMedicalIcon, DropletIcon } from 'lucide-react'
import Link from 'next/link'

export function ListCard({ data }: { data: MachineData }) {
  return (
    <Link href={`/machines/${data.id}`}>
      <GenericCard className="bg-accent border-none pr-4 pl-2">
        <CardContent className="flex items-center justify-between">
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
        </CardContent>
      </GenericCard>
    </Link>
  )
}

export function ListView({ machines }: { machines: MachineData[] }) {
  return (
    <div className="grid gap-3">
      {machines &&
        machines
          .sort((a, b) => a.id - b.id)
          .map((machine) => <ListCard key={machine.id} data={machine} />)}
    </div>
  )
}
