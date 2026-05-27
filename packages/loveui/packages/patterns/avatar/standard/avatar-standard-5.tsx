import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar with Offline Indicator";

const Example = () => (
  <div className="relative w-fit">
    <Avatar>
      <AvatarImage
        alt="@loveconnor"
        src="https://github.com/loveconnor.png"
      />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
    <span className="-bottom-1 -right-1 absolute size-3 rounded-full border-2 border-background bg-gray-400" />
  </div>
);

export default Example;
