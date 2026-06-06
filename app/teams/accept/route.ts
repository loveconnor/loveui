import { NextRequest, NextResponse } from 'next/server';
import { acceptTeamInvitation } from '@/lib/team-access';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('callbackUrl', '/teams');

  if (!token) {
    loginUrl.searchParams.set('teamInvite', 'invalid');
    return NextResponse.redirect(loginUrl);
  }

  const result = await acceptTeamInvitation(token);

  if (!result.accepted) {
    loginUrl.searchParams.set('teamInvite', 'invalid');
    return NextResponse.redirect(loginUrl);
  }

  loginUrl.searchParams.set('teamInvite', 'accepted');
  loginUrl.searchParams.set('email', result.email);

  return NextResponse.redirect(loginUrl);
}
