"use client";

import { Card, CardContent } from "@/registry/default/ui/card";
import { Progress } from "@/registry/default/ui/progress";

const data = [
  {
    name: "Registry requests",
    stat: "996",
    limit: "10,000",
    percentage: 9.96,
  },
  {
    name: "Preview credits",
    stat: "672",
    limit: "1,000",
    percentage: 67.2,
  },
  {
    name: "Source files",
    stat: "1.85",
    limit: "10GB",
    percentage: 18.5,
  },
  {
    name: "CLI installs",
    stat: "4,328",
    limit: "5,000",
    percentage: 86.56,
  },
];

export default function Stats09() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.map((item) => (
          <Card key={item.name} className="py-4 shadow-2xs">
            <CardContent>
              <dt className="truncate text-sm text-muted-foreground">{item.name}</dt>
              <dd className="tabular-nums text-2xl font-semibold text-foreground">{item.stat}</dd>
              <Progress value={item.percentage} className="mt-6 h-2" />
              <dd className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span className="whitespace-nowrap text-primary">
                  {item.percentage}&#37;
                </span>
                <span className="whitespace-nowrap text-muted-foreground">
                  {item.stat} of {item.limit}
                </span>
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
