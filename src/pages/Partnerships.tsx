import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi, Partner } from '../services/cmsApi';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, BookOpen, Laptop, HandHeart, Users, Briefcase, Heart, ArrowRight } from 'lucide-react';

// Helper function to get icon based on partnership type
function getPartnershipIcon(way: string) {
  const lowerWay = way.toLowerCase();
  if (lowerWay.includes('infrastructure') || lowerWay.includes('building')) return <Building2 className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('scholarship') || lowerWay.includes('student')) return <GraduationCap className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('book') || lowerWay.includes('library') || lowerWay.includes('resource')) return <BookOpen className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('technology') || lowerWay.includes('digital') || lowerWay.includes('computer')) return <Laptop className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('volunteer') || lowerWay.includes('community')) return <Users className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('corporate') || lowerWay.includes('business')) return <Briefcase className="w-8 h-8 text-getfund-primary" />;
  if (lowerWay.includes('donat') || lowerWay.includes('fund')) return <Heart className="w-8 h-8 text-getfund-primary" />;
  return <HandHeart className="w-8 h-8 text-getfund-primary" />; // default
}

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
    image?: string;
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
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
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
        <title>{content.meta?.title || 'Partnerships | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'Partner with GETFund to transform education in Ghana'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Page Title Section - Clean, minimal */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Partnerships'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Two-column Intro Section */}
        <section className="py-12" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content - Left */}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {content.intro?.paragraph || 'GETFund partners with organizations, institutions, and individuals who share our commitment to transforming education in Ghana. Through strategic partnerships, we can expand our reach and impact, ensuring every Ghanaian child has access to quality education.'}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're a corporate entity, non-profit organization, or individual donor, there are numerous ways to collaborate with us in building a brighter future for Ghana's youth.
                </p>
              </div>
              {/* Image - Right */}
              <div className="relative">
                <img
                  src={content.intro?.image || '/images/hero/main-slider-3.jpg'}
                  alt="Partnership at GETFund"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Partners */}
        <section className="py-16" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {content.ourPartners?.heading || 'Our Partners'}
              </h2>
              <div className="w-12 h-1" style={{ backgroundColor: '#2a3f75' }} />
            </div>

            {partners.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-center h-20 md:h-24">
                    {partner.website_url ? (
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full hover:opacity-80 transition-opacity duration-300"
                        title={partner.name}
                      >
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full" title={partner.name}>
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
        </section>

        {/* Ways to Partner & Benefits - Side by Side */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Ways to Partner - Left */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.waysToPartner?.heading || 'Ways to Partner'}
                </h2>
                <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#2a3f75' }} />
                <div className="grid grid-cols-2 gap-4">
                  {(content.waysToPartner?.ways || ['Infrastructure Funding', 'Scholarship Support', 'Technology Donations', 'Volunteer Programs']).map((way, index) => (
                    <Link
                      key={index}
                      to="/fundraising/ways-to-donate"
                      className="bg-white p-4 rounded-lg text-center flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      {getPartnershipIcon(way)}
                      <p className="text-sm font-semibold text-gray-900">{way}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Benefits of Partnership - Right */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.whySupport?.heading || 'Benefits of Partnership'}
                </h2>
                <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#2a3f75' }} />
                <div className="space-y-4">
                  {(content.whySupport?.benefits || [
                    { title: 'Tax Benefits', description: 'Enjoy tax deductions for your contributions to education.' },
                    { title: 'Brand Visibility', description: 'Gain recognition through our publications and events.' },
                    { title: 'Impact Reports', description: 'Receive detailed reports on how your support creates change.' }
                  ]).map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
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
