'use client';

import {
  CircleCheckIcon,
  FolderIcon,
  PlugIcon,
  RocketIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/registry/default/ui/button';
import { cn } from '@/lib/utils';

interface StepData {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel: string;
}

const steps: StepData[] = [
  {
    title: 'Install your first block',
    description:
      'Add a LoveUI section to your app and keep the source in your codebase.',
    icon: RocketIcon,
    actionLabel: 'Install block',
  },
  {
    title: 'Share the pattern',
    description:
      'Give your team a reusable starting point for polished product screens.',
    icon: UsersIcon,
    actionLabel: 'Share pattern',
  },
  {
    title: 'Organize components',
    description:
      'Move copied blocks into the folders and naming conventions your app already uses.',
    icon: FolderIcon,
    actionLabel: 'Review files',
  },
  {
    title: 'Connect your logic',
    description:
      'Hook forms, actions, and data into the LoveUI interface without rebuilding the layout.',
    icon: PlugIcon,
    actionLabel: 'Wire actions',
  },
];

function getIconColor(isCompleted: boolean, isActive: boolean) {
  if (isCompleted) {
    return 'text-muted-foreground/30';
  }
  if (isActive) {
    return 'text-primary';
  }
  return 'text-muted-foreground/40';
}

function getTitleClass(isCompleted: boolean, isActive: boolean) {
  if (isCompleted) {
    return 'text-muted-foreground/50 line-through';
  }
  if (isActive) {
    return 'text-foreground';
  }
  return 'text-muted-foreground';
}

function StepIndicator({
  index,
  isCompleted,
  isActive,
}: {
  index: number;
  isCompleted: boolean;
  isActive: boolean;
}) {
  if (isCompleted) {
    return (
      <div className="flex size-7 items-center justify-center">
        <CircleCheckIcon
          aria-hidden="true"
          className="size-7 fill-emerald-500 text-emerald-500"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex size-7 items-center justify-center rounded-full font-semibold text-xs',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground'
      )}
    >
      {index + 1}
    </div>
  );
}

function StepCard({
  step,
  index,
  isCompleted,
  isActive,
  onComplete,
}: {
  step: StepData;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  onComplete: () => void;
}) {
  const StepIcon = step.icon;

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-colors',
        isActive && 'border-primary/30 bg-muted/50',
        !isActive && 'border-border bg-background'
      )}
    >
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">
          <StepIndicator
            index={index}
            isActive={isActive}
            isCompleted={isCompleted}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'font-medium leading-6',
                  getTitleClass(isCompleted, isActive)
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  'mt-0.5 text-sm leading-5',
                  isActive
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/60'
                )}
              >
                {step.description}
              </p>
              {isActive && (
                <Button className="mt-3" onClick={onComplete} size="sm">
                  <StepIcon
                    aria-hidden="true"
                    className="-ml-0.5 size-4 shrink-0"
                  />
                  {step.actionLabel}
                </Button>
              )}
            </div>
            <StepIcon
              aria-hidden="true"
              className={cn(
                'mt-0.5 size-5 shrink-0',
                getIconColor(isCompleted, isActive)
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Onboarding02() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    () => new Set([0])
  );

  const currentStep = steps.findIndex((_, i) => !completedSteps.has(i));
  const completedCount = completedSteps.size;
  const allDone = completedCount === steps.length;

  const handleComplete = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl">
        <div className="mb-6">
          <h3 className="font-semibold text-foreground text-lg">
            Start building with LoveUI
          </h3>
          <p className="mt-1 text-muted-foreground text-sm">
            Complete these steps to turn a block into a finished product screen.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {allDone ? (
                  <span className="font-medium text-emerald-600">
                    All done
                  </span>
                ) : (
                  <>
                    <span className="font-medium text-foreground">
                      {completedCount}
                    </span>{' '}
                    of {steps.length} completed
                  </>
                )}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${(completedCount / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <StepCard
              index={index}
              isActive={index === currentStep}
              isCompleted={completedSteps.has(index)}
              key={step.title}
              onComplete={() => handleComplete(index)}
              step={step}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
