import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const title = "Avatar with Placeholder Initials";

const Example = () => (
  <Avatar>
    <AvatarFallback>CL</AvatarFallback>
  </Avatar>
);

export default Example;
