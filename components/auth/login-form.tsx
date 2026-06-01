'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Button } from '@/registry/default/ui/button';
import {
  Field,
  FieldControl,
  FieldGroup,
  FieldLabel,
} from '@/registry/default/ui/field';
import { authClient } from '@/lib/auth-client';
import { getSafeCallbackUrl } from '@/lib/auth-redirect';

type AuthStep = 'email' | 'code';

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return fallback;
}

async function checkProAccess(email: string) {
  const response = await fetch('/api/pro/access', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return null;
  }

  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  return body?.error || 'That email does not have LoveUI Pro access.';
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'));

  function handleEmailSubmit(formData: FormData) {
    setError(null);

    const nextEmail = String(formData.get('email') || '').trim().toLowerCase();

    startTransition(async () => {
      const accessError = await checkProAccess(nextEmail);

      if (accessError) {
        setError(accessError);
        return;
      }

      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
        email: nextEmail,
        type: 'sign-in',
      });

      if (sendError) {
        setError(
          getErrorMessage(
            sendError,
            'That email does not have LoveUI Pro access.',
          ),
        );
        return;
      }

      setEmail(nextEmail);
      setStep('code');
    });
  }

  function handleCodeSubmit(formData: FormData) {
    setError(null);

    const otp = String(formData.get('otp') || '').trim();

    startTransition(async () => {
      const accessError = await checkProAccess(email);

      if (accessError) {
        setError(accessError);
        return;
      }

      const { error: signInError } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (signInError) {
        setError(getErrorMessage(signInError, 'Invalid or expired code.'));
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  if (step === 'code') {
    return (
      <form action={handleCodeSubmit} className="space-y-5">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-accent/24 px-3 py-3">
          <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>

        <Field>
          <FieldLabel>Code</FieldLabel>
          <FieldControl
            autoComplete="one-time-code"
            disabled={isPending}
            inputMode="numeric"
            maxLength={6}
            minLength={6}
            name="otp"
            pattern="[0-9]*"
            placeholder="000000"
            required
            size="lg"
            type="text"
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-destructive/24 bg-destructive/6 px-3 py-2 text-sm text-destructive-foreground">
            {error}
          </p>
        )}

        <Button className="h-11 w-full" disabled={isPending} type="submit">
          {isPending && (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          )}
          Sign in
        </Button>

        <Button
          className="h-9 w-full"
          disabled={isPending}
          onClick={() => {
            setError(null);
            setStep('email');
          }}
          type="button"
          variant="ghost"
        >
          <ArrowLeft data-icon="inline-start" />
          Use a different email
        </Button>
      </form>
    );
  }

  return (
    <form action={handleEmailSubmit} className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldControl
            autoComplete="email"
            disabled={isPending}
            name="email"
            placeholder="you@example.com"
            required
            size="lg"
            type="email"
          />
        </Field>
      </FieldGroup>

      {error && (
        <p className="rounded-lg border border-destructive/24 bg-destructive/6 px-3 py-2 text-sm text-destructive-foreground">
          {error}
        </p>
      )}

      <Button className="h-11 w-full" disabled={isPending} type="submit">
        {isPending && (
          <Loader2 data-icon="inline-start" className="animate-spin" />
        )}
        Send code
      </Button>
    </form>
  );
}
