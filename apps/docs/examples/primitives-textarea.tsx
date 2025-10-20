"use client";

import { Textarea } from "@repo/shadcn-ui/components/ui/textarea";
import { useState } from "react";

const Example = () => {
  const [value, setValue] = useState("");

  return (
    <div className="grid gap-4">
      <Textarea placeholder="Enter your message..." rows={4} />
      <Textarea
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled textarea"
        rows={3}
        value={value}
      />
      <Textarea disabled placeholder="Disabled textarea" rows={3} />
      <Textarea
        className="resize-none"
        placeholder="Non-resizable textarea"
        rows={3}
      />
    </div>
  );
};

export default Example;

