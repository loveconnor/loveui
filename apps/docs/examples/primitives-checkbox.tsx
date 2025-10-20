"use client";

import { Checkbox } from "@repo/shadcn-ui/components/ui/checkbox";
import { Label } from "@repo/shadcn-ui/components/ui/label";
import { useState } from "react";

const Example = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked1}
          id="terms"
          onCheckedChange={(checked) => setChecked1(checked === true)}
        />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked2}
          id="newsletter"
          onCheckedChange={(checked) => setChecked2(checked === true)}
        />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox disabled id="disabled" />
        <Label className="text-muted-foreground" htmlFor="disabled">
          Disabled checkbox
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked disabled id="disabled-checked" />
        <Label className="text-muted-foreground" htmlFor="disabled-checked">
          Disabled and checked
        </Label>
      </div>
    </div>
  );
};

export default Example;
