'use client'

import { PercentChart } from '@/components/percent-chart'
import ProgressRing from '@/components/ProgressRing'
import { SimpleCard } from '@/components/simple-card'
import { useLoader } from '@/utils/loader'
import { useMachines } from '@/utils/supabase/hooks'
import { BriefcaseMedicalIcon, DropletIcon } from 'lucide-react'
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
          <SimpleCard
            type="secondary"
            label="Current Volume"
            data={`${machine.volume} L`}
            icon={DropletIcon}
          />
          <SimpleCard label="Total Bags" data={machine.bags} icon={BriefcaseMedicalIcon} />
        </div>
        <div className="px-8 py-4">
          <PercentChart label="Capacity" value={capacity} />
        </div>
      </section>
    </main>
  )
}
