import dynamic from 'next/dynamic';

import Banner from '@/components/Banner';
import PageSection from '@/components/PageSection';
import ShortenLinkForm from '@/components/ShortenLinkForm';

const ShortenedLinks = dynamic(() => import('@/components/ShortenedLinks'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="">
      <section className="mt-40 space-y-12">
        <PageSection>
          <Banner />
        </PageSection>
        <PageSection>
          <ShortenLinkForm />
        </PageSection>
      </section>
      <PageSection className="mt-20">
        <ShortenedLinks />
      </PageSection>
    </main>
  );
}
