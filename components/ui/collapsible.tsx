"use client";

import * as React from 'react';
import {
  Collapsible,
  CollapsiblePanel,
  CollapsiblePanel as CollapsibleContent,
  CollapsibleTrigger as RegistryCollapsibleTrigger,
} from '@/registry/default/ui/collapsible';
import { cn } from '@/lib/utils';

function CollapsibleTrigger({
  asChild,
  children,
  className,
  ...props
}: React.ComponentProps<typeof RegistryCollapsibleTrigger> & { asChild?: boolean }) {
  const child = asChild
    ? (React.Children.only(children) as React.ReactElement<
        Record<string, unknown>
      >)
    : undefined;

  if (asChild && React.isValidElement(children)) {
    const triggerChild = child as React.ReactElement<{ className?: string }>;

    return (
      <RegistryCollapsibleTrigger
        nativeButton={isNativeButtonTrigger(triggerChild)}
        render={React.cloneElement(triggerChild, {
          className: cn('cursor-pointer', className, triggerChild.props.className),
        })}
        {...props}
      />
    );
  }

  return (
    <RegistryCollapsibleTrigger
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </RegistryCollapsibleTrigger>
  );
}

function isNativeButtonTrigger(element: React.ReactElement) {
  const typeName = getElementTypeName(element.type);

  if (typeof element.type === 'string') {
    return element.type === 'button';
  }

  return typeName !== 'SidebarGroupLabel';
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

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  CollapsibleContent,
};
