import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const title = "User Profile Popover";

const Example = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost">@loveconnor</Button>
    </PopoverTrigger>
    <PopoverContent>
      <div className="space-y-2">
        <h4 className="font-semibold">Connor Love</h4>
        <p className="text-muted-foreground text-sm">@loveconnor</p>
        <p className="text-xs">Software Developer</p>
      </div>
    </PopoverContent>
  </Popover>
);

export default Example;
