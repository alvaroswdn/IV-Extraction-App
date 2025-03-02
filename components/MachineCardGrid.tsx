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

export default function MachineCardGrid({ data }: Props) {
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
      <Card className="bg-primary justify-between gap-4 border-none px-2 py-1.5">
        <div className="flex justify-end">
          {machine.online && <div className="h-3 w-3 rounded-full bg-green-500" />}
          {!machine.online && <div className="h-3 w-3 rounded-full bg-red-400" />}
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">{machine.name}</h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BriefcaseMedicalIcon size={16} />
              <div className="h-1.5 w-full rounded-full bg-neutral-100">
                <div
                  className="bg-secondary h-1.5 rounded-full"
                  style={{ width: `${Math.round((machine.bags / machine.max_bags) * 100)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropletIcon size={16} />
              <div className="h-1.5 w-full rounded-full bg-neutral-100">
                <div
                  className="bg-secondary h-1.5 rounded-full"
                  style={{ width: `${Math.round((machine.volume / machine.max_volume) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
