import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import ImpactStats from '../components/ImpactStats';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';


interface WhyFundraisingContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  mainContent: {
    paragraph: string;
  };
  whyDonate: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  getInvolved: {
    heading: string;
    description: string;
    donationHeading: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export default function WhyFundraising() {
  const [content, setContent] = useState<WhyFundraisingContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('why-fundraising');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as WhyFundraisingContent);
        }
      } catch {
        // Keep loading state false to show error
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Content not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta?.title || 'Why Fundraising? | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'Your support helps us expand access to quality education'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Page Title Section - Clean, minimal */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Why Fundraising?'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Featured Image Section - CMS Editable */}
        {content.featuredImage?.url && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={content.featuredImage.url}
                  alt={content.featuredImage.alt || 'Why Fundraising'}
                  className="w-full h-auto object-cover"
                />
                {content.featuredImage.caption && (
                  <p className="text-sm text-gray-500 text-center py-3 bg-gray-50">
                    {content.featuredImage.caption}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.mainContent?.paragraph}
            </p>
          </div>
        </section>

        {/* Impact Stats - CMS-POWERED */}
        <section className="py-12" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <ImpactStats page="why-fundraising" variant="light" />
          </div>
        </section>

        {/* Why Donate & Get Involved - Two Column */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Why Donate - Left */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {content.whyDonate?.heading || 'Why Donate to Us?'}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {content.whyDonate?.paragraph1 && <p>{content.whyDonate.paragraph1}</p>}
                  {content.whyDonate?.paragraph2 && <p>{content.whyDonate.paragraph2}</p>}
                  {content.whyDonate?.paragraph3 && <p>{content.whyDonate.paragraph3}</p>}
                </div>
              </div>

              {/* Get Involved - Right */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {content.getInvolved?.heading || 'Get Involved'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {content.getInvolved?.description}
                </p>
                <DonationInterface />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
}
