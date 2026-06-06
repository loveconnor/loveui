import { ensureProUser, grantProAccess } from '@/lib/pro-access';
import { normalizeProPlanKey } from '@/lib/pro-plans';

type StripeCheckoutSession = {
  id: string;
  mode?: string | null;
  payment_status?: string | null;
  customer?: string | null;
  customer_email?: string | null;
  customer_details?: {
    email?: string | null;
  } | null;
  payment_intent?: string | null;
  metadata?: {
    email?: string;
    plan?: string;
    product?: string;
    userId?: string;
  } | null;
  error?: {
    message?: string;
  };
};

function getStripeSecretKey() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey || !stripeSecretKey.startsWith('sk_')) {
    return null;
  }

  return stripeSecretKey;
}

export async function grantProAccessFromCheckoutSession(sessionId: string) {
  const stripeSecretKey = getStripeSecretKey();

  if (!stripeSecretKey || !sessionId.startsWith('cs_')) {
    console.warn(
      'Skipping LoveUI Pro grant because Stripe is not configured or session id is invalid.',
      {
        hasStripeSecretKey: Boolean(stripeSecretKey),
        sessionId,
      }
    );

    return { granted: false };
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    );
    const session = (await response.json()) as StripeCheckoutSession;

    if (!response.ok) {
      console.error('Unable to retrieve Stripe checkout session.', {
        sessionId,
        error: session.error?.message,
      });

      return { granted: false };
    }

    console.info('Retrieved Stripe checkout session for LoveUI Pro grant.', {
      sessionId: session.id,
      mode: session.mode,
      paymentStatus: session.payment_status,
      product: session.metadata?.product,
      plan: session.metadata?.plan,
      hasCustomerEmail: Boolean(session.customer_email),
      hasCustomerDetailsEmail: Boolean(session.customer_details?.email),
    });

    if (
      session.mode !== 'payment' ||
      session.payment_status !== 'paid' ||
      session.metadata?.product !== 'loveui-pro'
    ) {
      return { granted: false };
    }

    const email =
      session.customer_details?.email ??
      session.customer_email ??
      session.metadata?.email;

    if (!email) {
      return { granted: false };
    }

    const plan = normalizeProPlanKey(session.metadata?.plan);

    await grantProAccess({
      email,
      plan,
      userId: session.metadata?.userId || null,
      stripeCustomerId: session.customer,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
    });

    try {
      await ensureProUser(email);
    } catch (error) {
      console.error(
        'LoveUI Pro access was granted, but Better Auth user upsert failed.',
        {
          email,
          sessionId,
          error,
        }
      );
    }

    return { granted: true, email, plan };
  } catch (error) {
    console.error('Unable to grant Pro access from Stripe checkout session.', {
      sessionId,
      error,
    });

    return { granted: false };
  }
}
