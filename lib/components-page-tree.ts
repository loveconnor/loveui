import type * as PageTree from 'fumadocs-core/page-tree';

export const componentLinks = [
  {
    name: 'Accordion',
    slug: 'accordion',
    description: 'A set of collapsible panels with headings.',
  },
  {
    name: 'Alert',
    slug: 'alert',
    description: 'A callout for information and a blocking dialog for decisions.',
  },
  {
    name: 'Autocomplete',
    slug: 'autocomplete',
    description: 'An input that suggests options as you type.',
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    description: 'An image element with a fallback for representing the user.',
  },
  {
    name: 'Badge',
    slug: 'badge',
    description: 'A badge or a component that looks like a badge.',
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links.',
  },
  {
    name: 'Button',
    slug: 'button',
    description: 'A button or a component that looks like a button.',
  },
  {
    name: 'Card',
    slug: 'card',
    description: 'A content container for grouping related information.',
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'A control for checked state, with optional grouped selection.',
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    description: 'A collapsible panel controlled by a button.',
  },
  {
    name: 'Combobox',
    slug: 'combobox',
    description: 'An input combined with a list of predefined items to select.',
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    description: 'A popup that opens on top of the entire page.',
  },
  {
    name: 'Empty',
    slug: 'empty',
    description: 'A container for displaying empty state information.',
  },
  {
    name: 'Field',
    slug: 'field',
    description: 'A component that provides labelling and validation for form controls.',
  },
  {
    name: 'Fieldset',
    slug: 'fieldset',
    description: 'A native fieldset element with a legend.',
  },
  {
    name: 'Form',
    slug: 'form',
    description: 'A form wrapper component that simplifies validation and submission.',
  },
  {
    name: 'Frame',
    slug: 'frame',
    description: 'A framed container for grouping related information.',
  },
  {
    name: 'Group',
    slug: 'group',
    description: 'A component for visually grouping a series of controls.',
  },
  {
    name: 'Input',
    slug: 'input',
    description: 'A native input element.',
  },
  {
    name: 'Label',
    slug: 'label',
    description: 'Renders an accessible label associated with controls.',
  },
  {
    name: 'Menu',
    slug: 'menu',
    description: 'A list of actions in a dropdown, enhanced with keyboard navigation.',
  },
  {
    name: 'Meter',
    slug: 'meter',
    description: 'A graphical display of a numeric value within a range.',
  },
  {
    name: 'Number Field',
    slug: 'number-field',
    description:
      'A numeric input element with increment and decrement buttons, and a scrub area.',
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    description: 'A pagination with page navigation, next and previous links.',
  },
  {
    name: 'Popover',
    slug: 'popover',
    description: 'An accessible popup anchored to a button.',
  },
  {
    name: 'Preview Card',
    slug: 'preview-card',
    description:
      'A popup that appears when a link is hovered, showing a preview for sighted users.',
  },
  {
    name: 'Progress',
    slug: 'progress',
    description: 'Displays the status of a task that takes a long time.',
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    description:
      'A set of checkable buttons where no more than one of the buttons can be checked at a time.',
  },
  {
    name: 'Scroll Area',
    slug: 'scroll-area',
    description: 'A native scroll container with custom scrollbars.',
  },
  {
    name: 'Select',
    slug: 'select',
    description:
      'A common form component for choosing a predefined value in a dropdown menu.',
  },
  {
    name: 'Separator',
    slug: 'separator',
    description: 'A separator element accessible to screen readers.',
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    description:
      'A flyout that opens from the side of the screen, based on the dialog component.',
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    description: 'A loading state skeleton for your components.',
  },
  {
    name: 'Slider',
    slug: 'slider',
    description: 'An input where the user selects a value from within a given range.',
  },
  {
    name: 'Switch',
    slug: 'switch',
    description: 'A control that indicates whether a setting is on or off.',
  },
  {
    name: 'Table',
    slug: 'table',
    description: 'A simple table component for displaying tabular data.',
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    description: 'A component for toggling between related panels on the same page.',
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    description: 'A native textarea element.',
  },
  {
    name: 'Toast',
    slug: 'toast',
    description: 'Generates standard and gooey toast notifications.',
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    description: 'A two-state button that can stand alone or work inside a group.',
  },
  {
    name: 'Toolbar',
    slug: 'toolbar',
    description: 'A container for grouping a set of buttons and controls.',
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    description:
      'A popup that appears when an element is hovered or focused, showing a hint for sighted users.',
  },
];

const allComponentsLink = {
  name: 'All Components',
  url: '/components',
  description: 'Browse every LoveUI component and example.',
};

function toFooterItem(component: (typeof componentLinks)[number]) {
  return {
    name: component.name,
    url: `/components/${component.slug}`,
    description: component.description,
  };
}

export function getComponentFooterItems(slug: string) {
  const index = componentLinks.findIndex((component) => component.slug === slug);

  if (index === -1) return {};

  return {
    previous:
      index === 0
        ? allComponentsLink
        : toFooterItem(componentLinks[index - 1]),
    next: componentLinks[index + 1]
      ? toFooterItem(componentLinks[index + 1])
      : undefined,
  };
}

export const componentsPageTree: PageTree.Root = {
  type: 'root',
  name: 'Components',
  children: [
    {
      type: 'page',
      name: 'All Components',
      url: '/components',
    },
    ...componentLinks.map((component) => ({
      type: 'page' as const,
      name: component.name,
      description: component.description,
      url: `/components/${component.slug}`,
    })),
  ],
};
