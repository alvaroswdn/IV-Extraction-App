import ProgressRing from '@/components/ProgressRing'

export function useLoader(loading: boolean): [React.ReactNode, string] {
  if (!loading) return [null, '']
  return [
    <div key="loader" className="visible m-auto mt-24 flex max-w-96 scale-50 animate-spin">
      <ProgressRing color="text-secondary" value={8} />
    </div>,
    'invisible',
  ]
}
