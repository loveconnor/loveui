"use client";

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger as RegistryDropdownMenuTrigger,
} from '@/registry/default/ui/dropdown-menu';
import { cn } from '@/lib/utils';

function DropdownMenuTrigger({
  asChild,
  children,
  render,
  nativeButton,
  ...props
}: React.ComponentProps<typeof RegistryDropdownMenuTrigger> & {
  asChild?: boolean;
}) {
  const child = asChild
    ? (React.Children.only(children) as React.ReactElement<
        Record<string, unknown>
      >)
    : React.isValidElement(render)
      ? render
      : undefined;
  const inferredNativeButton =
    nativeButton ?? (child ? isNativeButtonTrigger(child) : undefined);

  return (
    <RegistryDropdownMenuTrigger
      nativeButton={inferredNativeButton}
      render={child}
      {...props}
    >
      {asChild ? undefined : children}
    </RegistryDropdownMenuTrigger>
  );
}

function isNativeButtonTrigger(element: React.ReactElement) {
  const typeName = getElementTypeName(element.type);

  if (typeof element.type === 'string') {
    return element.type === 'button';
  }

  if (typeName === 'Avatar') {
    return false;
  }

  return true;
}

function getElementTypeName(type: React.ElementType | unknown): string {
  if (typeof type === 'string') {
    return type;
  }

  if (typeof type === 'function') {
    const component = type as React.ComponentType & {
      displayName?: string;
      name?: string;
    };

    return component.displayName ?? component.name ?? '';
  }

  if (type && typeof type === 'object') {
    const component = type as {
      displayName?: string;
      render?: React.ElementType;
      type?: React.ElementType;
    };

    return (
      component.displayName ||
      getElementTypeName(component.render) ||
      getElementTypeName(component.type)
    );
  }

  return '';
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<'div'> & {
  inset?: boolean;
}) {
  return (
    <div
      data-inset={inset}
      data-slot="dropdown-menu-label"
      className={cn(
        'px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
