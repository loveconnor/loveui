import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar with Count Indicator";

const Example = () => (
  <div className="relative w-fit">
    <Avatar className="rounded-lg">
      <AvatarImage
        alt="@loveconnor"
        src="https://github.com/loveconnor.png"
      />
      <AvatarFallback className="rounded-lg">CL</AvatarFallback>
    </Avatar>
    <span className="-right-2 -top-2 absolute flex size-5 items-center justify-center rounded-full border-2 border-background bg-red-500 font-medium text-white text-xs">
      3
    </span>
  </div>
);

export default Example;
