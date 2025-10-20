"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Separator } from "@repo/shadcn-ui/components/ui/separator";
import { Home, Users, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";

const Example = () => {
  const [current, setCurrent] = useState("home");

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <nav className="flex items-center justify-between border-b px-4">
        <div className="flex items-center gap-1">
          <Button
            className={cn(
              "gap-2",
              current === "home" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("home")}
            variant="ghost"
          >
            <Home className="size-5" />
            Home
          </Button>
          <Button
            className={cn(
              "gap-2",
              current === "team" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("team")}
            variant="ghost"
          >
            <Users className="size-5" />
            Team
          </Button>
          <Button
            className={cn(
              "gap-2",
              current === "settings" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("settings")}
            variant="ghost"
          >
            <Settings className="size-5" />
            Settings
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Separator className="h-6" orientation="vertical" />
          <Button
            className={cn(
              current === "profile" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("profile")}
            variant="ghost"
          >
            Profile
          </Button>
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-center text-muted-foreground">
          Click the navigation items to see the animated indicator move.
        </p>
      </div>
    </div>
  );
};

export default Example;
