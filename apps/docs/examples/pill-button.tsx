"use client";

import { Pill, PillButton } from "@repo/pill";
import { XIcon } from "lucide-react";

const Example = () => (
  <Pill>
    #loveui
    <PillButton size="icon" variant="ghost">
      <XIcon size={12} />
    </PillButton>
  </Pill>
);

export default Example;
