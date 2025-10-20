import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const title = "User Profile View Sheet";

const Example = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">View Profile</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>User Profile</SheetTitle>
        <SheetDescription>View user information and activity</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-16">
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xl">
              JD
            </div>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">Connor Love</span>
            <span className="text-muted-foreground text-sm">@loveconnor</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span>connor@example.com</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <span>Columbus, OH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Joined</span>
            <span>August 2025</span>
          </div>
        </div>
        <Button className="w-full">Send Message</Button>
      </div>
    </SheetContent>
  </Sheet>
);

export default Example;
