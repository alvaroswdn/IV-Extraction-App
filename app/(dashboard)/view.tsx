'use client'

import Card from '@/components/Card'
import ProgressRing from '@/components/ProgressRing'
import { createClient } from '@/utils/supabase/client'
import { MachineData } from '@/utils/supabase/types'
import { useEffect, useState } from 'react'

export function HeroView({ data }: { data: MachineData[] }) {
  const supabase = createClient()
  const [machines, setMachines] = useState<MachineData[]>(data)

  useEffect(() => {
    const channel = supabase
      .channel('realtime-machines')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          setMachines([...machines, payload.new as MachineData])
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          setMachines([
            ...machines.filter((machine) => machine.id !== payload.old.id),
            payload.new as MachineData,
          ])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, machines, setMachines])

  const totalVolume = data.length > 0 ? machines.reduce((acc, curr) => acc + curr.volume, 0) : 0
  const totalBags = data.length > 0 ? machines.reduce((acc, curr) => acc + curr.bags, 0) : 0
  const totalMaxVolume = data.length > 0 ? machines.length * 50 : 0
  const capacity = data.length > 0 ? Math.round((totalBags / totalMaxVolume) * 100) : 0

  return (
    <section id="hero">
      <div className="grid grid-flow-col grid-cols-2 gap-4">
        <Card>
          <h1>Total Volume</h1>
          <h2 className="text-4xl font-semibold">{totalVolume} L</h2>
        </Card>
        <Card className="bg-primary border-none">
          <h1>Total Bags</h1>
          <h2 className="text-4xl font-semibold">{totalBags}</h2>
        </Card>
      </div>
      <div className="mt-6 px-8">
        <ProgressRing color="text-secondary" value={capacity}>
          <div className="grid items-center gap-1 text-center font-semibold">
            <h1 className="text-xl">Recycled IV Fluids</h1>
            <h2 className="text-6xl">{capacity}%</h2>
          </div>
        </ProgressRing>
      </div>
    </section>
  )
}
