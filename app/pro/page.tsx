import type { Metadata } from 'next';
import {
  ArrowRightIcon,
  BlocksIcon,
  CheckIcon,
  CheckCircle2Icon,
  Code2Icon,
  ComponentIcon,
  GaugeIcon,
  LockKeyholeIcon,
  SparklesIcon,
} from 'lucide-react';
import { Button } from '@/registry/default/ui/button';
import { cn } from '@/lib/utils';
import { grantProAccessFromCheckoutSession } from '@/lib/stripe-pro';

export const metadata: Metadata = {
  title: 'LoveUI Pro',
  description:
    'Upgrade to LoveUI Pro for premium blocks, full-page systems, and private registry access.',
};

const features = [
  {
    title: 'Premium blocks',
    description:
      'Unlock advanced marketing sections, product pages, pricing flows, dashboards, and conversion-focused layouts.',
    icon: <BlocksIcon />,
  },
  {
    title: 'Full-page systems',
    description:
      'Start from complete screens instead of stitching together isolated examples.',
    icon: <ComponentIcon />,
  },
  {
    title: 'Agent-ready workflows',
    description:
      'Use stronger LoveUI guidance for Codex and keep generated work aligned with the registry.',
    icon: <SparklesIcon />,
  },
  {
    title: 'Private source access',
    description:
      'Copy, edit, and ship the Pro source directly inside your application codebase.',
    icon: <Code2Icon />,
  },
  {
    title: 'Faster production passes',
    description:
      'Use polished sections with responsive rhythm, empty states, and interaction details already handled.',
    icon: <GaugeIcon />,
  },
  {
    title: 'Commercial usage',
    description:
      'Use Pro blocks across client and internal projects without waiting on public registry releases.',
    icon: <LockKeyholeIcon />,
  },
];

const included = [
  'Premium marketing page sections',
  'Conversion-focused pricing and checkout pages',
  'Advanced product and SaaS landing pages',
  'Private Pro registry access',
  'Full-page app and dashboard examples',
  'Priority updates as new Pro blocks ship',
];

const faqs = [
  {
    question: 'What happens after checkout?',
    answer:
      'Stripe redirects you back to LoveUI. The account email from checkout is used to grant Pro access.',
  },
  {
    question: 'Do I need an account first?',
    answer:
      'You can start from this page. Stripe collects the customer email, and LoveUI can connect access to that email.',
  },
  {
    question: 'Can I use Pro on client projects?',
    answer:
      'Yes. Pro is designed for teams building production product surfaces and client-facing applications.',
  },
];

const previewPanels = [
  {
    title: 'Marketing systems',
    eyebrow: 'Launch pages',
    items: ['Hero, proof, pricing, FAQ', 'Campaign-ready page sections'],
  },
  {
    title: 'Private registry',
    eyebrow: 'Pro source',
    items: ['Installable premium blocks', 'Copy-paste code you own'],
  },
  {
    title: 'Agent workflows',
    eyebrow: 'Codex-ready',
    items: ['Prompted implementation paths', 'Reviewable product surfaces'],
  },
];

type ProPageProps = {
  searchParams: Promise<{
    checkout?: string;
    session_id?: string;
  }>;
};

export default async function ProPage({ searchParams }: ProPageProps) {
  const params = await searchParams;
  const checkoutResult =
    params.checkout === 'success' && params.session_id
      ? await grantProAccessFromCheckoutSession(params.session_id)
      : null;

  return (
    <main className="relative overflow-hidden bg-background">
      {checkoutResult?.granted && (
        <div className="border-b bg-primary/8 px-4 py-3 text-center text-sm">
          Pro access is active for {checkoutResult.email}. You can now log in
          with code 123456 in development.
        </div>
      )}
      <ProHero />
      <ProFeatures />
      <ProPricing />
      <ProFaq />
      <ProCta />
    </main>
  );
}

function ProHero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_50%_0%,--theme(--color-foreground/.08),transparent)]"
      />
      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-5 py-24 text-center">
        <a
          className={cn(
            'group flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow',
            'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-300 duration-500 ease-out'
          )}
          href="#pricing"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
            Pro
          </span>
          <span className="text-xs">premium blocks and private access</span>
          <span className="block h-5 border-l" />
          <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
        </a>

        <h1
          className={cn(
            'max-w-4xl text-balance font-medium text-4xl tracking-tight md:text-6xl lg:text-7xl',
            'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out'
          )}
        >
          LoveUI Pro
        </h1>

        <p className="fade-in slide-in-from-bottom-10 max-w-2xl animate-in fill-mode-backwards text-balance text-base text-muted-foreground delay-200 duration-500 ease-out md:text-xl">
          Premium marketing sections, full-page product systems, and private
          registry access for teams shipping polished interfaces faster.
        </p>

        <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
          <Button asChild className="rounded-full" size="lg">
            <a href="#pricing">
              Buy access
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild className="rounded-full" size="lg" variant="outline">
            <a href="/blocks">Preview blocks</a>
          </Button>
        </div>

        <div className="relative mt-10 w-full max-w-5xl overflow-hidden rounded-lg border bg-card/70 shadow-sm">
          <div className="grid gap-px bg-border md:grid-cols-3">
            {previewPanels.map((panel) => (
              <div className="bg-background p-5 text-left" key={panel.title}>
                <p className="font-medium text-sm">{panel.title}</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  {panel.eyebrow}
                </p>
                <div className="mt-5 space-y-3">
                  {panel.items.map((item) => (
                    <div className="flex items-center gap-2 text-sm" key={item}>
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckIcon className="size-3" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProFeatures() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
            More than a component pack.
          </h2>
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            Pro focuses on complete product surfaces: launches, SaaS pages,
            dashboards, and workflows that need to feel production-ready.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <div
                className="relative min-h-48 overflow-hidden bg-background p-6"
                key={feature.title}
              >
                <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
                  {feature.icon}
                </div>
                <h3 className="mt-10 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProPricing() {
  return (
    <section className="px-4 py-20 md:py-28" id="pricing">
      <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_24rem] md:items-start">
        <div>
          <p className="font-medium text-muted-foreground text-sm">Pricing</p>
          <h2 className="mt-3 max-w-2xl text-balance font-medium text-3xl md:text-5xl">
            Buy access once and start shipping Pro blocks.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            The checkout button creates a Stripe Checkout session. Configure
            your Stripe price in environment variables and the flow will send
            users directly to Stripe.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">LoveUI Pro</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Private block library access
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs">
              Lifetime
            </span>
          </div>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-semibold text-4xl">$99</span>
            <span className="pb-1 text-muted-foreground text-sm">
              one-time
            </span>
          </div>

          <form action="/api/stripe/checkout" className="mt-6" method="post">
            <Button className="h-11 w-full" type="submit">
              Buy access
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </form>

          <ul className="mt-6 space-y-3">
            {included.map((item) => (
              <li className="flex gap-2 text-sm" key={item}>
                <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProFaq() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl border-y py-10">
        <h2 className="text-balance font-medium text-2xl md:text-4xl">
          Questions before you buy
        </h2>
        <div className="mt-8 divide-y">
          {faqs.map((faq) => (
            <div className="py-5" key={faq.question}>
              <h3 className="font-medium">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProCta() {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 border-y px-4 py-10 text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl">
          Ready to unlock LoveUI Pro?
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Start checkout through Stripe and use the same email for Pro access.
        </p>
        <form action="/api/stripe/checkout" method="post">
          <Button className="rounded-full" size="lg" type="submit">
            Buy access
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  );
}
