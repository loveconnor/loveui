export const proPlanKeys = ['individual', 'team', 'enterprise'] as const;

export type ProPlanKey = (typeof proPlanKeys)[number];
export type CheckoutProPlanKey = ProPlanKey;

type ProPlanAction = 'checkout' | 'contact';

export type ProPlan = {
  key: ProPlanKey;
  name: string;
  eyebrow: string;
  price: string;
  cadence: string;
  badge: string;
  description: string;
  cta: string;
  action: ProPlanAction;
  href?: string;
  highlighted?: boolean;
  features: string[];
};

export const proPlans: ProPlan[] = [
  {
    key: 'individual',
    name: 'Pro',
    eyebrow: 'For independent builders',
    price: '$99',
    cadence: 'one-time',
    badge: 'Lifetime',
    description:
      'Private registry access for one developer shipping products, internal tools, and client work.',
    cta: 'Buy Pro',
    action: 'checkout',
    features: [
      'Production-ready application blocks',
      'Dashboard, data table, and navigation systems',
      'Advanced forms, auth screens, and workspace UI',
      'Premium marketing and SaaS page sections',
      'Private registry access with installable source',
      'Future Pro releases and template updates',
    ],
  },
  {
    key: 'team',
    name: 'Team',
    eyebrow: 'For small product teams',
    price: '$299',
    cadence: 'one-time',
    badge: 'Best fit',
    description:
      'A team license for shared product work, client delivery, and centralized purchasing.',
    cta: 'Buy Team',
    action: 'checkout',
    highlighted: true,
    features: [
      'Everything in Pro',
      'Team license for product and client work',
      'Shared procurement through one checkout',
      'Priority consideration for Pro block requests',
      'Future Pro releases and template updates',
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    eyebrow: 'For larger organizations',
    price: '$599',
    cadence: 'one-time',
    badge: 'Scale',
    description:
      'Procurement-friendly access for organizations that need custom terms and rollout support.',
    cta: 'Buy Enterprise',
    action: 'checkout',
    features: [
      'Everything in Team',
      'Custom licensing and procurement support',
      'Security review and vendor onboarding',
      'Centralized rollout guidance',
      'Roadmap alignment for larger teams',
    ],
  },
];

export const checkoutProPlans: Record<
  CheckoutProPlanKey,
  {
    key: CheckoutProPlanKey;
    name: string;
    priceEnvVar: string;
  }
> = {
  individual: {
    key: 'individual',
    name: 'LoveUI Pro',
    priceEnvVar: 'STRIPE_PRO_PRICE_ID',
  },
  team: {
    key: 'team',
    name: 'LoveUI Pro Team',
    priceEnvVar: 'STRIPE_PRO_TEAM_PRICE_ID',
  },
  enterprise: {
    key: 'enterprise',
    name: 'LoveUI Pro Enterprise',
    priceEnvVar: 'STRIPE_PRO_ENTERPRISE_PRICE_ID',
  },
};

export const proPlanLabels: Record<ProPlanKey, string> = {
  individual: 'pro',
  team: 'team',
  enterprise: 'enterprise',
};

export function normalizeProPlanKey(plan: unknown): ProPlanKey {
  if (plan === 'team' || plan === 'enterprise') {
    return plan;
  }

  return 'individual';
}

export function getCheckoutProPlan(plan: FormDataEntryValue | null) {
  if (
    typeof plan === 'string' &&
    (plan === 'individual' || plan === 'team' || plan === 'enterprise')
  ) {
    return checkoutProPlans[plan];
  }

  return checkoutProPlans.individual;
}
