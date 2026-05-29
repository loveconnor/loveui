import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    type: 'created',
    description: 'installed the pricing block',
    user: { name: 'Connor Love', initial: 'C', bgColor: 'bg-violet-500' },
    activityTime: '3d ago',
  },
  {
    id: 2,
    type: 'created',
    description: 'updated the component copy for LoveUI',
    user: { name: 'Design System', initial: 'D', bgColor: 'bg-orange-500' },
    activityTime: '2d ago',
  },
  {
    id: 3,
    type: 'created',
    description: 'wired actions into the copied source',
    user: { name: 'Connor Love', initial: 'C', bgColor: 'bg-emerald-500' },
    activityTime: '2h ago',
  },
  {
    id: 4,
    type: 'created',
    description: 'reviewed responsive behavior',
    user: { name: 'LoveUI QA', initial: 'L', bgColor: 'bg-fuchsia-500' },
    activityTime: '5min ago',
  },
  {
    id: 5,
    type: 'in progress',
    description: 'preparing the screen for launch',
    user: { name: 'Product Team', initial: 'P', bgColor: 'bg-blue-500' },
    activityTime: 'today 2:30pm',
  },
];

export function Onboarding05() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="sm:max-w-lg md:mx-auto">
        <h3 className="font-medium text-foreground">LoveUI activity</h3>
        <p className="mt-1 text-muted-foreground text-sm leading-6">
          Recent updates from a source-first UI workflow.
        </p>
        <ul className="mt-6 space-y-6 pb-2">
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
              <div className="flex items-start space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="relative flex size-6 flex-none items-center justify-center bg-background">
                    {step.type === 'created' ? (
                      <div className="size-3 rounded-full border border-gray-300 bg-muted/50 ring-4 ring-background" />
                    ) : (
                      <div className="size-3 rounded-full border border-gray-300 bg-background ring-4 ring-background" />
                    )}
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      step.user.bgColor,
                      'inline-flex size-6 flex-none items-center justify-center rounded-full text-primary-foreground text-xs'
                    )}
                  >
                    {step.user.initial}
                  </span>
                </div>
                <p className="mt-0.5 font-medium text-foreground text-sm">
                  {step.user.name}
                  <span className="font-normal text-muted-foreground">
                    {' '}
                    {step.description}
                  </span>
                  <span className="font-normal text-muted-foreground/60">
                    {' '}
                    &#8729; {step.activityTime}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
