import type { ComponentProps } from 'react';
import * as React from 'react';

import {
  NavigationMenu as RegistryNavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink as RegistryNavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/registry/default/blocks/header3/components/ui/navigation-menu';

function NavigationMenu({
  viewport = true,
  ...props
}: ComponentProps<typeof RegistryNavigationMenu> & {
  viewport?: boolean;
}) {
  return <RegistryNavigationMenu data-viewport={viewport} {...props} />;
}

function NavigationMenuLink({
  asChild = false,
  children,
  render,
  ...props
}: ComponentProps<typeof RegistryNavigationMenuLink> & {
  asChild?: boolean;
}) {
  const renderValue = asChild
    ? (React.Children.only(children) as React.ReactElement<
        Record<string, unknown>
      >)
    : render;

  return (
    <RegistryNavigationMenuLink
      render={renderValue}
      {...(asChild ? props : { ...props, children })}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
