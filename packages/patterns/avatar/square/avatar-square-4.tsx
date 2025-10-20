import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar with Online Indicator";

const Example = () => (
  <div className="relative w-fit">
    <Avatar className="rounded-lg">
      <AvatarImage
        alt="@loveconnor"
        src="https://github.com/loveconnor.png"
      />
      <AvatarFallback className="rounded-lg">CL</AvatarFallback>
    </Avatar>
    <span className="-bottom-1 -right-1 absolute size-3 rounded-full border-2 border-background bg-green-500" />
  </div>
);

export default Example;
