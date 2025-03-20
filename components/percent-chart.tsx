'use client'

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
const chartData = [{ visitors: 200 }]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
} satisfies ChartConfig

export function PercentChart({ label, value }: { label: string; value: number }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 + (value / 100) * 360}
        innerRadius={110}
        outerRadius={140}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[116, 104]}
        />
        <RadialBar dataKey="visitors" background cornerRadius={10} className="fill-foreground" />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 8}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {value.toLocaleString()}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 28}
                      className="fill-muted-foreground text-lg font-semibold"
                    >
                      {label}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
