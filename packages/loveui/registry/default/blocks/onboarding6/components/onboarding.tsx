import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    type: 'done',
    title: 'Block installed',
    description: 'Copied the LoveUI source into the app',
    activityTime: '3d ago',
  },
  {
    id: 2,
    type: 'done',
    title: 'Copy updated',
    description: 'Replaced example text with product-specific content',
    activityTime: '2d ago',
  },
  {
    id: 3,
    type: 'done',
    title: 'Interactions wired',
    description: 'Connected forms, links, and actions to app logic',
    activityTime: '31min ago',
  },
  {
    id: 4,
    type: 'in progress',
    title: 'Reviewing interface',
    description: 'Checking responsive layout and accessibility states',
    activityTime: 'Running now...',
  },
  {
    id: 5,
    type: 'open',
    title: 'Ship the screen',
    description: 'Release the polished LoveUI section to production',
    activityTime: 'Upcoming',
  },
];

export function Onboarding06() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-foreground">LoveUI launch progress</h3>
        <ul className="mt-6 space-y-6">
          {steps.map((step, stepIdx) => (
            <li className="relative flex gap-x-3" key={step.id}>
              <div
                className={cn(
                  'absolute top-0 left-0 flex w-6 justify-center',
                  stepIdx === steps.length - 1 ? 'h-6' : '-bottom-6'
                )}
              >
                <span aria-hidden className="w-px bg-border" />
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="relative flex size-6 flex-none items-center justify-center bg-background">
                  {step.type === 'done' ? (
                    <CheckIcon aria-hidden className="size-5 text-primary" />
                  ) : step.type === 'in progress' ? (
                    <div
                      aria-hidden
                      className="size-2.5 rounded-full bg-primary ring-4 ring-background"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="size-3 rounded-full border border-border bg-background ring-4 ring-background"
                    />
                  )}
                </div>
                <div>
                  <p className="mt-0.5 font-medium text-foreground text-sm">
                    {step.title}{' '}
                    <span className="font-normal text-muted-foreground/60">
                      &#8729; {step.activityTime}
                    </span>
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
