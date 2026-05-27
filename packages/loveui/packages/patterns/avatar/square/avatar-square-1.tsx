import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar";

const Example = () => (
  <Avatar className="rounded-lg">
    <AvatarImage
      alt="@loveconnor"
      src="https://github.com/loveconnor.png"
    />
    <AvatarFallback className="rounded-lg">CL</AvatarFallback>
  </Avatar>
);

export default Example;
