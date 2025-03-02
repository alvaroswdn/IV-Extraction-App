'use client'

import { createClient } from '@/utils/supabase/client'
import { MachineData } from '@/utils/supabase/types'
import { BriefcaseMedicalIcon, DropletIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Card from './Card'

type Props = {
  data: MachineData
}

export default function MachineCardList({ data }: Props) {
  const supabase = createClient()
  const [machine, setMachine] = useState<MachineData>(data)

  useEffect(() => {
    const channel = supabase
      .channel('realtime-machine')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          setMachine(payload.new as MachineData)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, machine, setMachine])

  return (
    <Link href={`/machines/${machine.id}`}>
      <Card className="bg-primary flex-row items-center border-none pr-4 pl-2">
        <div className="flex items-center gap-3">
          {machine.online && <div className="h-13 w-1 rounded-full bg-green-500" />}
          {!machine.online && <div className="h-13 w-1 rounded-full bg-red-400" />}
          <div>
            <h2 className="text-lg font-semibold">{machine.name}</h2>
            <span>{machine.online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="grid">
            <h4 className="flex items-center justify-end gap-1 font-semibold">
              <BriefcaseMedicalIcon size={16} />
              {machine.bags}
            </h4>
            <span className="text-xs font-light">of {machine.max_bags}</span>
          </div>
          <div className="grid">
            <h4 className="flex items-center justify-end gap-1 font-semibold">
              <DropletIcon size={16} />
              {machine.volume} L
            </h4>
            <span className="text-center text-xs font-light">of {machine.max_volume} L</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
