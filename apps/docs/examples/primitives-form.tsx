"use client";

import { Input, Switch } from "loveui";
import { useState } from "react";

const Example = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="grid gap-4">
      <Input placeholder="Email" type="email" />
      <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3">
        <Switch checked={enabled} onChange={setEnabled} />
        <div>
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-sm text-muted-foreground">
            Toggle product updates and onboarding tips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Example;
