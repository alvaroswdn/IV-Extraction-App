const selectorLocation: Record<Timeframe, string> = {
  day: 'translate-x-0',
  week: 'translate-x-8',
  month: 'translate-x-16',
  year: 'translate-x-24',
}

export type Timeframe = 'day' | 'week' | 'month' | 'year'

type Props = {
  timeframe: Timeframe
  setTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>
}

export default function TimeframeSelector({ timeframe, setTimeframe }: Props) {
  function handleTimeframeChange(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement
    setTimeframe(target.id as Timeframe)
  }

  function isActive(required: Timeframe) {
    return timeframe === required ? 'text-quinary' : 'cursor-pointer'
  }

  return (
    <div className="grid grid-flow-col grid-cols-4 rounded-full bg-neutral-200 text-sm *:z-10 *:aspect-square *:h-8 *:rounded-full">
      <div
        className={`bg-secondary absolute z-0 rounded-full transition-transform ${selectorLocation[timeframe]}`}
      />
      <button
        type="button"
        id="day"
        onClick={handleTimeframeChange}
        className={`transition-colors ${isActive('day')}`}
      >
        D
      </button>
      <button
        type="button"
        id="week"
        onClick={handleTimeframeChange}
        className={`transition-colors ${isActive('week')}`}
      >
        W
      </button>
      <button
        type="button"
        id="month"
        onClick={handleTimeframeChange}
        className={`transition-colors ${isActive('month')}`}
      >
        M
      </button>
      <button
        type="button"
        id="year"
        onClick={handleTimeframeChange}
        className={`transition-colors ${isActive('year')}`}
      >
        Y
      </button>
    </div>
  )
}
