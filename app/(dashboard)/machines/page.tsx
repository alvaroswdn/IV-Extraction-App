'use client'

import { SearchInput } from '@/components/search-input'
import { View, VIEW_META } from '@/lib/views'
import { useLoader } from '@/utils/loader'
import { useMachines } from '@/utils/supabase/hooks'
import { createElement, useState } from 'react'

export default function Machines() {
  const machines = useMachines()
  const [loaderElement, contentClass] = useLoader(machines.length <= 0)
  const [view, setView] = useState<View>('list')

  return (
    <main className="grid gap-4 p-4">
      <div className="flex items-center gap-2">
        <SearchInput />
        <button
          onClick={() => setView(VIEW_META[view].toggle.content)}
          className="bg-accent flex aspect-square h-full cursor-pointer items-center justify-center rounded-full"
        >
          {createElement(VIEW_META[view].toggle.icon)}
        </button>
      </div>
      {loaderElement}
      <div className={`grid gap-3 ${VIEW_META[view].style} ${contentClass}`}>
        {machines
          .sort((a, b) => a.id - b.id)
          .map((machine) =>
            createElement(VIEW_META[view].itemNode, { key: machine.id, data: machine }),
          )}
      </div>
    </main>
  )
}
