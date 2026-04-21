import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';


interface BeneficiariesGiveBackContent {
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
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
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
        <title>{content.meta?.title || 'GETFund Beneficiaries - Give Back | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'To All GETFund Beneficiaries – Give Back, Build Forward'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Page Title Section - Clean, minimal */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'GETFund Beneficiaries'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#064e3b' }} />
          </div>
        </section>

        {/* Featured Image Section - CMS Editable */}
        {content.featuredImage?.url && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={content.featuredImage.url}
                  alt={content.featuredImage.alt || 'GETFund Beneficiaries'}
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
        <section className="py-20" style={{ backgroundColor: 'rgba(6, 78, 59, 0.03)' }}>
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
                className="inline-block px-12 py-4 rounded-md font-semibold transition-colors text-lg shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#f59e0b', color: '#052e16' }}
              >
                {content.mainContent?.ctaButtonText || 'Make a Donation'}
              </Link>
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
