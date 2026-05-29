"use client";

import { Card, CardContent } from "@/registry/default/ui/card";
import { ChartContainer } from "@/registry/default/ui/chart";
import { cn } from "@/lib/utils";
import { Area, AreaChart, XAxis } from "recharts";

const data = [
  {
    date: "Nov 24, 2023",
    "Blocks": 142.87,
    "Components": 65.32,
    "Docs": 83.25,
  },
  {
    date: "Nov 25, 2023",
    "Blocks": 151.43,
    "Components": 59.78,
    "Docs": 79.64,
  },
  {
    date: "Nov 26, 2023",
    "Blocks": 157.28,
    "Components": 64.21,
    "Docs": 76.19,
  },
  {
    date: "Nov 27, 2023",
    "Blocks": 162.94,
    "Components": 57.46,
    "Docs": 72.84,
  },
  {
    date: "Nov 28, 2023",
    "Blocks": 148.37,
    "Components": 49.82,
    "Docs": 81.56,
  },
  {
    date: "Nov 29, 2023",
    "Blocks": 139.56,
    "Components": 55.63,
    "Docs": 92.38,
  },
  {
    date: "Nov 30, 2023",
    "Blocks": 145.83,
    "Components": 61.27,
    "Docs": 88.75,
  },
  {
    date: "Dec 01, 2023",
    "Blocks": 138.29,
    "Components": 68.94,
    "Docs": 93.42,
  },
  {
    date: "Dec 02, 2023",
    "Blocks": 129.64,
    "Components": 74.56,
    "Docs": 97.18,
  },
  {
    date: "Dec 03, 2023",
    "Blocks": 119.82,
    "Components": 71.38,
    "Docs": 89.43,
  },
  {
    date: "Dec 04, 2023",
    "Blocks": 128.54,
    "Components": 63.95,
    "Docs": 92.76,
  },
  {
    date: "Dec 05, 2023",
    "Blocks": 137.21,
    "Components": 58.47,
    "Docs": 84.29,
  },
  {
    date: "Dec 06, 2023",
    "Blocks": 134.68,
    "Components": 69.12,
    "Docs": 79.38,
  },
  {
    date: "Dec 07, 2023",
    "Blocks": 152.73,
    "Components": 73.89,
    "Docs": 81.42,
  },
  {
    date: "Dec 08, 2023",
    "Blocks": 168.59,
    "Components": 78.54,
    "Docs": 75.68,
  },
];

const summary = [
  {
    name: "Blocks",
    tickerSymbol: "BLK",
    value: "168.59K",
    change: "+15.86",
    percentageChange: "+10.4%",
    changeType: "positive",
  },
  {
    name: "Components",
    tickerSymbol: "CMP",
    value: "78.54K",
    change: "+4.65",
    percentageChange: "+6.3%",
    changeType: "positive",
  },
  {
    name: "Docs",
    tickerSymbol: "DOC",
    value: "75.68K",
    change: "-5.74",
    percentageChange: "-7.1%",
    changeType: "negative",
  },
];

const sanitizeName = (name: string) => {
  return name
    .replace(/\\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "_")
    .toLowerCase();
};

export default function Stats10() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {summary.map((item) => {
          const sanitizedName = sanitizeName(item.name);
          const gradientId = `gradient-${sanitizedName}`;

          const color =
            item.changeType === "positive" ? "hsl(142.1 76.2% 36.3%)" : "hsl(0 72.2% 50.6%)";

          return (
            <Card key={item.name} className="p-0 shadow-2xs">
              <CardContent className="p-4 pb-0">
                <div>
                  <dt className="text-sm font-medium text-foreground">
                    {item.name}{" "}
                    <span className="font-normal text-muted-foreground">({item.tickerSymbol})</span>
                  </dt>
                  <div className="flex items-baseline justify-between">
                    <dd
                      className={cn(
                        item.changeType === "positive"
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500",
                        "text-lg font-semibold",
                      )}
                    >
                      {item.value}
                    </dd>
                    <dd className="flex items-center space-x-1 text-sm">
                      <span className="font-medium text-foreground">{item.change}</span>
                      <span
                        className={cn(
                          item.changeType === "positive"
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500",
                        )}
                      >
                        ({item.percentageChange})
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="mt-2 h-16 overflow-hidden">
                  <ChartContainer
                    className="w-full h-full"
                    config={{
                      [item.name]: {
                        label: item.name,
                        color: color,
                      },
                    }}
                  >
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide={true} />
                      <Area
                        dataKey={item.name}
                        stroke={color}
                        fill={`url(#${gradientId})`}
                        fillOpacity={0.4}
                        strokeWidth={1.5}
                        type="monotone"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </dl>
    </div>
  );
}
