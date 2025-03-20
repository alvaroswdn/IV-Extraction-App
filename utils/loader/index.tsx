import { Loader2Icon } from 'lucide-react'

export function useLoader(loading: boolean): [React.ReactNode, string] {
  if (!loading) return [null, '']
  return [
    <div key="loader" className="visible m-auto mt-24 flex max-w-96 scale-50 animate-spin">
      <Loader2Icon className="text-foreground size-48" />
    </div>,
    '*:invisible',
  ]
}
