import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import OptimizedImage from '../components/OptimizedImage';
import { cmsApi } from '../services/cmsApi';

interface SupportArea {
  heading: string;
  items: string[];
}

interface SupportProgram {
  title: string;
  description: string;
  subItems?: { title: string; description: string }[];
}

interface ImpactMetric {
  value: string;
  label: string;
}

interface EducationSectorSupportContent {
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
    heading: string;
    paragraph: string;
  };
  supportAreas: SupportArea[];
  supportPrograms: SupportProgram[];
  impactMetrics: {
    heading: string;
    metrics: ImpactMetric[];
  };
}

// Default content when CMS is not available
const defaultContent: EducationSectorSupportContent = {
  meta: {
    title: 'Education Sector Support | GETFund',
    description: 'Supporting initiatives that improve education quality and learning outcomes in Ghana.',
  },
  hero: {
    title: 'Education Sector Support',
    subtitle: 'Supporting initiatives that improve education quality and learning outcomes',
  },
  mainContent: {
    heading: 'Comprehensive Education Support',
    paragraph: 'GETFund provides comprehensive support to Ghana\'s education sector through various initiatives designed to improve the quality of education delivery and enhance learning outcomes at all levels of education.',
  },
  supportAreas: [
    {
      heading: 'Financial Support',
      items: [
        'Institutional funding assistance',
        'Scholarship Secretariat support',
        'Student Loan Trust Fund backing',
        'Emergency educational funding',
      ],
    },
    {
      heading: 'Capacity Building',
      items: [
        'Faculty training programs',
        'Research grants through NCTE',
        'Professional development initiatives',
        'Educational leadership programs',
      ],
    },
  ],
  supportPrograms: [
    {
      title: 'Ministry of Education Support',
      description: 'Direct financial assistance to institutions under the Ministry of Education to enhance their operational capacity and educational delivery.',
      subItems: [
        { title: 'Basic Education', description: 'Supporting primary and junior high schools' },
        { title: 'Secondary Education', description: 'Enhancing senior high school programs' },
        { title: 'Tertiary Education', description: 'Supporting universities and colleges' },
      ],
    },
    {
      title: 'NCTE Research Grants',
      description: 'Providing grants through the National Council for Tertiary Education (NCTE) for faculty member training and research initiatives.',
    },
  ],
  impactMetrics: {
    heading: 'Impact Metrics',
    metrics: [
      { value: '200+', label: 'Institutions supported annually' },
      { value: '1,500+', label: 'Faculty members trained' },
      { value: '₵500M+', label: 'Annual support provided' },
    ],
  },
};

export default function EducationSectorSupport() {
  const [content, setContent] = useState<EducationSectorSupportContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('education-sector-support');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content as EducationSectorSupportContent });
          }
        }
      } catch (error) {
        console.error('Failed to load page content from CMS:', error);
        // Keep using default content
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta?.title}</title>
        <meta name="description" content={content.meta?.description} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <PageBanner
          title={content.hero?.title}
          subtitle={content.hero?.subtitle}
          bannerBackground={content.bannerBackground}
          defaultGradient="linear-gradient(135deg, #059669, #047857, #065f46)"
        />

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.mainContent?.heading}</h2>

                <p className="text-lg text-gray-700 mb-8">
                  {content.mainContent?.paragraph}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <OptimizedImage
                      src="/images/scholarships/corporate-image.jpg"
                      alt="Education Sector Support"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-3">Institutional Support</h3>
                    <p className="text-gray-600">
                      Providing financial and technical support to educational institutions
                      under the Ministry of Education.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <OptimizedImage
                      src="/images/scholarships/student.jpg"
                      alt="Student Support Programs"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-3">Student Support</h3>
                    <p className="text-gray-600">
                      Supporting the Student Loan Trust Fund and providing supplementary
                      funding for student financial assistance.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Support Areas</h3>

                {content.supportAreas?.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {content.supportAreas?.map((area, idx) => (
                      <div key={idx} className="bg-green-50 p-6 rounded-lg border-l-4 border-getfund-primary">
                        <h4 className="font-bold text-lg mb-3 text-getfund-primary">{area.heading}</h4>
                        <ul className="text-gray-700 space-y-2">
                          {area.items?.map((item, itemIdx) => (
                            <li key={itemIdx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Support Programs</h3>

                {content.supportPrograms?.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {content.supportPrograms?.map((program, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-getfund-primary">
                        <h4 className="text-xl font-bold text-getfund-primary mb-3">{program.title}</h4>
                        <p className="text-gray-700 mb-4">
                          {program.description}
                        </p>
                        {program.subItems && program.subItems.length > 0 && (
                          <div className="grid md:grid-cols-3 gap-4">
                            {program.subItems.map((subItem, subIdx) => (
                              <div key={subIdx} className="bg-green-50 p-4 rounded-lg">
                                <h5 className="font-semibold mb-2">{subItem.title}</h5>
                                <p className="text-sm text-gray-600">{subItem.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Impact Metrics */}
                {content.impactMetrics?.metrics?.length > 0 && (
                  <div className="bg-getfund-primary/10 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.impactMetrics?.heading}</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {content.impactMetrics?.metrics?.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <h4 className="text-3xl font-bold text-getfund-primary mb-2">{metric.value}</h4>
                          <p className="text-gray-700">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
