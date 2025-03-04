'use client'

import Card from '@/components/Card'
import MachineCardList from '@/components/MachineCardList'
import ProgressRing from '@/components/ProgressRing'
import { useMachines } from '@/utils/supabase/hooks'
import Link from 'next/link'

export default function Home() {
  const machines = useMachines()

  const totalVolume = machines.reduce((acc, curr) => acc + curr.volume, 0)
  const totalBags = machines.reduce((acc, curr) => acc + curr.bags, 0)
  const totalMaxVolume = machines.length * 50
  const capacity = Math.round((totalBags / totalMaxVolume) * 100) || 0

  return (
    <main className="m-auto flex max-w-5xl flex-col gap-6 p-4">
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
      <section id="machines">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Machines</h1>
          <Link href="/machines" className="text-sm underline">
            Show all
          </Link>
        </div>
        {machines.length > 0 ? (
          <div className="relative grid gap-3">
            {machines
              .slice(0, 3)
              .sort((a, b) => a.id - b.id)
              .map((machine) => (
                <MachineCardList key={machine.name} data={machine} />
              ))}
            <div className="from-quinary pointer-events-none absolute bottom-0 h-16 w-full bg-gradient-to-t to-transparent" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-4xl font-bold">No machines found</h1>
            <p className="text-lg">Try searching for a machine by name or by category.</p>
          </div>
        )}
      </section>
    </main>
  )
}
