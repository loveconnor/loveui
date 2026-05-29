"use client";

import { Card, CardContent, CardFooter } from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";

const data = [
  {
    name: "Monthly block installs",
    value: "34.1K",
    change: "+6.1%",
    changeType: "positive",
    href: "#",
  },
  {
    name: "LoveUI builders",
    value: "500.1K",
    change: "+19.2%",
    changeType: "positive",
    href: "#",
  },
  {
    name: "Copy-to-ship rate",
    value: "11.3%",
    change: "-1.2%",
    changeType: "negative",
    href: "#",
  },
];

export default function Stats05() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="p-0 gap-0 shadow-2xs">
            <CardContent className="p-6">
              <dd className="flex min-w-0 items-start justify-between gap-3">
                <span className="min-w-0 truncate text-sm text-muted-foreground">{item.name}</span>
                <span
                  className={cn(
                    "shrink-0 text-sm font-medium",
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500",
                  )}
                >
                  {item.change}
                </span>
              </dd>
              <dd className="tabular-nums mt-1 text-3xl font-semibold text-foreground">
                {item.value}
              </dd>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border p-0!">
              <a
                href={item.href}
                className="px-6 py-3 text-sm font-medium text-primary hover:text-primary/90"
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
