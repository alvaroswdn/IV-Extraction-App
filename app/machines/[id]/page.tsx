import Card from '@/components/Card'
import ProgressRing from '@/components/ProgressRing'
import { machines } from '..'

export default async function Machine({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const data = machines.find((machine) => machine.id === id)

  if (!data) {
    return <div>Machine not found</div>
  }

  const bagCapacity = Math.round((data.bags / data.maxBags) * 100)

  return (
    <main>
      <section className="p-4">
        <h1 className="mb-2 text-4xl font-semibold">{data.name}</h1>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {data.online && <div className="h-4 w-4 rounded-full bg-green-500" />}
            {!data.online && <div className="h-4 w-4 rounded-full bg-red-400" />}

            <span>{data.online ? 'Online' : 'Offline'}</span>
          </div>
          <span>{new Date(data.lastOnline).toLocaleDateString('en-GB')}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-neutral-300 p-3">
            <h2 className="text-sm font-semibold">Current Volume</h2>
            <h2 className="text-4xl font-semibold">{data.volume} L</h2>
          </Card>
          <Card className="bg-primary border-none p-3">
            <h2 className="text-sm font-semibold">Total Bags</h2>
            <h2 className="text-4xl font-semibold">{data.bags}</h2>
          </Card>
        </div>
        <div className="px-8 py-4">
          <ProgressRing color="text-secondary" value={bagCapacity}>
            <div className="grid items-center gap-1 text-center font-semibold">
              <h1 className="text-xl">Capacity</h1>
              <h2 className="text-6xl">{bagCapacity}%</h2>
            </div>
          </ProgressRing>
        </div>
      </section>
    </main>
  )
}
