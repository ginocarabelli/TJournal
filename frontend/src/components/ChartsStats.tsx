"use client"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  pnl: {
    label: "PnL",
    color: "#030303",
  },
  fecha: {
    label: "Date",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartStats({ chartData, period }) {

  return (
    <div className="flex gap-3 w-full h-full" id="statsCuenta">
        <Card className="w-full bg-neutral-950 backdrop-blur-xl border-none">
          <CardHeader>
            <CardTitle className="text-white">Monthly PnL</CardTitle>
            <CardDescription>{period}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <YAxis
                  dataKey="pnl"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <XAxis
                  dataKey="fecha"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval="preserveStartEnd"
                  tickFormatter={(value) => value.slice(0, 3)} // Mostrar el mes y el día (puedes ajustarlo)
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="pnl" radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl < 0 ? "#ef4444" : "#22c55e"} />
                  ))}
                </Bar>

              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}
