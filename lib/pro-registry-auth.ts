import { timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

type CheckoutVerificationResponse = {
  active?: boolean;
  valid?: boolean;
  ok?: boolean;
};

const splitTokens = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

function timingSafeTokenEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.byteLength !== rightBuffer.byteLength) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function getRequestToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";
  const bearerMatch = authorization.match(/^Bearer\s+(.+)$/i);
  const bearerToken = bearerMatch?.[1]?.trim();

  return (
    bearerToken ||
    request.headers.get("x-api-key")?.trim() ||
    null
  );
}

async function verifyWithCheckoutService(token: string) {
  const verifyUrl = process.env.LOVEUI_PRO_AUTH_URL?.trim();
  if (!verifyUrl) return false;

  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ token }),
    cache: "no-store",
  });

  if (!response.ok) return false;

  const result = (await response.json().catch(() => null)) as CheckoutVerificationResponse | null;
  return Boolean(result?.active ?? result?.valid ?? result?.ok);
}

export async function isProRegistryRequestAuthorized(request: NextRequest) {
  const token = getRequestToken(request);
  if (!token) return false;

  const configuredTokens = [
    ...splitTokens(process.env.LOVEUI_PRO_API_KEYS),
    ...splitTokens(process.env.LOVEUI_PRO_TOKENS),
  ];

  if (configuredTokens.some((candidate) => timingSafeTokenEquals(token, candidate))) {
    return true;
  }

  return verifyWithCheckoutService(token);
}
