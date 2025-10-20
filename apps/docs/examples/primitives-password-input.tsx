"use client";

import { Input } from "@repo/shadcn-ui/components/ui/input";
import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Example = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="relative">
        <Input
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
        />
        <Button
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          size="sm"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      </div>
      <Input placeholder="Confirm password" type="password" />
      <Input disabled placeholder="Disabled password input" type="password" />
    </div>
  );
};

export default Example;

