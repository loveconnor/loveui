'use client';

import * as React from 'react';

export function AnalyticsProvider() {
  const previousUserIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    let isActive = true;

    const syncAnalytics = async () => {
      const [{ authClient }, analytics] = await Promise.all([
        import('@/lib/auth-client'),
        import('@/lib/analytics'),
      ]);

      if (!isActive) return;

      const { data: session } = await authClient.getSession();
      const user = session?.user;

      if (!isActive) return;

      if (user?.id) {
        analytics.identifySiteUser({
          id: user.id,
          email: user.email,
          name: user.name,
        });
        previousUserIdRef.current = user.id;
        return;
      }

      if (previousUserIdRef.current) {
        analytics.resetSiteAnalytics();
        previousUserIdRef.current = null;
      }
    };

    const idleId =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(() => {
            syncAnalytics().catch(() => {});
          })
        : globalThis.setTimeout(() => {
            syncAnalytics().catch(() => {});
          }, 1500);

    return () => {
      isActive = false;

      if ('cancelIdleCallback' in window && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId);
      }
    };
  }, []);

  return null;
}
