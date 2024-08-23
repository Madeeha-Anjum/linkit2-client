import dynamic from 'next/dynamic';

import Banner from '@/components/Banner';
import PageSection from '@/components/PageSection';
import ShortenLinkForm from '@/components/ShortenLinkForm';

const ShortenedLink = dynamic(() => import('@/components/ShortenedLink'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col justify-center min-h-screen space-y-12">
        <PageSection>
          <Banner />
        </PageSection>
        <PageSection>
          <ShortenLinkForm />
        </PageSection>
        <PageSection>
          <ShortenedLink />
        </PageSection>
        <div className="h-20"></div>
      </div>
    </main>
  );
}
