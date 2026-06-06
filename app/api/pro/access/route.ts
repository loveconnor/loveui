import { NextResponse } from 'next/server';
import { getProAccessPlan } from '@/lib/pro-access';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let email = '';

  try {
    const body = await request.json();
    email = String(body?.email || '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const plan = await getProAccessPlan(email);

  if (!plan) {
    return NextResponse.json(
      { error: 'That email does not have LoveUI Pro access.' },
      { status: 403 }
    );
  }

  return NextResponse.json({ hasAccess: true, plan });
}
