import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getProAccessPlan } from '@/lib/pro-access';
import {
  addTeamMember,
  isTeamPlan,
  isValidTeamEmail,
  listTeamMembers,
  normalizeTeamEmail,
  resendTeamInvitation,
  revokeTeamMember,
} from '@/lib/team-access';

export const runtime = 'nodejs';

async function getTeamSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user.email;

  if (!email) {
    return { error: 'You must be logged in.', status: 401 as const };
  }

  const plan = await getProAccessPlan(email);

  if (!isTeamPlan(plan)) {
    return {
      error: 'A Team or Enterprise plan is required.',
      status: 403 as const,
    };
  }

  return { email, plan, userId: session.user.id };
}

export async function GET() {
  const teamSession = await getTeamSession();

  if ('error' in teamSession) {
    return NextResponse.json(
      { error: teamSession.error },
      { status: teamSession.status }
    );
  }

  const members = await listTeamMembers(teamSession.email);

  return NextResponse.json({
    members,
    plan: teamSession.plan,
  });
}

export async function DELETE(request: Request) {
  const teamSession = await getTeamSession();

  if ('error' in teamSession) {
    return NextResponse.json(
      { error: teamSession.error },
      { status: teamSession.status }
    );
  }

  let email = '';

  try {
    const body = await request.json();
    email = normalizeTeamEmail(String(body?.email || ''));
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  if (email === normalizeTeamEmail(teamSession.email)) {
    return NextResponse.json(
      { error: 'Owner access cannot be revoked here.' },
      { status: 400 }
    );
  }

  const members = await revokeTeamMember({
    memberEmail: email,
    ownerEmail: teamSession.email,
  });

  return NextResponse.json({
    members,
    plan: teamSession.plan,
  });
}

export async function PATCH(request: Request) {
  const teamSession = await getTeamSession();

  if ('error' in teamSession) {
    return NextResponse.json(
      { error: teamSession.error },
      { status: teamSession.status }
    );
  }

  let email = '';
  let action = '';

  try {
    const body = await request.json();
    email = normalizeTeamEmail(String(body?.email || ''));
    action = String(body?.action || '');
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (action !== 'resend-invitation') {
    return NextResponse.json({ error: 'Invalid team action.' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  if (email === normalizeTeamEmail(teamSession.email)) {
    return NextResponse.json(
      { error: 'Owner invitations cannot be resent.' },
      { status: 400 }
    );
  }

  const members = await listTeamMembers(teamSession.email);
  const member = members.find((item) => item.email === email);

  if (!member) {
    return NextResponse.json(
      { error: 'Team member not found.' },
      { status: 404 }
    );
  }

  if (member.status !== 'pending') {
    return NextResponse.json(
      { error: 'Only pending invitations can be resent.' },
      { status: 400 }
    );
  }

  const result = await resendTeamInvitation({
    memberEmail: email,
    ownerEmail: teamSession.email,
  });

  if (!result.sent) {
    return NextResponse.json(
      {
        error: result.error ?? 'Invitation email could not be sent.',
        members: result.members,
        plan: teamSession.plan,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    members: result.members,
    plan: teamSession.plan,
    sent: result.sent,
  });
}

export async function POST(request: Request) {
  const teamSession = await getTeamSession();

  if ('error' in teamSession) {
    return NextResponse.json(
      { error: teamSession.error },
      { status: teamSession.status }
    );
  }

  let email = '';

  try {
    const body = await request.json();
    email = normalizeTeamEmail(String(body?.email || ''));
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  if (!isValidTeamEmail(email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 }
    );
  }

  const result = await addTeamMember({
    addedByUserId: teamSession.userId,
    memberEmail: email,
    ownerEmail: teamSession.email,
    plan: teamSession.plan,
  });

  if (!result.sent) {
    return NextResponse.json(
      {
        error: result.error ?? 'Invitation email could not be sent.',
        members: result.members,
        plan: teamSession.plan,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    members: result.members,
    plan: teamSession.plan,
    sent: result.sent,
  });
}
