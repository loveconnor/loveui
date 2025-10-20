"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Plus, Download, Trash2 } from "lucide-react";

const Example = () => (
  <div className="grid gap-6">
    <div className="grid gap-3">
      <p className="text-sm font-medium">Sizes</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
    <div className="grid gap-3">
      <p className="text-sm font-medium">With icons</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button>
          <Plus className="mr-2 size-4" />
          Add item
        </Button>
        <Button variant="secondary">
          <Download className="mr-2 size-4" />
          Download
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 size-4" />
          Delete
        </Button>
      </div>
    </div>
    <div className="grid gap-3">
      <p className="text-sm font-medium">States</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button>Active</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  </div>
);

export default Example;

