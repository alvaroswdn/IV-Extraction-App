'use client'

import Card from '@/components/Card'
import ProgressRing from '@/components/ProgressRing'
import { useLoader } from '@/utils/loader'
import { useMachines } from '@/utils/supabase/hooks'
import { useParams } from 'next/navigation'

export default function Machine() {
  const { id } = useParams<{ id: string }>()
  const machines = useMachines()
  const [loaderElement, contentClass] = useLoader(machines.length <= 0)
  const machine = machines.find((machine) => machine.id === parseInt(id))

  if (!machine) {
    return (
      <div className="visible m-auto mt-24 flex max-w-96 scale-50 animate-spin">
        <ProgressRing color="text-secondary" value={8} />
      </div>
    )
  }

  const lastUpdated = new Date(machine.updated_at).toLocaleDateString('en-GB')
  const capacity = Math.round((machine.bags / machine.max_bags) * 100)

  return (
    <main>
      {loaderElement}
      <section className={`p-4 ${contentClass}`}>
        <h1 className="mb-2 text-4xl font-semibold">{machine.name}</h1>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {machine.online && <div className="h-4 w-4 rounded-full bg-green-500" />}
            {!machine.online && <div className="h-4 w-4 rounded-full bg-red-400" />}

            <span>{machine.online ? 'Online' : 'Offline'}</span>
          </div>
          <span>{lastUpdated}</span>
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
          <ProgressRing color="text-secondary" value={capacity}>
            <div className="grid items-center gap-1 text-center font-semibold">
              <h1 className="text-xl">Capacity</h1>
              <h2 className="text-6xl">{capacity}%</h2>
            </div>
          </ProgressRing>
        </div>
      </section>
    </main>
  )
}
