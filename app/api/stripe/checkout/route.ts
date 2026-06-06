import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCheckoutProPlan } from '@/lib/pro-plans';

type StripeCheckoutSessionResponse = {
  url?: string | null;
  error?: {
    message?: string;
  };
};

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000'
  );
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const formData = await request.formData().catch(() => null);
  const plan = getCheckoutProPlan(formData?.get('plan') ?? null);
  const priceId = process.env[plan.priceEnvVar];

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error: 'Stripe checkout is not configured. Set STRIPE_SECRET_KEY.',
      },
      { status: 500 }
    );
  }

  if (!stripeSecretKey.startsWith('sk_')) {
    return NextResponse.json(
      {
        error:
          'STRIPE_SECRET_KEY must be a secret key that starts with sk_. Do not use a publishable pk_ key on the server.',
      },
      { status: 500 }
    );
  }

  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe checkout is not configured. Set ${plan.priceEnvVar}.`,
      },
      { status: 500 }
    );
  }

  if (!priceId.startsWith('price_')) {
    return NextResponse.json(
      {
        error: `${plan.priceEnvVar} must be a Stripe Price id that starts with price_. You are probably using a Product id that starts with prod_.`,
      },
      { status: 500 }
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const baseUrl = getBaseUrl();

  const checkoutSessionParams = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    allow_promotion_codes: 'true',
    success_url: `${baseUrl}/pro?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pro?checkout=cancelled`,
    'metadata[product]': 'loveui-pro',
    'metadata[plan]': plan.key,
    'metadata[planName]': plan.name,
    'metadata[userId]': session?.user.id ?? '',
    'metadata[email]': session?.user.email ?? '',
  });

  if (session?.user.email) {
    checkoutSessionParams.set('customer_email', session.user.email);
  }

  let checkoutSession: StripeCheckoutSessionResponse;

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: checkoutSessionParams,
    });

    checkoutSession =
      (await response.json()) as StripeCheckoutSessionResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            checkoutSession.error?.message ??
            'Unable to create Stripe checkout session.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to create Stripe checkout session.';

    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!checkoutSession.url) {
    return NextResponse.json(
      { error: 'Stripe did not return a checkout URL.' },
      { status: 500 }
    );
  }

  return NextResponse.redirect(checkoutSession.url, 303);
}
