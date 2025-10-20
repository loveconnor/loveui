"use client";

import { Label } from "@repo/shadcn-ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/shadcn-ui/components/ui/radio-group";
import { useState } from "react";

const Example = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <RadioGroup onValueChange={setSelected} value={selected}>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="option1" value="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="option2" value="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="option3" value="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem disabled id="disabled" value="disabled" />
        <Label className="text-muted-foreground" htmlFor="disabled">
          Disabled option
        </Label>
      </div>
    </RadioGroup>
  );
};

export default Example;

