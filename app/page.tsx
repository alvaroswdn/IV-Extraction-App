'use client'

import Card from '@/components/Card'
import { BoxIcon, DatabaseIcon, DollarSignIcon, DropletIcon, SearchIcon } from 'lucide-react'

export default function Home() {
  // const [timeframe, setTimeframe] = useState<Timeframe>('day')

  // const data = {
  //   day: 40,
  //   week: 60,
  //   month: 80,
  //   year: 100,
  // }

  return (
    <main className="flex flex-col gap-8 p-4">
      <section id="hero">
        <h1 className="text-4xl font-semibold">Hi Sofia!</h1>
        <p className="text-lg">Siloam Medical Center</p>
        <label
          className="bg-quaternary relative mt-5 flex w-full items-center justify-start rounded-full px-3 py-2"
          htmlFor="search"
        >
          <SearchIcon />
          <input
            id="search"
            type="text"
            placeholder="Search..."
            className="absolute top-0 left-0 h-full w-full rounded-full pl-12"
          />
        </label>
      </section>

      <section id="quick-insights">
        <h1 className="mb-4 text-2xl font-bold">Quick Insights</h1>
        <div className="grid grid-cols-2 gap-4">
          <Card type="primary" label="Recycled IV Fluids" icon={DropletIcon}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-full rounded-full bg-neutral-400">
                <div className="h-2 w-[75%] rounded-full bg-[#e1f5f8]"></div>
              </div>
              <span className="text-sm">75%</span>
            </div>
          </Card>
          <Card type="primary" label="Bag Count" icon={BoxIcon}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-full rounded-full bg-neutral-400">
                <div className="h-2 w-[46.7%] rounded-full bg-[#e1f5f8]"></div>
              </div>
              <span className="text-sm">14/30</span>
            </div>
          </Card>
          <Card type="primary" label="Reports" icon={DatabaseIcon} />
          <Card type="primary" label="Cost per month" icon={DollarSignIcon} />
        </div>
      </section>

      {/* <section id="info-cards" className="grid grid-cols-2 gap-4">
        <Card type="secondary" label="Drippy IV" icon={DropletIcon}>
          11,234 L
        </Card>
        <Card type="primary" label="Weight" icon={WeightIcon}>
          10 kg
        </Card>
      </section>

      <section id="info-charts" className="grid gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">CO2 risk statistic</h1>
          <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
        </div>

        <ProgressRing color="text-tertiary" value={data[timeframe]}>
          <div className="grid items-center gap-1 text-center">
            <h2 className="font-light">IVs sucked this {timeframe}</h2>
            <span className="text-2xl">{data[timeframe]}%</span>
          </div>
        </ProgressRing>
      </section> */}
    </main>
  )
}
