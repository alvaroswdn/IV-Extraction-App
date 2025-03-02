'use client'

import MachineCardGrid from '@/components/MachineCardGrid'
import MachineCardList from '@/components/MachineCardList'
import { createClient } from '@/utils/supabase/client'
import { MachineData } from '@/utils/supabase/types'
import { Grid2X2Icon, ListIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Views = 'grid' | 'list'

const viewIcon: Record<Views, React.ReactNode> = {
  list: <Grid2X2Icon />,
  grid: <ListIcon />,
}

export default function MachinesView({ serverMachines }: { serverMachines: MachineData[] }) {
  const supabase = createClient()
  const [machines, setMachines] = useState<MachineData[]>(serverMachines)
  const [view, setView] = useState<Views>('list')

  useEffect(() => {
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
          setMachines([...machines, payload.new as MachineData])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, machines, setMachines])

  return (
    <>
      <div className="flex items-center gap-2">
        <label
          className="bg-quaternary relative flex w-full items-center justify-start rounded-full px-3 py-2"
          htmlFor="search"
        >
          <SearchIcon />
          <input
            id="search"
            type="text"
            placeholder="Search..."
            className="border-quaternary focus:border-secondary absolute top-0 left-0 h-full w-full rounded-full border-2 pl-12 transition-colors focus:outline-none"
          />
        </label>
        <button
          onClick={() => setView(view === 'list' ? 'grid' : 'list')}
          className="bg-quaternary flex aspect-square h-full cursor-pointer items-center justify-center rounded-full"
        >
          {viewIcon[view]}
        </button>
      </div>
      {view === 'list' && (
        <div className="grid gap-3">
          {machines &&
            machines.map((machine) => <MachineCardList key={machine.id} data={machine} />)}
        </div>
      )}
      {view === 'grid' && (
        <div className="grid grid-cols-3 gap-3">
          {machines &&
            machines.map((machine) => <MachineCardGrid key={machine.id} data={machine} />)}
        </div>
      )}
    </>
  )
}
