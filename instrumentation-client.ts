import posthog from 'posthog-js';

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const localHostnamePattern =
  /^(localhost|0\.0\.0\.0|127(?:\.\d{1,3}){0,3}|\[?::1\]?|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}|.*\.local)$/i;

function canCaptureAnalytics() {
  if (!posthogToken || process.env.NODE_ENV !== 'production') return false;
  if (typeof window === 'undefined') return false;

  return !localHostnamePattern.test(window.location.hostname);
}

if (canCaptureAnalytics()) {
  posthog.init(posthogToken!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_INGEST_PATH ?? '/_lui',
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? 'https://us.posthog.com',
    defaults: '2026-01-30',
    capture_pageview: 'history_change',
    capture_pageleave: 'if_capture_pageview',
    autocapture: true,
    rageclick: true,
    capture_dead_clicks: true,
    capture_exceptions: true,
    capture_performance: {
      network_timing: true,
      web_vitals: true,
      web_vitals_attribution: true,
    },
    mask_personal_data_properties: true,
    custom_personal_data_properties: [
      'callbackUrl',
      'checkout_session_id',
      'email',
      'key',
      'name',
      'secret',
      'session_id',
      'token',
    ],
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-private]',
    },
  });
}
