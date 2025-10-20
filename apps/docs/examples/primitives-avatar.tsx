"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/shadcn-ui/components/ui/avatar";

const Example = () => (
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarImage alt="User avatar" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>XY</AvatarFallback>
    </Avatar>
  </div>
);

export default Example;

