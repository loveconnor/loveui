"use client";

import { Card, CardContent } from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";

const data = [
  {
    name: "Components",
    stat: "48",
    goalsAchieved: 3,
    status: "observe",
    href: "#",
  },
  {
    name: "Blocks",
    stat: "119",
    goalsAchieved: 5,
    status: "within",
    href: "#",
  },
  {
    name: "Docs",
    stat: "54",
    goalsAchieved: 1,
    status: "critical",
    href: "#",
  },
];

export default function Stats06() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="p-6 relative shadow-2xs">
            <CardContent className="p-0">
              <dt className="truncate text-sm font-medium text-muted-foreground">{item.name}</dt>
              <dd className="tabular-nums text-3xl font-semibold text-foreground">{item.stat}</dd>
              <div className="group relative mt-6 flex items-center space-x-4 rounded-md bg-muted/60 p-2 hover:bg-muted">
                <div className="flex min-w-0 w-full items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center space-x-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded",
                        item.status === "within"
                          ? "bg-emerald-500 text-white"
                          : item.status === "observe"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white",
                      )}
                    >
                      {item.status === "within" ? (
                        <Check className="size-4 shrink-0" aria-hidden={true} />
                      ) : item.status === "observe" ? (
                        <Eye className="size-4 shrink-0" aria-hidden={true} />
                      ) : (
                        <AlertTriangle className="size-4 shrink-0" aria-hidden={true} />
                      )}
                    </span>
                    <dd className="min-w-0">
                      <p className="text-pretty text-sm text-muted-foreground">
                        <Link href={item.href} className="focus:outline-none">
                          {/* Extend link to entire card */}
                          <span className="absolute inset-0" aria-hidden={true} />
                          {item.goalsAchieved}/5 goals
                        </Link>
                      </p>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          item.status === "within"
                            ? "text-emerald-800 dark:text-emerald-500"
                            : item.status === "observe"
                              ? "text-yellow-800 dark:text-yellow-500"
                              : "text-red-800 dark:text-red-500",
                        )}
                      >
                        {item.status}
                      </p>
                    </dd>
                  </div>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground"
                    aria-hidden={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
