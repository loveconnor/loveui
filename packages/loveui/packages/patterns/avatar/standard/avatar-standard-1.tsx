import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar";

const Example = () => (
  <Avatar>
    <AvatarImage
      alt="@loveconnor"
      src="https://github.com/loveconnor.png"
    />
    <AvatarFallback>CL</AvatarFallback>
  </Avatar>
);

export default Example;
