import { GridCard } from '@/components/machine/grid'
import { ListCard } from '@/components/machine/list'
import { MachineData } from '@/utils/supabase/types'
import { Grid2X2Icon, ListIcon, LucideIcon } from 'lucide-react'

export type View = 'grid' | 'list'

export type ViewMeta = {
  toggle: {
    icon: LucideIcon
    content: View
  }
  itemNode: React.FC<{ data: MachineData }>
  style?: string
}

export const VIEW_META: Record<View, ViewMeta> = {
  list: {
    toggle: {
      icon: Grid2X2Icon,
      content: 'grid',
    },
    itemNode: ListCard,
  },
  grid: {
    toggle: {
      icon: ListIcon,
      content: 'list',
    },
    itemNode: GridCard,
    style: 'grid-cols-3',
  },
}
