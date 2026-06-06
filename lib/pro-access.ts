import { db } from '@/lib/db';
import { normalizeProPlanKey, type ProPlanKey } from '@/lib/pro-plans';

export type GrantProAccessInput = {
  email: string;
  plan?: ProPlanKey | null;
  userId?: string | null;
  stripeCustomerId?: string | null;
  stripeCheckoutSessionId?: string | null;
  stripePaymentIntentId?: string | null;
};

let proAccessPlanColumnPromise: Promise<void> | null = null;

function ensureProAccessPlanColumn() {
  proAccessPlanColumnPromise ??= db.query(`
    alter table pro_access
    add column if not exists plan text not null default 'individual'
  `).then(() => undefined);

  return proAccessPlanColumnPromise;
}

export async function grantProAccess({
  email,
  plan,
  userId,
  stripeCustomerId,
  stripeCheckoutSessionId,
  stripePaymentIntentId,
}: GrantProAccessInput) {
  await ensureProAccessPlanColumn();

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPlan = plan ? normalizeProPlanKey(plan) : null;

  console.info('Granting LoveUI Pro access.', {
    email: normalizedEmail,
    plan: normalizedPlan,
    hasUserId: Boolean(userId),
    stripeCheckoutSessionId,
  });

  await db.query(
    `
      insert into pro_access (
        email,
        plan,
        user_id,
        stripe_customer_id,
        stripe_checkout_session_id,
        stripe_payment_intent_id,
        status,
        granted_at,
        updated_at
      )
      values ($1, coalesce($2, 'individual'), $3, $4, $5, $6, 'active', now(), now())
      on conflict (email)
      do update set
        plan = coalesce($2, pro_access.plan),
        user_id = coalesce(excluded.user_id, pro_access.user_id),
        stripe_customer_id = coalesce(excluded.stripe_customer_id, pro_access.stripe_customer_id),
        stripe_checkout_session_id = coalesce(excluded.stripe_checkout_session_id, pro_access.stripe_checkout_session_id),
        stripe_payment_intent_id = coalesce(excluded.stripe_payment_intent_id, pro_access.stripe_payment_intent_id),
        status = 'active',
        updated_at = now()
    `,
    [
      normalizedEmail,
      normalizedPlan,
      userId || null,
      stripeCustomerId || null,
      stripeCheckoutSessionId || null,
      stripePaymentIntentId || null,
    ]
  );
}

export async function ensureProUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const name = normalizedEmail.split('@')[0] || 'LoveUI Pro';

  console.info('Ensuring Better Auth user for LoveUI Pro access.', {
    email: normalizedEmail,
  });

  await db.query(
    `
      insert into "user" (
        id,
        name,
        email,
        "emailVerified",
        image,
        "createdAt",
        "updatedAt"
      )
      values (gen_random_uuid()::text, $1, $2, true, null, now(), now())
      on conflict (email)
      do update set
        "emailVerified" = true,
        "updatedAt" = now()
    `,
    [name, normalizedEmail]
  );
}

export async function getProAccessPlan(email: string | null | undefined) {
  if (!email) {
    return null;
  }

  await ensureProAccessPlanColumn();

  const result = await db.query<{ plan: string | null }>(
    `
      select plan
      from pro_access
      where email = $1
        and status = 'active'
      limit 1
    `,
    [email.trim().toLowerCase()]
  );

  const plan = result.rows[0]?.plan;

  if (!plan) {
    return null;
  }

  return normalizeProPlanKey(plan);
}

export async function hasProAccess(email: string | null | undefined) {
  return Boolean(await getProAccessPlan(email));
}

export async function revokeTeamGrantedProAccess(email: string) {
  await ensureProAccessPlanColumn();

  await db.query(
    `
      update pro_access
      set status = 'revoked',
          updated_at = now()
      where email = $1
        and stripe_checkout_session_id is null
    `,
    [email.trim().toLowerCase()]
  );
}
