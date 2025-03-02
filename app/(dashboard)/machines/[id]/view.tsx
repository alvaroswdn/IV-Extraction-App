'use client'

import Card from '@/components/Card'
import ProgressRing from '@/components/ProgressRing'
import { createClient } from '@/utils/supabase/client'
import { MachineData } from '@/utils/supabase/types'
import { useEffect, useState } from 'react'

export default function MachineView({ data }: { data: MachineData }) {
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
    <section className="p-4">
      <h1 className="mb-2 text-4xl font-semibold">{machine.name}</h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {machine.online && <div className="h-4 w-4 rounded-full bg-green-500" />}
          {!machine.online && <div className="h-4 w-4 rounded-full bg-red-400" />}

          <span>{machine.online ? 'Online' : 'Offline'}</span>
        </div>
        <span>{new Date(machine.updated_at).toLocaleDateString('en-GB')}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-neutral-300 p-3">
          <h2 className="text-sm font-semibold">Current Volume</h2>
          <h2 className="text-4xl font-semibold">{machine.volume} L</h2>
        </Card>
        <Card className="bg-primary border-none p-3">
          <h2 className="text-sm font-semibold">Total Bags</h2>
          <h2 className="text-4xl font-semibold">{machine.bags}</h2>
        </Card>
      </div>
      <div className="px-8 py-4">
        <ProgressRing
          color="text-secondary"
          value={Math.round((machine.bags / machine.max_bags) * 100)}
        >
          <div className="grid items-center gap-1 text-center font-semibold">
            <h1 className="text-xl">Capacity</h1>
            <h2 className="text-6xl">{Math.round((machine.bags / machine.max_bags) * 100)}%</h2>
          </div>
        </ProgressRing>
      </div>
    </section>
  )
}
