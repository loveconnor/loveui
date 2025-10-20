"use client";

import { Separator } from "@repo/shadcn-ui/components/ui/separator";

const Example = () => (
  <div className="grid gap-4">
    <div>Content above</div>
    <Separator />
    <div>Content below</div>
    <Separator className="opacity-50" />
    <div>Soft divider variant</div>
  </div>
);

export default Example;

