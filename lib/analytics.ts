'use client';

type AnalyticsPrimitive = string | number | boolean | null | undefined;

export type AnalyticsProperties = Record<
  string,
  AnalyticsPrimitive | AnalyticsPrimitive[]
>;

const localHostnamePattern =
  /^(localhost|0\.0\.0\.0|127(?:\.\d{1,3}){0,3}|\[?::1\]?|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}|.*\.local)$/i;

export function isAnalyticsEnabled() {
  return (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) &&
    !localHostnamePattern.test(window.location.hostname)
  );
}

function cleanProperties(properties: AnalyticsProperties = {}) {
  const cleaned: AnalyticsProperties = {};

  for (const key in properties) {
    const value = properties[key];

    if (value !== undefined) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

async function getPosthog() {
  if (!isAnalyticsEnabled()) return null;

  const { default: posthog } = await import('posthog-js');

  return posthog;
}

export async function captureSiteEvent(
  event: string,
  properties?: AnalyticsProperties
) {
  const posthog = await getPosthog();
  if (!posthog) return;

  posthog.capture(event, cleanProperties(properties));
}

export async function identifySiteUser({
  email,
  id,
  name,
}: {
  email?: string | null;
  id: string;
  name?: string | null;
}) {
  const posthog = await getPosthog();
  if (!posthog) return;

  posthog.identify(
    id,
    cleanProperties({
      email,
      name,
    })
  );
}

export async function resetSiteAnalytics() {
  const posthog = await getPosthog();
  if (!posthog) return;

  posthog.reset();
}
