import type React from 'react';
import {
  BlocksIcon,
  BookOpenIcon,
  Code2Icon,
  ComponentIcon,
  PaletteIcon,
  SparklesIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { GridPattern } from './grid-pattern';

type Feature = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function LandingFeatures() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
            Everything in the docs has a path to code.
          </h2>
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            Learn the primitives, copy production blocks, and keep agent-driven
            UI work aligned with the project conventions.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  feature: Feature;
}) {
  return (
    <div
      className={cn('relative overflow-hidden bg-background p-6', className)}
      {...props}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={20}
        />
      </div>
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {feature.icon}
      </div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  );
}

const features: Feature[] = [
  {
    title: 'Get started clearly',
    icon: <BookOpenIcon />,
    description: 'Install LoveUI and understand the project structure quickly.',
  },
  {
    title: 'Use components',
    icon: <ComponentIcon />,
    description: 'Reference accessible primitives with examples and source.',
  },
  {
    title: 'Compose blocks',
    icon: <BlocksIcon />,
    description: 'Copy larger page sections without touching the registry.',
  },
  {
    title: 'Tune styling',
    icon: <PaletteIcon />,
    description: 'Adapt tokens, themes, and section rhythm to your product.',
  },
  {
    title: 'Build with agents',
    icon: <SparklesIcon />,
    description: 'Guide Codex with LoveUI skills and predictable UX contracts.',
  },
  {
    title: 'Own the code',
    icon: <Code2Icon />,
    description: 'Every install lands in your app, ready to edit and review.',
  },
];
