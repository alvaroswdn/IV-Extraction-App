'use client'

import MachineCardGrid from '@/components/MachineCardGrid'
import MachineCardList from '@/components/MachineCardList'
import { Grid2X2Icon, ListIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { machines } from '.'

type Views = 'grid' | 'list'

const viewIcon: Record<Views, React.ReactNode> = {
  list: <Grid2X2Icon />,
  grid: <ListIcon />,
}

export default function Machines() {
  const [view, setView] = useState<Views>('list')

  return (
    <main className="grid gap-4 p-4">
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
          {machines.map((machine) => (
            <MachineCardList key={machine.name} data={machine} />
          ))}
        </div>
      )}
      {view === 'grid' && (
        <div className="grid grid-cols-3 gap-3">
          {machines.map((machine) => (
            <MachineCardGrid key={machine.name} data={machine} />
          ))}
        </div>
      )}
    </main>
  )
}
