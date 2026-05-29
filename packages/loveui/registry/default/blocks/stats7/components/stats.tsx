"use client";

import { Card, CardContent } from "@/registry/default/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

const data = [
  {
    name: "Blocks",
    capacity: 20,
    current: 1,
    allowed: 5,
    fill: "var(--chart-1)",
  },
  {
    name: "Components",
    capacity: 10,
    current: 2,
    allowed: 20,
    fill: "var(--chart-2)",
  },
  {
    name: "Examples",
    capacity: 30,
    current: 15,
    allowed: 50,
    fill: "var(--chart-3)",
  },
  {
    name: "Docs pages",
    capacity: 50,
    current: 25,
    allowed: 100,
    fill: "var(--chart-4)",
  },
];

const chartConfig = {
  capacity: {
    label: "Capacity",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function Stats07() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <div className="w-full max-w-6xl">
        <h2 className="text-balance text-xl font-medium text-foreground">LoveUI workspace overview</h2>
        <p className="text-pretty mt-1 text-sm leading-6 text-muted-foreground">
          You are currently using the <span className="font-medium text-foreground">LoveUI registry</span>
          .{" "}
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-primary hover:underline hover:underline-offset-4"
          >
            Browse blocks
            <ExternalLink className="size-4" aria-hidden={true} />
          </Link>
        </p>
        <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {data.map((item) => (
            <Card key={item.name} className="p-4 shadow-2xs">
              <CardContent className="flex min-w-0 items-center gap-4 p-0">
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
                        dataKey="capacity"
                        background
                        cornerRadius={10}
                        fill="var(--primary)"
                        angleAxisId={0}
                      />
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="text-base font-medium text-foreground">{item.capacity}%</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-foreground">{item.name}</dt>
                  <dd className="text-sm text-muted-foreground">
                    {item.current} of {item.allowed} used
                  </dd>
                </div>
              </CardContent>
            </Card>
          ))}
        </dl>
      </div>
    </div>
  );
}
