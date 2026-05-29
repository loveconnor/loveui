'use client';

import { CircleCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/registry/default/ui/progress';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: '1.',
    title: 'Pick a block',
    description:
      'Choose the LoveUI section that best fits the screen you are building.',
  },
  {
    id: '2.',
    title: 'Copy the source',
    description:
      'Install the block from the registry and keep every file editable in your app.',
  },
  {
    id: '3.',
    title: 'Adapt the details',
    description:
      'Update copy, data, actions, and styling while preserving the layout quality.',
  },
  {
    id: '4.',
    title: 'Ship the interface',
    description: 'Review responsive behavior, accessibility, and final polish before launch.',
  },
];

export function Onboarding03() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-semibold text-foreground text-lg">LoveUI setup</h3>
        <p className="mt-1 text-muted-foreground text-sm leading-6">
          Complete each step to ship a polished screen from source-first blocks.
        </p>
        <div className="mt-4 flex items-center justify-end space-x-4">
          <span className="text-muted-foreground text-sm">
            Step {activeStep + 1}/{steps.length}
          </span>
          <Progress
            className="w-32"
            value={(activeStep / steps.length) * 100}
          />
        </div>
        <ul className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                className={cn(
                  'relative w-full cursor-pointer rounded-lg border bg-card p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  index === activeStep
                    ? 'border-foreground/20'
                    : 'border-border'
                )}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <div className="flex items-start space-x-3">
                  {index < activeStep ? (
                    <CircleCheckIcon
                      aria-hidden={true}
                      className="size-6 shrink-0 fill-foreground text-foreground"
                    />
                  ) : (
                    <span
                      aria-hidden={true}
                      className="flex size-6 items-center justify-center font-medium text-muted-foreground"
                    >
                      {step.id}
                    </span>
                  )}
                  <div>
                    <h3
                      className={cn(
                        'font-medium',
                        index < activeStep
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground'
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground text-sm leading-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg bg-muted p-4">
          <h4 className="font-medium text-foreground text-sm">Need help?</h4>
          <p className="mt-1 text-muted-foreground text-sm">
            Connect with Connor Love at{' '}
            <a
              className="font-medium text-primary"
              href="mailto:hello@loveui.dev"
            >
              hello@loveui.dev
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
