export function getSafeCallbackUrl(callbackUrl: string | null | undefined) {
  if (!callbackUrl) {
    return '/';
  }

  if (!callbackUrl.startsWith('/') || callbackUrl.startsWith('//')) {
    return '/';
  }

  return callbackUrl;
}
