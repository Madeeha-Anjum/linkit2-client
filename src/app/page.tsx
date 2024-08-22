import Banner from '@/components/Banner';
import LinkHistory from '@/components/LinkHistory';
import PageSection from '@/components/PageSection';
import ShortenLinkForm from '@/components/ShortenLinkForm';

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
        <div className="h-20"></div>
      </div>
      <div className="min-h-screen bg-white">
        <PageSection className="py-20">
          <LinkHistory />
        </PageSection>
      </div>
    </main>
  );
}
