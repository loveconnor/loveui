"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const title = "Simple Profile Hover Card";

const Example = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <a className="font-medium text-sm underline" href="#">
        @loveconnor
      </a>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/loveconnor.png" />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm">Connor Love</h4>
          <p className="text-muted-foreground text-sm">
            Product designer and developer
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default Example;
