import { createHash, randomBytes } from 'node:crypto';
import { db } from '@/lib/db';
import {
  getLoveUIAppUrl,
  renderLoveUITeamInvitationEmail,
} from '@/lib/loveui-email';
import {
  ensureProUser,
  grantProAccess,
  revokeTeamGrantedProAccess,
} from '@/lib/pro-access';
import { normalizeProPlanKey, type ProPlanKey } from '@/lib/pro-plans';

export type TeamMember = {
  email: string;
  plan: ProPlanKey;
  status: 'accepted' | 'pending';
  addedAt: string;
};

let teamMembersTablePromise: Promise<void> | null = null;

function ensureTeamMembersTable() {
  teamMembersTablePromise ??= db.query(`
    create table if not exists pro_team_members (
      id text primary key default gen_random_uuid()::text,
      owner_email text not null,
      member_email text not null,
      plan text not null,
      added_by_user_id text,
      created_at timestamptz not null default current_timestamp,
      updated_at timestamptz not null default current_timestamp,
      unique (owner_email, member_email)
    );

    alter table pro_team_members
      add column if not exists status text not null default 'pending';

    alter table pro_team_members
      add column if not exists invitation_token_hash text;

    alter table pro_team_members
      add column if not exists invitation_sent_at timestamptz;

    alter table pro_team_members
      add column if not exists accepted_at timestamptz;

    create index if not exists pro_team_members_owner_email_idx
      on pro_team_members (owner_email);

    create index if not exists pro_team_members_invitation_token_hash_idx
      on pro_team_members (invitation_token_hash);

    update pro_team_members
    set status = 'accepted',
        accepted_at = coalesce(pro_team_members.accepted_at, now())
    from pro_access
    where pro_access.email = pro_team_members.member_email
      and pro_access.status = 'active'
      and pro_team_members.status = 'pending'
      and pro_team_members.invitation_token_hash is null;
  `).then(() => undefined);

  return teamMembersTablePromise;
}

export function normalizeTeamEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isTeamPlan(
  plan: ProPlanKey | null | undefined
): plan is Extract<ProPlanKey, 'team' | 'enterprise'> {
  return plan === 'team' || plan === 'enterprise';
}

export function isValidTeamEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function listTeamMembers(ownerEmail: string) {
  await ensureTeamMembersTable();

  const result = await db.query<{
    member_email: string;
    plan: ProPlanKey;
    status: 'accepted' | 'pending';
    created_at: Date;
  }>(
    `
      select
        pro_team_members.member_email,
        pro_team_members.plan,
        pro_team_members.status,
        pro_team_members.created_at
      from pro_team_members
      where pro_team_members.owner_email = $1
      order by pro_team_members.created_at asc
    `,
    [normalizeTeamEmail(ownerEmail)]
  );

  return result.rows.map((row): TeamMember => ({
    email: row.member_email,
    plan: normalizeProPlanKey(row.plan),
    status: row.status === 'accepted' ? 'accepted' : 'pending',
    addedAt: row.created_at.toISOString(),
  }));
}

export async function addTeamMember({
  addedByUserId,
  memberEmail,
  ownerEmail,
  plan,
}: {
  addedByUserId?: string | null;
  memberEmail: string;
  ownerEmail: string;
  plan: Extract<ProPlanKey, 'team' | 'enterprise'>;
}) {
  await ensureTeamMembersTable();

  const normalizedOwnerEmail = normalizeTeamEmail(ownerEmail);
  const normalizedMemberEmail = normalizeTeamEmail(memberEmail);
  const invitationToken = createInvitationToken();
  const invitationTokenHash = hashInvitationToken(invitationToken);

  await db.query(
    `
      insert into pro_team_members (
        owner_email,
        member_email,
        plan,
        added_by_user_id,
        status,
        invitation_token_hash,
        invitation_sent_at,
        updated_at
      )
      values ($1, $2, $3, $4, 'pending', $5, now(), now())
      on conflict (owner_email, member_email)
      do update set
        plan = excluded.plan,
        added_by_user_id = coalesce(excluded.added_by_user_id, pro_team_members.added_by_user_id),
        status = 'pending',
        invitation_token_hash = excluded.invitation_token_hash,
        invitation_sent_at = now(),
        updated_at = now()
    `,
    [
      normalizedOwnerEmail,
      normalizedMemberEmail,
      plan,
      addedByUserId ?? null,
      invitationTokenHash,
    ]
  );

  const sent = await trySendTeamInvitationEmail({
    invitationToken,
    memberEmail: normalizedMemberEmail,
    ownerEmail: normalizedOwnerEmail,
  });

  return {
    members: await listTeamMembers(normalizedOwnerEmail),
    sent,
    error: sent ? null : 'Invitation email is not configured.',
  };
}

export async function revokeTeamMember({
  memberEmail,
  ownerEmail,
}: {
  memberEmail: string;
  ownerEmail: string;
}) {
  await ensureTeamMembersTable();

  const normalizedOwnerEmail = normalizeTeamEmail(ownerEmail);
  const normalizedMemberEmail = normalizeTeamEmail(memberEmail);

  await db.query(
    `
      delete from pro_team_members
      where owner_email = $1
        and member_email = $2
    `,
    [normalizedOwnerEmail, normalizedMemberEmail]
  );

  await revokeTeamGrantedProAccess(normalizedMemberEmail);

  return listTeamMembers(normalizedOwnerEmail);
}

export async function resendTeamInvitation({
  memberEmail,
  ownerEmail,
}: {
  memberEmail: string;
  ownerEmail: string;
}) {
  await ensureTeamMembersTable();

  const normalizedOwnerEmail = normalizeTeamEmail(ownerEmail);
  const normalizedMemberEmail = normalizeTeamEmail(memberEmail);
  const invitationToken = createInvitationToken();
  const invitationTokenHash = hashInvitationToken(invitationToken);

  const result = await db.query<{ member_email: string }>(
    `
      update pro_team_members
      set invitation_token_hash = $3,
          invitation_sent_at = now(),
          updated_at = now()
      where owner_email = $1
        and member_email = $2
        and status = 'pending'
      returning member_email
    `,
    [normalizedOwnerEmail, normalizedMemberEmail, invitationTokenHash]
  );

  if (!result.rows[0]) {
    return {
      members: await listTeamMembers(normalizedOwnerEmail),
      sent: false,
      error: 'Team member not found.',
    };
  }

  const sent = await trySendTeamInvitationEmail({
    invitationToken,
    memberEmail: normalizedMemberEmail,
    ownerEmail: normalizedOwnerEmail,
  });

  return {
    members: await listTeamMembers(normalizedOwnerEmail),
    sent,
    error: sent ? null : 'Invitation email is not configured.',
  };
}

export async function acceptTeamInvitation(token: string) {
  await ensureTeamMembersTable();

  const tokenHash = hashInvitationToken(token);

  const result = await db.query<{
    member_email: string;
    owner_email: string;
    plan: ProPlanKey;
  }>(
    `
      update pro_team_members
      set status = 'accepted',
          accepted_at = now(),
          invitation_token_hash = null,
          updated_at = now()
      where invitation_token_hash = $1
        and status = 'pending'
      returning member_email, owner_email, plan
    `,
    [tokenHash]
  );

  const invitation = result.rows[0];

  if (!invitation) {
    return { accepted: false as const };
  }

  const plan = normalizeProPlanKey(invitation.plan);

  await grantProAccess({
    email: invitation.member_email,
    plan,
    userId: null,
  });
  await ensureProUser(invitation.member_email);

  return {
    accepted: true as const,
    email: invitation.member_email,
    ownerEmail: invitation.owner_email,
    plan,
  };
}

async function sendTeamInvitationEmail({
  invitationToken,
  memberEmail,
  ownerEmail,
}: {
  invitationToken: string;
  memberEmail: string;
  ownerEmail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return false;
  }

  const invitationUrl = `${getLoveUIAppUrl()}/teams/accept?token=${encodeURIComponent(invitationToken)}`;
  const emailContent = renderLoveUITeamInvitationEmail({
    invitationUrl,
    memberEmail,
    ownerEmail,
  });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: memberEmail,
      ...emailContent,
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to send team invitation email.');
  }

  return true;
}

async function trySendTeamInvitationEmail(
  input: Parameters<typeof sendTeamInvitationEmail>[0]
) {
  try {
    return await sendTeamInvitationEmail(input);
  } catch (error) {
    console.error('Unable to send LoveUI Pro team invitation email.', error);
    return false;
  }
}

function createInvitationToken() {
  return randomBytes(32).toString('base64url');
}

function hashInvitationToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}
