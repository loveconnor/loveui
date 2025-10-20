"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Home, FileText, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";

const Example = () => {
  const [current, setCurrent] = useState("dashboard");

  const pageTitle = {
    dashboard: "Dashboard",
    documents: "Documents",
    settings: "Settings",
  }[current];

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <aside className="w-64 shrink-0 border-r">
        <nav className="space-y-1 p-2">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Navigation
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
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b px-6 py-4">
          <h1 className="font-semibold text-xl">{pageTitle}</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            <div className="h-32 rounded-lg bg-secondary" />
            <div className="h-32 rounded-lg bg-secondary" />
            <div className="h-32 rounded-lg bg-secondary" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Example;
