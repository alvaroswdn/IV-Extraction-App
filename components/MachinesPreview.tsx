import { MachineData } from '@/utils/supabase/types'
import MachineCardList from './MachineCardList'

export default function MachinesPreview({ machines }: { machines: MachineData[] }) {
  return machines.length > 0 ? (
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
  )
}
