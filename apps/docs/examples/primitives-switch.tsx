"use client";

import { Label } from "@repo/shadcn-ui/components/ui/label";
import { Switch } from "@repo/shadcn-ui/components/ui/switch";
import { useState } from "react";

const Example = () => {
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(true);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive push notifications
          </p>
        </div>
        <Switch
          checked={enabled1}
          id="notifications"
          onCheckedChange={(state) => setEnabled1(state === true)}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
        <div className="space-y-0.5">
          <Label htmlFor="email-updates">Email updates</Label>
          <p className="text-sm text-muted-foreground">
            Get weekly email summaries
          </p>
        </div>
        <Switch
          checked={enabled2}
          id="email-updates"
          onCheckedChange={(state) => setEnabled2(state === true)}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
        <div className="space-y-0.5">
          <Label className="text-muted-foreground" htmlFor="disabled">
            Disabled setting
          </Label>
          <p className="text-sm text-muted-foreground">This setting is locked</p>
        </div>
        <Switch disabled id="disabled" />
      </div>
    </div>
  );
};

export default Example;
