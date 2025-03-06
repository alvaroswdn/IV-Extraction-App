'use client'

import MachineCardGrid from '@/components/MachineCardGrid'
import MachineCardList from '@/components/MachineCardList'
import { useLoader } from '@/utils/loader'
import { useMachines } from '@/utils/supabase/hooks'
import { MachineData } from '@/utils/supabase/types'
import { Grid2X2Icon, ListIcon, LucideIcon, SearchIcon } from 'lucide-react'
import { createElement, useState } from 'react'

export default function Machines() {
  const machines = useMachines()
  const [loaderElement, contentClass] = useLoader(machines.length <= 0)
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
          onClick={() => setView(viewMeta[view].toggle.content)}
          className="bg-quaternary flex aspect-square h-full cursor-pointer items-center justify-center rounded-full"
        >
          {createElement(viewMeta[view].toggle.icon)}
        </button>
      </div>
      {loaderElement}
      <div className={`grid gap-3 ${viewMeta[view].style} ${contentClass}`}>
        {machines
          .sort((a, b) => a.id - b.id)
          .map((machine) =>
            createElement(viewMeta[view].itemNode, { key: machine.id, data: machine }),
          )}
      </div>
    </main>
  )
}

type Views = 'grid' | 'list'

type ViewMeta = {
  toggle: {
    icon: LucideIcon
    content: Views
  }
  itemNode: React.FC<{ data: MachineData }>
  style?: string
}

const viewMeta: Record<Views, ViewMeta> = {
  list: {
    toggle: {
      icon: Grid2X2Icon,
      content: 'grid',
    },
    itemNode: MachineCardList,
  },
  grid: {
    toggle: {
      icon: ListIcon,
      content: 'list',
    },
    itemNode: MachineCardGrid,
    style: 'grid-cols-3',
  },
}
