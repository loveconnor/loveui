"use client";

import { Card, CardContent, CardFooter } from "@/registry/default/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

const data = [
  {
    name: "Auth",
    progress: 25,
    budget: "12",
    current: "3",
    href: "#",
    fill: "var(--chart-1)",
  },
  {
    name: "Marketing",
    progress: 55,
    budget: "40",
    current: "22",
    href: "#",
    fill: "var(--chart-2)",
  },
  {
    name: "Application",
    progress: 85,
    budget: "28",
    current: "24",
    href: "#",
    fill: "var(--chart-3)",
  },
  {
    name: "Docs",
    progress: 70,
    budget: "60",
    current: "42",
    href: "#",
    fill: "var(--chart-4)",
  },
];

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function Stats08() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.map((item) => (
          <Card key={item.name} className="p-0 gap-0 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex size-24 shrink-0 items-center justify-center">
                  <ChartContainer config={chartConfig} className="size-24">
                    <RadialBarChart
                      data={[item]}
                      innerRadius={32}
                      outerRadius={42}
                      barSize={6}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                        axisLine={false}
                      />
                      <RadialBar
                        dataKey="progress"
                        background
                        cornerRadius={10}
                        fill={item.fill}
                        angleAxisId={0}
                      />
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="text-base font-medium text-foreground">{item.progress}%</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <dd className="text-base font-medium text-foreground">
                    {item.current} / {item.budget}
                  </dd>
                  <dt className="text-sm text-muted-foreground">{item.name} coverage</dt>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end border-t border-border p-0!">
              <a
                href={item.href}
                className="text-sm font-medium text-primary px-6 py-3 hover:text-primary/90"
              >
                View more &#8594;
              </a>
            </CardFooter>
          </Card>
        ))}
      </dl>
    </div>
  );
}
