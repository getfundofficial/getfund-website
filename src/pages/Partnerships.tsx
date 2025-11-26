import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ContactSection from '../components/ContactSection';
import { cmsApi } from '../services/cmsApi';

interface PartnershipBenefit {
  title: string;
  description: string;
}

interface PartnershipsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  intro: {
    paragraph: string;
  };
  waysToPartner: {
    heading: string;
    ways: string[];
  };
  whySupport: {
    heading: string;
    benefits: PartnershipBenefit[];
  };
  ourPartners: {
    heading: string;
    description: string;
  };
}

export default function Partnerships() {
  const [content, setContent] = useState<PartnershipsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('partnerships');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as PartnershipsContent);
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
        <title>{content.meta?.title || 'Partnerships | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'Partner with GETFund to transform education in Ghana'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */>
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              {content.hero?.title}
            </h1>
          </div>
        </section>

        {/* Intro Paragraph */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.intro?.paragraph}
            </p>
          </div>
        </section>

        {/* Ways to Partner */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {content.waysToPartner?.heading}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(content.waysToPartner?.ways || []).map((way, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <p className="text-lg font-semibold text-gray-900">{way}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Support Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.whySupport?.heading}
            </h2>

            <div className="space-y-8">
              {(content.whySupport?.benefits || []).map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-getfund-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {content.ourPartners?.heading}
            </h2>

            <div className="bg-white p-12 rounded-lg shadow-md">
              <p className="text-center text-gray-600">
                {content.ourPartners?.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {/* Placeholder for partner logos */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400">Partner {i}</span>
                  </div>
                ))}
              </div>
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
