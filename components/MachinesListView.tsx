import { MachineData } from '@/utils/supabase/types'
import MachineCardList from './MachineCardList'

export default function MachinesListView({ machines }: { machines: MachineData[] }) {
  return (
    <div className="grid gap-3">
      {machines &&
        machines
          .sort((a, b) => a.id - b.id)
          .map((machine) => <MachineCardList key={machine.id} data={machine} />)}
    </div>
  )
}
