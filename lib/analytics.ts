'use client';

import posthog from 'posthog-js';

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
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}

export function captureSiteEvent(
  event: string,
  properties?: AnalyticsProperties
) {
  if (!isAnalyticsEnabled()) return;

  posthog.capture(event, cleanProperties(properties));
}

export function identifySiteUser({
  email,
  id,
  name,
}: {
  email?: string | null;
  id: string;
  name?: string | null;
}) {
  if (!isAnalyticsEnabled()) return;

  posthog.identify(
    id,
    cleanProperties({
      email,
      name,
    })
  );
}

export function resetSiteAnalytics() {
  if (!isAnalyticsEnabled()) return;

  posthog.reset();
}
