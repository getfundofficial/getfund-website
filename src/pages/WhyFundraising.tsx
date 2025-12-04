import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import ImpactStats from '../components/ImpactStats';
import ContactSection from '../components/ContactSection';
import { cmsApi } from '../services/cmsApi';

interface WhyFundraisingContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaButtonText: string;
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
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const scrollToDonation = () => {
    const element = document.getElementById('donation-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-getfund-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.hero?.title}</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              {content.hero?.subtitle}
            </p>
            <button
              onClick={scrollToDonation}
              className="inline-block bg-getfund-gold text-white px-8 py-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors text-lg"
            >
              {content.hero?.ctaButtonText}
            </button>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.mainContent?.paragraph}
            </p>
          </div>
        </section>

        {/* Impact Stats - CMS-POWERED */}
        <ImpactStats page="why-fundraising" />

        {/* Why Donate Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.whyDonate?.heading}
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{content.whyDonate?.paragraph1}</p>
              <p>{content.whyDonate?.paragraph2}</p>
              <p>{content.whyDonate?.paragraph3}</p>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section id="donation-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              {content.getInvolved?.heading}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              {content.getInvolved?.description}
            </p>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                {content.getInvolved?.donationHeading}
              </h3>
              {/* HARDCODED COMPONENT */}
              <DonationInterface />
            </div>
          </div>
        </section>

        {/* Contact Section - HARDCODED COMPONENT */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
