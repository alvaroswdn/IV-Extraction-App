import { createClient } from '@/utils/supabase/server'
import MachinesView from './view'

export default async function Machines() {
  const supabase = await createClient()
  const { data } = await supabase.from('machines').select('*')

  return (
    <main className="grid gap-4 p-4">
      <MachinesView serverMachines={data!} />
    </main>
  )
}
