"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";

const Example = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button>Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="default">Success</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
);

export default Example;
