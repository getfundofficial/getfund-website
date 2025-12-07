import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import ContactSection from '../components/ContactSection';
import { cmsApi } from '../services/cmsApi';


interface BeneficiariesGiveBackContent {
  bannerBackground?: BannerBackground;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  mainContent: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    ctaButtonText: string;
  };
}

export default function BeneficiariesGiveBack() {
  const [content, setContent] = useState<BeneficiariesGiveBackContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('beneficiaries-give-back');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as BeneficiariesGiveBackContent);
        }
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

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
        <title>{content.meta?.title || 'GETFund Beneficiaries - Give Back | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'To All GETFund Beneficiaries – Give Back, Build Forward'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <PageBanner
          title={content.hero?.title || 'GETFund Beneficiaries'}
          bannerBackground={content.bannerBackground}
          defaultGradient="linear-gradient(to right, #DC143C, #2563EB)"
        />

        {/* Main Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {content.mainContent?.heading}
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>{content.mainContent?.paragraph1}</p>
              <p>{content.mainContent?.paragraph2}</p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                to="/fundraising/ways-to-donate"
                className="inline-block bg-getfund-gold text-white px-12 py-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors text-lg"
              >
                {content.mainContent?.ctaButtonText || 'Make a Donation'}
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
