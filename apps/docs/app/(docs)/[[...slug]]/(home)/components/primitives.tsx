"use client";

import { Button, Input, Switch } from "loveui";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const ButtonsDemo = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button color="blue">Primary</Button>
    <Button outline>Outline</Button>
    <Button plain>Ghost</Button>
  </div>
);

const FormDemo = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="grid gap-4">
      <Input placeholder="Email" type="email" />
      <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3">
        <Switch checked={enabled} onChange={setEnabled} />
        <div>
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-sm text-muted-foreground">
            Toggle product updates and onboarding tips.
          </p>
        </div>
      </div>
    </div>
  );
};

const OverlayDemo = () => (
  <div className="w-full max-w-xs rounded-lg border bg-primary/5 p-4 shadow-sm">
    <p className="text-sm font-semibold text-foreground">Dialog preview</p>
    <p className="mt-2 text-sm text-muted-foreground">
      Accessible overlays include focus management, keyboard shortcuts, and
      theming baked in.
    </p>
    <div className="mt-4 flex gap-2">
      <Button plain>Cancel</Button>
      <Button color="dark/zinc">Save changes</Button>
    </div>
  </div>
);

const cards = [
  {
    title: "Buttons & actions",
    description:
      "Button base components match LoveUI tokens and handle hover, focus, and pressed states out of the box.",
    component: ButtonsDemo,
  },
  {
    title: "Form controls",
    description:
      "Inputs, toggles, and helpers stay unopinionated so you can brand them without reimplementing accessibility.",
    component: FormDemo,
  },
  {
    title: "Overlays & feedback",
    description:
      "Dialogs, alerts, and feedback surfaces ship with focus traps, transitions, and semantics baked in.",
    component: OverlayDemo,
  },
];

export const BaseComponents = () => (
  <div className="container mx-auto grid gap-8">
    <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
      <div className="grid gap-4">
        <h2 className="max-w-lg font-semibold text-3xl">
          Start from the fundamentals
        </h2>
        <p className="max-w-lg text-balance text-lg text-muted-foreground">
          The loveui package exposes the raw building blocks—buttons, inputs,
          overlays, layouts—that power LoveUI features and sections. Use them to
          seed your own design system without losing the polish.
        </p>
      </div>
      <Button color="dark/zinc" href="/docs/primitives">
        <span>Explore base components</span>
        <ArrowRightIcon size={16} />
      </Button>
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {cards.map(({ title, description, component: Component }) => (
        <div
          className="flex h-full flex-col justify-between gap-6 rounded-lg bg-secondary p-4 sm:p-6"
          key={title}
        >
          <div className="grid gap-2">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="text-left">
            <Component />
          </div>
        </div>
      ))}
    </div>
  </div>
);
