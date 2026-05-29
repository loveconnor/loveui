"use client";

import { Card, CardContent } from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";

const data = [
  {
    name: "Docs visitors",
    stat: "10,450",
    change: "-12.5%",
    changeType: "negative",
  },
  {
    name: "Block previews",
    stat: "56.1%",
    change: "+1.8%",
    changeType: "positive",
  },
  {
    name: "Copy duration",
    stat: "5.2min",
    change: "+19.7%",
    changeType: "positive",
  },
  {
    name: "Install success",
    stat: "3.2%",
    change: "-2.4%",
    changeType: "negative",
  },
];

export default function Stats03() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.map((item) => (
          <Card key={item.name} className="p-6 py-4 shadow-2xs">
            <CardContent className="p-0">
              <dt className="truncate text-sm font-medium text-muted-foreground">{item.name}</dt>
              <dd className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="tabular-nums text-3xl font-semibold text-foreground">
                  {item.stat}
                </span>
                <span
                  className={cn(
                    item.changeType === "positive"
                      ? "text-green-800 dark:text-green-400"
                      : "text-red-800 dark:text-red-400",
                    "text-sm font-medium",
                  )}
                >
                  {item.change}
                </span>
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
