"use client";

import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipPopup,
  TooltipProvider as RegistryTooltipProvider,
  TooltipTrigger as RegistryTooltipTrigger,
} from '@/registry/default/ui/tooltip';

function TooltipProvider({
  delayDuration: _delayDuration,
  ...props
}: React.ComponentProps<typeof RegistryTooltipProvider> & {
  delayDuration?: number;
}) {
  return <RegistryTooltipProvider {...props} />;
}

function TooltipTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof RegistryTooltipTrigger> & {
  asChild?: boolean;
}) {
  return (
    <RegistryTooltipTrigger
      render={
        asChild
          ? (React.Children.only(children) as React.ReactElement<
              Record<string, unknown>
            >)
          : undefined
      }
      {...props}
    >
      {asChild ? undefined : children}
    </RegistryTooltipTrigger>
  );
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipPopup,
};
