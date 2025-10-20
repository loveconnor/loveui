"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Home, FileText, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";

const Example = () => {
  const [current, setCurrent] = useState("home");

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <header className="border-b">
        <nav className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2 py-3">
            <div className="size-8 rounded bg-blue-500" />
            <span className="font-semibold">My App</span>
          </div>
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
                current === "documents" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setCurrent("documents")}
              variant="ghost"
            >
              <FileText className="size-5" />
              Documents
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
        </nav>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">Welcome</h1>
          <div className="h-32 rounded-lg bg-secondary" />
          <div className="h-32 rounded-lg bg-secondary" />
          <div className="h-32 rounded-lg bg-secondary" />
        </div>
      </main>
      <footer className="border-t px-6 py-4">
        <p className="text-center text-sm text-muted-foreground">
          © 2025 My App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Example;
