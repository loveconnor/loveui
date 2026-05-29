"use client";

import { Badge } from "@/registry/default/ui/badge";
import { Card, CardContent } from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const data = [
  {
    name: "Daily installs",
    stat: "3,450",
    change: "+12.1%",
    changeType: "positive",
  },
  {
    name: "Weekly previews",
    stat: "1,342",
    change: "-9.8%",
    changeType: "negative",
  },
  {
    name: "Time to copy",
    stat: "5.2min",
    change: "+7.7%",
    changeType: "positive",
  },
];

export default function Stats04() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="p-6 py-4 w-full shadow-2xs">
            <CardContent className="p-0">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <dt className="min-w-0 truncate text-sm font-medium text-muted-foreground">{item.name}</dt>
                <Badge
                  variant="outline"
                  className={cn(
                    "inline-flex shrink-0 items-center px-1.5 ps-2.5 py-0.5 text-xs font-medium",
                    item.changeType === "positive"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                  )}
                >
                  {item.changeType === "positive" ? (
                    <TrendingUp className="mr-0.5 -ml-1 h-5 w-5 shrink-0 self-center text-green-500" />
                  ) : (
                    <TrendingDown className="mr-0.5 -ml-1 h-5 w-5 shrink-0 self-center text-red-500" />
                  )}
                  <span className="sr-only">
                    {" "}
                    {item.changeType === "positive" ? "Increased" : "Decreased"} by{" "}
                  </span>
                  {item.change}
                </Badge>
              </div>
              <dd className="tabular-nums text-3xl font-semibold text-foreground mt-2">
                {item.stat}
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
