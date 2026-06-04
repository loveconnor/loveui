"use client";

import * as React from 'react';
import {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPopup,
  SheetPortal,
  SheetTitle,
  SheetTrigger as RegistrySheetTrigger,
} from '@/registry/default/ui/sheet';

function SheetTrigger({
  asChild,
  children,
  render,
  ...props
}: React.ComponentProps<typeof RegistrySheetTrigger> & {
  asChild?: boolean;
}) {
  const child = asChild
    ? (React.Children.only(children) as React.ReactElement<
        Record<string, unknown>
      >)
    : render;

  return (
    <RegistrySheetTrigger render={child} {...props}>
      {asChild ? undefined : children}
    </RegistrySheetTrigger>
  );
}

export {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPopup,
  SheetPopup as SheetContent,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
