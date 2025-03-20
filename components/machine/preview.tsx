import { MachineData } from '@/utils/supabase/types'
import { ListCard } from './list'

export default function Preview({ machines }: { machines: MachineData[] }) {
  return machines.length > 0 ? (
    <div className="relative grid gap-3">
      {machines
        .slice(0, 3)
        .sort((a, b) => a.id - b.id)
        .map((machine) => (
          <ListCard key={machine.name} data={machine} />
        ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">No machines found</h1>
      <p className="text-lg">Try searching for a machine by name or by category.</p>
    </div>
  )
}
