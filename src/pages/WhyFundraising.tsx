import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import DonationInterface from '../components/DonationInterface';
import ImpactStats from '../components/ImpactStats';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';
import { Shield, Heart, Users } from 'lucide-react';


interface WhyFundraisingContent {
  bannerBackground?: BannerBackground;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
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
        <PageBanner
          title={content.hero?.title || 'Why Fundraising?'}
          subtitle={content.hero?.subtitle || 'Your support helps us expand access to quality education'}
          bannerBackground={content.bannerBackground}
          defaultGradient="#DC143C"
        />

        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.mainContent?.paragraph}
            </p>
          </div>
        </section>

        {/* Impact Stats - CMS-POWERED */}
        <ImpactStats page="why-fundraising" />

        {/* Two Column Section: Why Donate & Get Involved */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Why Donate - Give with Confidence */}
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-getfund-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-getfund-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {content.whyDonate?.heading || 'Why Donate to Us?'}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {content.whyDonate?.paragraph1 && <p>{content.whyDonate.paragraph1}</p>}
                  {content.whyDonate?.paragraph2 && <p>{content.whyDonate.paragraph2}</p>}
                  {content.whyDonate?.paragraph3 && <p>{content.whyDonate.paragraph3}</p>}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-getfund-primary" />
                    <span>Transparent</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-getfund-gold" />
                    <span>Impactful</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>Community-driven</span>
                  </div>
                </div>
              </div>

              {/* Vertical Divider - visible on lg screens */}
              <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-200" />

              {/* Get Involved */}
              <div className="bg-getfund-secondary rounded-xl p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {content.getInvolved?.heading || 'Get Involved'}
                </h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  {content.getInvolved?.description}
                </p>
                <h3 className="text-xl font-semibold mb-4">
                  {content.getInvolved?.donationHeading || 'Make a Donation'}
                </h3>
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
