import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface CommunitySHSContent {
  bannerBackground?: BannerBackground;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  infrastructureIntervention: {
    heading: string;
    paragraph: string;
  };
  educationalMaterials: {
    heading: string;
    paragraph: string;
  };
  policyObjectives: {
    heading: string;
    items: string[];
  };
  impact: {
    heading: string;
    paragraph: string;
  };
  roleOfGETFund: {
    heading: string;
    paragraph: string;
  };
}

// Default content when CMS is not available
const defaultContent: CommunitySHSContent = {
  meta: {
    title: 'Free SHS Intervention Project | GETFund',
    description: 'Supporting the Free Senior High School policy through infrastructure development and educational materials.',
  },
  hero: {
    title: 'Free SHS Intervention Project',
    subtitle: 'Supporting Ghana\'s Free Senior High School Policy Implementation',
  },
  infrastructureIntervention: {
    heading: 'Infrastructure Intervention',
    paragraph: 'The increase in enrollment figures necessitated investment in education infrastructure to support the Free and Quality Education Agenda. The infrastructure gap widened following the increase in secondary school enrollment numbers.',
  },
  educationalMaterials: {
    heading: 'Educational Materials & Supplies',
    paragraph: 'In addition to infrastructure intervention, additional supplies and learning materials were distributed to various schools (e.g. bunk beds, mattresses, teachers\' tables & chairs, common room chairs, mono desks, etc).',
  },
  policyObjectives: {
    heading: 'Policy Objectives',
    items: [
      'Removal of cost barriers',
      'Expansion of infrastructure',
      'Improvement in Quality and Equity',
      'Development of Employable Skills',
    ],
  },
  impact: {
    heading: 'Impact',
    paragraph: 'Government has given full effect to SDG 4.1 with the implementation of a Free SHS Policy. The programme is anchored in the above pillars and has significantly increased access to secondary education in Ghana.',
  },
  roleOfGETFund: {
    heading: 'The Role of GETFund',
    paragraph: 'GETFund provides financial support for infrastructure, educational materials, and supplementary funding to institutions under the Ministry of Education, Scholarship Secretariat, and Student Loan Trust Fund.',
  },
};

export default function CommunitySHSProgramme() {
  const [content, setContent] = useState<CommunitySHSContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('community-shs-programme');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content as CommunitySHSContent });
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
          defaultGradient="linear-gradient(135deg, #1e40af, #3b82f6, #1e3a8a)"
        />

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Infrastructure Intervention */}
              {content.infrastructureIntervention?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded"></span>
                    {content.infrastructureIntervention?.heading}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.infrastructureIntervention?.paragraph}
                  </p>
                </div>
              )}

              {/* Educational Materials */}
              {content.educationalMaterials?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-green-600 rounded"></span>
                    {content.educationalMaterials?.heading}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.educationalMaterials?.paragraph}
                  </p>
                </div>
              )}

              {/* Policy Objectives */}
              {content.policyObjectives?.items?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-purple-600 rounded"></span>
                    {content.policyObjectives?.heading}
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <ul className="space-y-3">
                      {content.policyObjectives?.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Impact */}
              {content.impact?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-yellow-500 rounded"></span>
                    {content.impact?.heading}
                  </h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {content.impact?.paragraph}
                    </p>
                  </div>
                </div>
              )}

              {/* Role of GETFund */}
              {content.roleOfGETFund?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-getfund-primary rounded"></span>
                    {content.roleOfGETFund?.heading}
                  </h2>
                  <div className="bg-getfund-primary/10 border-l-4 border-getfund-primary p-6 rounded-r-xl">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {content.roleOfGETFund?.paragraph}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
