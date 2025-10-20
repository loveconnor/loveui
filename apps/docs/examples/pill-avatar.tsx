"use client";

import { Pill, PillAvatar } from "@repo/pill";

const Example = () => (
  <Pill>
    <PillAvatar
      fallback="CL"
      src="https://pbs.twimg.com/profile_images/1748718473595789312/PbqJh9hk_400x400.jpg"
    />
    @loveconnor
  </Pill>
);

export default Example;
