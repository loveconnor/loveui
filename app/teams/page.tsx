import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { TeamManagement } from '@/components/teams/team-management';
import { auth } from '@/lib/auth';
import { getProAccessPlan } from '@/lib/pro-access';
import { getTeamAccessForEmail, listTeamMembers } from '@/lib/team-access';

export const metadata: Metadata = {
  title: 'Teams',
  description: 'Manage LoveUI Pro team access.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TeamsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.email) {
    redirect('/login?callbackUrl=%2Fteams');
  }

  const plan = await getProAccessPlan(session.user.email);
  const teamAccess = await getTeamAccessForEmail(session.user.email, plan);

  if (!teamAccess) {
    redirect('/pro#pricing');
  }

  const members = await listTeamMembers(teamAccess.ownerEmail);

  return (
    <main className="bg-background">
      <TeamManagement
        canManage={teamAccess.role === 'owner'}
        initialMembers={members}
        ownerEmail={teamAccess.ownerEmail}
        plan={teamAccess.plan}
      />
    </main>
  );
}
