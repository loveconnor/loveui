import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { grantProAccessFromCheckoutSession } from '@/lib/stripe-pro';

export const runtime = 'nodejs';

type StripeWebhookEvent = {
  type?: string;
  data?: {
    object?: {
      id?: string;
    };
  };
};

function isValidStripeSignature({
  payload,
  secret,
  signatureHeader,
}: {
  payload: string;
  secret: string;
  signatureHeader: string;
}) {
  const parts = signatureHeader.split(',').map((part) => part.trim());
  const timestamp = parts
    .find((part) => part.startsWith('t='))
    ?.slice(2);
  const signatures = parts
    .filter((part) => part.startsWith('v1='))
    .map((part) => part.slice(3));

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  return signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, 'hex');

    return (
      signatureBuffer.length === expectedBuffer.length &&
      timingSafeEqual(signatureBuffer, expectedBuffer)
    );
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook is not configured. Set STRIPE_WEBHOOK_SECRET.' },
      { status: 500 }
    );
  }

  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Stripe signature.' },
      { status: 400 }
    );
  }

  const payload = await request.text();

  if (
    !isValidStripeSignature({
      payload,
      secret: webhookSecret,
      signatureHeader: signature,
    })
  ) {
    return NextResponse.json(
      { error: 'Invalid Stripe webhook signature.' },
      { status: 400 }
    );
  }

  let event: StripeWebhookEvent;

  try {
    event = JSON.parse(payload) as StripeWebhookEvent;
  } catch {
    return NextResponse.json(
      { error: 'Invalid Stripe webhook payload.' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const sessionId = event.data?.object?.id;

    if (sessionId) {
      await grantProAccessFromCheckoutSession(sessionId);
    }
  }

  return NextResponse.json({ received: true });
}
