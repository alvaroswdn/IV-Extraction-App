import { createClient } from '@/utils/supabase/server'
import MachineView from './view'

export default async function Machine({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const id = parseInt((await params).id)
  const { data } = await supabase.from('machines').select('*').eq('id', id).limit(1).single()

  if (!data) {
    return <div>Machine not found</div>
  }

  return (
    <main>
      <MachineView data={data} />
    </main>
  )
}
