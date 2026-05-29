import { LandingCta } from '@/components/landing/landing-cta';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHero } from '@/components/landing/landing-hero';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <LandingHero />
      <LandingFeatures />
      <LandingCta />
      <LandingFooter />
    </main>
  );
}
