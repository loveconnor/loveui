'use client';

import * as React from 'react';

import { identifySiteUser, resetSiteAnalytics } from '@/lib/analytics';
import { authClient } from '@/lib/auth-client';

export function AnalyticsProvider() {
  const { data: session, isPending } = authClient.useSession();
  const previousUserIdRef = React.useRef<string | null>(null);
  const user = session?.user;

  React.useEffect(() => {
    if (isPending) return;

    if (user?.id) {
      identifySiteUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      previousUserIdRef.current = user.id;
      return;
    }

    if (previousUserIdRef.current) {
      resetSiteAnalytics();
      previousUserIdRef.current = null;
    }
  }, [isPending, user?.email, user?.id, user?.name]);

  return null;
}
