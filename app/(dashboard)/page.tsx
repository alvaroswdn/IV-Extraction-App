import MachineCardList from '@/components/MachineCardList'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { HeroView } from './view'

export default async function Home() {
  const supabase = await createClient()
  const data = (await supabase.from('machines').select('*')).data || []

  return (
    <main className="m-auto flex max-w-5xl flex-col gap-6 p-4">
      <HeroView data={data} />
      <section id="machines">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Machines</h1>
          <Link href="/machines" className="text-sm underline">
            Show all
          </Link>
        </div>
        {data.length > 0 ? (
          <div className="relative grid gap-3">
            {data!.slice(0, 3).map((machine) => (
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
