"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Separator } from "@repo/shadcn-ui/components/ui/separator";
import { Home, FileText, Settings, HelpCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";

const Example = () => {
  const [current, setCurrent] = useState("dashboard");

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <aside className="flex w-64 flex-col border-r">
        <div className="flex items-center gap-2 p-4">
          <div className="size-8 rounded bg-blue-500" />
          <span className="font-semibold">My App</span>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Main
          </div>
          <Button
            className={cn(
              "w-full justify-start gap-2",
              current === "dashboard" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("dashboard")}
            variant="ghost"
          >
            <Home className="size-4" />
            Dashboard
          </Button>
          <Button
            className={cn(
              "w-full justify-start gap-2",
              current === "documents" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("documents")}
            variant="ghost"
          >
            <FileText className="size-4" />
            Documents
          </Button>
          <Separator className="my-2" />
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Account
          </div>
          <Button
            className={cn(
              "w-full justify-start gap-2",
              current === "settings" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("settings")}
            variant="ghost"
          >
            <Settings className="size-4" />
            Settings
          </Button>
          <Button
            className={cn(
              "w-full justify-start gap-2",
              current === "help" && "bg-accent text-accent-foreground"
            )}
            onClick={() => setCurrent("help")}
            variant="ghost"
          >
            <HelpCircle className="size-4" />
            Help
          </Button>
        </nav>
        <div className="border-t p-4">
          <div className="text-xs text-muted-foreground">v1.0.0</div>
        </div>
      </aside>
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground">
          Click sidebar items to see the animated indicator.
        </p>
      </div>
    </div>
  );
};

export default Example;
