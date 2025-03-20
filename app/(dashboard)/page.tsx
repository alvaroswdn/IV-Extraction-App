'use client'

import { Preview } from '@/components/machine'
import { PercentChart } from '@/components/percent-chart'
import { SimpleCard } from '@/components/simple-card'
import { useLoader } from '@/utils/loader'
import { useMachines } from '@/utils/supabase/hooks'
import { BadgeIcon, DropletIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const machines = useMachines()
  const [loaderElement, contentClass] = useLoader(machines.length <= 0)

  const totalVolume = machines.reduce((acc, curr) => acc + curr.volume, 0)
  const totalBags = machines.reduce((acc, curr) => acc + curr.bags, 0)
  const totalMaxVolume = machines.length * 50
  const capacity = Math.round((totalBags / totalMaxVolume) * 100) || 0

  return (
    <main className="m-auto grid min-h-svh max-w-5xl gap-6 p-4">
      {loaderElement}
      <div className={contentClass}>
        <section id="hero" className="grid grid-flow-row grid-cols-2 gap-4">
          <SimpleCard
            type="secondary"
            label="Total Volume"
            data={`${totalVolume} L`}
            icon={DropletIcon}
          />
          <SimpleCard label="Total Bags" data={totalBags} icon={BadgeIcon} />
          <div className="col-span-2 mt-6 mb-8 px-8">
            <PercentChart label="Recycled IV Fluids" value={capacity} />
          </div>
        </section>
        <section id="machines" className={contentClass}>
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Machines</h1>
            <Link href="/machines" className="text-sm underline">
              Show all
            </Link>
          </div>
          <Preview machines={machines} />
        </section>
      </div>
    </main>
  )
}
