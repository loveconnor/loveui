'use client';

import {
  ChartBarIcon,
  CircleCheckIcon,
  Code2Icon,
  DatabaseIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/default/ui/accordion';
import { Button } from '@/registry/default/ui/button';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Choose the section',
    subtitle: 'Block selected',
    icon: SlidersHorizontalIcon,
    description:
      'Start from a LoveUI block that already has layout, spacing, and responsive states handled.',
    buttonText: 'Browse blocks',
  },
  {
    title: 'Connect your data',
    subtitle: 'Add content',
    icon: DatabaseIcon,
    description:
      'Replace example content with your product copy, records, and calls to action.',
    buttonText: 'Add content',
  },
  {
    title: 'Adapt the code',
    subtitle: 'Source owned',
    icon: Code2Icon,
    description: 'Keep the copied component local and adjust it to your app conventions.',
    buttonText: 'Open files',
  },
  {
    title: 'Review the screen',
    subtitle: 'Ready to ship',
    icon: ChartBarIcon,
    description:
      'Check accessibility, mobile layout, and final product polish before release.',
    buttonText: 'Review UI',
  },
];

export function Onboarding04() {
  const [activeStep, setActiveStep] = useState(1);

  const [openItem, setOpenItem] = useState(
    activeStep < steps.length ? steps[activeStep].title : ''
  );

  const handleComplete = () => {
    const next = activeStep + 1;
    setActiveStep(next);
    setOpenItem(next < steps.length ? steps[next].title : '');
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="mx-auto w-full min-w-0 max-w-sm sm:min-w-sm">
        <h3 className="font-semibold text-foreground text-lg">LoveUI quick start</h3>
        <p className="mt-1 text-muted-foreground text-sm">
          Turn a copied block into a production interface in four steps.
        </p>
        <Accordion
          className="mt-6 space-y-2"
          collapsible
          onValueChange={setOpenItem}
          type="single"
          value={openItem}
        >
          {steps.map((step, index) => {
            let status: 'complete' | 'current' | 'upcoming' = 'upcoming';
            if (index < activeStep) {
              status = 'complete';
            } else if (index === activeStep) {
              status = 'current';
            }

            return (
              <AccordionItem
                className="!border-b rounded-lg border shadow-xs"
                key={step.title}
                value={step.title}
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center space-x-2">
                    {status === 'complete' ? (
                      <span
                        aria-hidden
                        className="flex size-5 items-center justify-center"
                      >
                        <CircleCheckIcon
                          aria-hidden
                          className="size-6 shrink-0 fill-foreground text-foreground"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="size-5 shrink-0 rounded-full border border-border"
                      />
                    )}
                    <p
                      className={cn(
                        'font-medium text-sm',
                        status === 'upcoming'
                          ? 'text-muted-foreground/60'
                          : 'text-foreground'
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="flex items-center justify-center rounded-md bg-muted px-4 py-5 ring-1 ring-ring ring-inset">
                    <div className="max-w-xs text-center">
                      <step.icon
                        aria-hidden
                        className="mx-auto size-7 shrink-0 text-muted-foreground"
                      />
                      <p className="mt-4 font-semibold text-muted-foreground text-sm">
                        {step.subtitle}
                      </p>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {step.description}
                      </p>
                      {status === 'complete' ? (
                        <Button className="mt-6" size="sm" variant="outline">
                          {step.buttonText}
                        </Button>
                      ) : (
                        <Button
                          className="mt-6"
                          disabled={status === 'upcoming'}
                          onClick={() => {
                            if (status === 'current') {
                              handleComplete();
                            }
                          }}
                          size="sm"
                        >
                          {step.buttonText}
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
