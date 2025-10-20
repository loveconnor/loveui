"use client";

import { Input } from "@repo/shadcn-ui/components/ui/input";

const Example = () => (
  <div className="grid gap-4">
    <Input placeholder="Default input" />
    <Input type="email" placeholder="Email input" />
    <Input type="search" placeholder="Search..." />
    <Input type="number" placeholder="Number input" />
    <Input type="date" />
    <Input disabled placeholder="Disabled input" />
    <Input className="border-destructive" placeholder="Input with error" />
    <div className="relative">
      <Input className="pl-10" placeholder="Search..." type="search" />
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        🔍
      </span>
    </div>
  </div>
);

export default Example;

