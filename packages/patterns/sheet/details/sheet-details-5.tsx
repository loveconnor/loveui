import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const title = "Notification List Sheet";

const notifications = [
  {
    id: 1,
    type: "comment",
    author: "Connor Love",
    username: "@loveconnor",
    initials: "CL",
    message: "commented on your post",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "like",
    author: "Thomas Raklovits",
    username: "@thomasraklovits",
    initials: "TR",
    message: "liked your article",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "follow",
    author: "Charlie Cambell",
    username: "@charliecambell",
    initials: "CC",
    message: "started following you",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    type: "mention",
    author: "Tyler PennyPacker",
    username: "@tylerpennypacker",
    initials: "TPP",
    message: "mentioned you in a comment",
    time: "2 days ago",
    unread: false,
  },
];

const Example = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">
        Notifications
        <Badge className="ml-2">2</Badge>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          You have {notifications.filter((n) => n.unread).length} unread
          notifications
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-3 p-4">
        {notifications.map((notification) => (
          <div
            className={`flex gap-3 rounded-md border p-3 ${
              notification.unread ? "bg-muted/50" : ""
            }`}
            key={notification.id}
          >
            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
              {notification.initials}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {notification.author}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {notification.message}
                  </span>
                </div>
                {notification.unread && (
                  <div className="mt-1 size-2 flex-shrink-0 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-muted-foreground text-xs">
                {notification.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <Button className="w-full" variant="outline">
          Mark All as Read
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

export default Example;
