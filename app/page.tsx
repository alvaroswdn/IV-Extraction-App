'use client'

import Card from '@/components/Card'
import MachineCardList from '@/components/MachineCardList'
import ProgressRing from '@/components/ProgressRing'
import Link from 'next/link'
import { machines } from './machines'

export default function Home() {
  // const [timeframe, setTimeframe] = useState<Timeframe>('day')

  // const data = {
  //   day: 40,
  //   week: 60,
  //   month: 80,
  //   year: 100,
  // }

  return (
    <main className="m-auto flex max-w-5xl flex-col gap-4 p-4">
      <section id="hero">
        <div className="grid grid-flow-col grid-cols-2 gap-4">
          <Card>
            <h1>Total Volume</h1>
            <h2 className="text-4xl font-semibold">14.1 L</h2>
          </Card>
          <Card className="bg-primary border-none">
            <h1>Total Bags</h1>
            <h2 className="text-4xl font-semibold">10</h2>
          </Card>
        </div>
        <div className="p-8">
          <ProgressRing color="text-secondary" value={68}>
            <div className="grid items-center gap-1 text-center font-semibold">
              <h1 className="text-xl">Recycled IV Fluids</h1>
              <h2 className="text-6xl">68%</h2>
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
        <div className="grid gap-3">
          {machines.slice(0, 3).map((machine) => (
            <MachineCardList key={machine.name} data={machine} />
          ))}
        </div>
      </section>
    </main>
  )
}
