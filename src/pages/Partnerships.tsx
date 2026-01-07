import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import ContactSection from '../components/ContactSection';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi, Partner } from '../services/cmsApi';

interface PartnershipBenefit {
  title: string;
  description: string;
}


interface PartnershipsContent {
  bannerBackground?: BannerBackground;
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
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch page content and partners in parallel
        const [page, partnersData] = await Promise.all([
          cmsApi.getPageBySlug('partnerships'),
          cmsApi.getPartners()
        ]);

        const section = page?.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as PartnershipsContent);
        }

        setPartners(partnersData);
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
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
        <PageBanner
          title={content.hero?.title || 'Partnerships with GETFund'}
          bannerBackground={content.bannerBackground}
          defaultGradient="#DC143C"
        />

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

        {/* Our Partners */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {content.ourPartners?.heading || 'Our Partners'}
            </h2>

            <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
              {partners.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {partners.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-center">
                      {partner.website_url ? (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors w-full h-24 md:h-28"
                          title={partner.name}
                        >
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </a>
                      ) : (
                        <div
                          className="p-4 rounded-lg bg-gray-50 w-full h-24 md:h-28"
                          title={partner.name}
                        >
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Partner logos will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Support Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.whySupport?.heading}
            </h2>

            <div className="space-y-8">
              {(content.whySupport?.benefits || []).map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg"
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

        {/* Contact Section - HARDCODED COMPONENT */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
