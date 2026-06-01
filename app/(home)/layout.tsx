import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { HomeHeader } from '@/components/home-header';

export default function Layout({ children }: LayoutProps<'/'>) {
  const layoutOptions = baseOptions();

  return (
    <HomeLayout
      {...layoutOptions}
      slots={{ ...layoutOptions.slots, header: HomeHeader }}
    >
      {children}
    </HomeLayout>
  );
}
