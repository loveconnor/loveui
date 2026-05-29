'use client';

import {
  ArchiveIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  MailIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/registry/default/ui/button';
import { Collapsible, CollapsibleContent } from '@/registry/default/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/default/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 'profile',
    title: 'Choose a LoveUI block',
    description:
      'Start from a production-ready section that matches the screen you are building.',
    completed: true,
    actionLabel: 'Browse blocks',
    actionHref: '#',
  },
  {
    id: 'workspace',
    title: 'Install the component',
    description:
      'Copy the block into your app with the registry command or paste the source directly.',
    completed: false,
    actionLabel: 'Install block',
    actionHref: '#',
  },
  {
    id: 'invite',
    title: 'Match your product',
    description:
      'Adjust the copy, spacing, colors, and data to fit your interface.',
    completed: false,
    actionLabel: 'Customize block',
    actionHref: '#',
  },
  {
    id: 'integrations',
    title: 'Wire up behavior',
    description:
      'Connect forms, links, and states to your app logic while keeping the polished layout.',
    completed: false,
    actionLabel: 'Connect actions',
    actionHref: '#',
  },
  {
    id: 'workflow',
    title: 'Reuse the pattern',
    description:
      'Turn the finished section into a local pattern your team can use again.',
    completed: false,
    actionLabel: 'Save pattern',
    actionHref: '#',
  },
  {
    id: 'notifications',
    title: 'Ship the screen',
    description:
      'Review responsive states, accessibility, and final polish before launch.',
    completed: false,
    actionLabel: 'Review screen',
    actionHref: '#',
  },
];

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  actionLabel: string;
  actionHref: string;
}

function CircularProgress({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const progress = total > 0 ? ((total - completed) / total) * 100 : 0;
  const strokeDashoffset = 100 - progress;

  return (
    <svg
      className="-rotate-90"
      height="14"
      viewBox="0 0 14 14"
      width="14"
    >
      <circle
        className="stroke-muted"
        cx="7"
        cy="7"
        fill="none"
        pathLength="100"
        r="6"
        strokeWidth="2"
      />
      <circle
        className="stroke-primary"
        cx="7"
        cy="7"
        fill="none"
        pathLength="100"
        r="6"
        strokeDasharray="100"
        strokeLinecap="round"
        strokeWidth="2"
        style={{ strokeDashoffset }}
      />
    </svg>
  );
}

function StepIndicator({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <CircleCheckIcon
        aria-hidden="true"
        className="mt-1 size-4.5 shrink-0 fill-primary text-primary"
      />
    );
  }
  return (
    <CircleDashedIcon
      aria-hidden="true"
      className="mt-1 size-5 shrink-0 stroke-muted-foreground/40"
      strokeWidth={2}
    />
  );
}

export function Onboarding01() {
  const [currentSteps, setCurrentSteps] = useState<OnboardingStep[]>(steps);
  const [openStepId, setOpenStepId] = useState<string | null>(() => {
    const firstIncomplete = steps.find((s) => !s.completed);
    return firstIncomplete?.id ?? steps[0]?.id ?? null;
  });
  const [dismissed, setDismissed] = useState(false);

  const completedCount = currentSteps.filter((s) => s.completed).length;
  const remainingCount = currentSteps.length - completedCount;

  const handleStepClick = (stepId: string) => {
    setOpenStepId(openStepId === stepId ? null : stepId);
  };

  const handleStepAction = (step: OnboardingStep) => {
    const updated = currentSteps.map((s) =>
      s.id === step.id ? { ...s, completed: true } : s
    );
    setCurrentSteps(updated);
    const nextIncomplete = updated.find((s) => !s.completed);
    setOpenStepId(nextIncomplete?.id ?? null);
  };

  if (dismissed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-4">
        <div className="text-center">
          <p className="text-pretty text-muted-foreground">
            Checklist dismissed
          </p>
          <button
            className="mt-2 text-primary text-sm underline"
            onClick={() => setDismissed(false)}
          >
            Show again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="w-md rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
          <div className="mr-2 mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
            <h3 className="ml-2 text-balance font-semibold text-foreground">
              Build faster with LoveUI
            </h3>
            <div className="mt-2 flex items-center justify-end sm:mt-0">
              <CircularProgress
                completed={remainingCount}
                total={currentSteps.length}
              />
              <div className="mr-3 ml-1.5 text-muted-foreground text-sm">
                <span className="font-medium text-foreground">
                  {completedCount}
                </span>
                {' / '}
                <span className="font-medium text-foreground">
                  {currentSteps.length}
                </span>{' '}
                completed
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring">
                  <MoreHorizontalIcon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="sr-only">Options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setDismissed(true)}>
                    <ArchiveIcon
                      aria-hidden="true"
                      className="mr-2 h-4 w-4 shrink-0"
                    />
                    Dismiss
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      window.open('mailto:hello@loveui.dev?subject=Feedback')
                    }
                  >
                    <MailIcon
                      aria-hidden="true"
                      className="mr-2 h-4 w-4 shrink-0"
                    />
                    Give feedback
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-0">
            {currentSteps.map((step, index) => {
              const isOpen = openStepId === step.id;
              const isFirst = index === 0;
              const prevStep = currentSteps[index - 1];
              const isPrevOpen = prevStep && openStepId === prevStep.id;

              const showBorderTop = !(isFirst || isOpen || isPrevOpen);

              return (
                <div
                  className={cn(
                    'group',
                    isOpen && 'rounded-lg',
                    showBorderTop && 'border-border border-t'
                  )}
                  key={step.id}
                >
                  <div
                    className={cn(
                      'block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isOpen && 'rounded-lg'
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStepClick(step.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className={cn(
                        'relative overflow-hidden rounded-lg transition-colors',
                        isOpen && 'border border-border bg-muted'
                      )}
                    >
                      <div className="relative flex items-center justify-between gap-3 py-3 pr-2 pl-4">
                        <div className="flex w-full gap-3">
                          <div className="shrink-0">
                            <StepIndicator completed={step.completed} />
                          </div>
                          <div className="mt-0.5 grow">
                            <h4
                              className={cn(
                                'font-semibold',
                                step.completed
                                  ? 'text-primary'
                                  : 'text-foreground'
                              )}
                            >
                              {step.title}
                            </h4>
                            <Collapsible open={isOpen}>
                              <CollapsibleContent>
                                <p className="mt-2 text-pretty text-muted-foreground text-sm sm:max-w-64 md:max-w-xs">
                                  {step.description}
                                </p>
                                <Button
                                  asChild
                                  className="mt-3"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStepAction(step);
                                  }}
                                  size="sm"
                                >
                                  <a href={step.actionHref}>
                                    {step.actionLabel}
                                  </a>
                                </Button>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        </div>
                        {!isOpen && (
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-muted-foreground"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
