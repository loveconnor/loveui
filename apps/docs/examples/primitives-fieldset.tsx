"use client";

import { Input } from "@repo/shadcn-ui/components/ui/input";
import { Label } from "@repo/shadcn-ui/components/ui/label";
import { Checkbox } from "@repo/shadcn-ui/components/ui/checkbox";
import { useState } from "react";

const Example = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="grid gap-6">
      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="text-sm font-medium">Personal Information</legend>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Connor" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Love" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="connor@example.com" type="email" />
          </div>
        </div>
      </fieldset>
      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="text-sm font-medium">Preferences</legend>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            id="promo"
            onCheckedChange={(state) => setChecked(state === true)}
          />
          <Label htmlFor="promo">Send me promotional emails</Label>
        </div>
      </fieldset>
      <fieldset className="space-y-4 rounded-lg border p-4" disabled>
        <legend className="text-sm font-medium text-muted-foreground">
          Disabled Fieldset
        </legend>
        <div className="grid gap-2">
          <Label className="text-muted-foreground" htmlFor="disabled-input">
            Input field
          </Label>
          <Input disabled id="disabled-input" placeholder="Cannot edit" />
        </div>
      </fieldset>
    </div>
  );
};

export default Example;
