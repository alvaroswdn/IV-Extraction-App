import { useEffect, useState } from 'react'
import { createClient } from './client'
import { MachineData } from './types'

export function useMachines() {
  const supabase = createClient()
  const [machines, setMachines] = useState<MachineData[]>([])

  useEffect(() => {
    supabase
      .from('machines')
      .select('*')
      .then(({ data }) => setMachines(data || []))

    const channel = supabase
      .channel('realtime-machines')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          setMachines((machines) => [...machines, payload.new as MachineData])
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'machines',
        },
        (payload) => {
          setMachines((machines) => [
            ...machines.filter((machine) => machine.id !== payload.old.id),
            payload.new as MachineData,
          ])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setMachines])

  return machines
}
