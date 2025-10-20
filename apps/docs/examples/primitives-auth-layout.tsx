"use client";

import { Input } from "@repo/shadcn-ui/components/ui/input";
import { Button } from "@repo/shadcn-ui/components/ui/button";
import { Label } from "@repo/shadcn-ui/components/ui/label";

const Example = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-8 dark:from-blue-950 dark:to-indigo-950">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-500">
          <span className="font-bold text-2xl text-white">L</span>
        </div>
        <h2 className="font-bold text-3xl">Welcome back</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      <div className="space-y-6 rounded-lg bg-background p-8 shadow-lg">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" placeholder="connor@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a className="text-blue-600 hover:underline" href="/signup">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Example;
