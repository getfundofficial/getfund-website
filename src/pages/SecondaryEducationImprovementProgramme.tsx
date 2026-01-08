import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface ImpactMetric {
  value: string;
  label: string;
}

interface SEIPContent {
  bannerBackground?: BannerBackground;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  overview: {
    heading: string;
    paragraph: string;
  };
  objectives: {
    heading: string;
    items: string[];
  };
  keyComponents: {
    heading: string;
    items: { title: string; description: string }[];
  };
  implementation: {
    heading: string;
    paragraph: string;
  };
  impactMetrics: {
    heading: string;
    metrics: ImpactMetric[];
  };
  achievements: {
    heading: string;
    items: string[];
  };
  futureOutlook: {
    heading: string;
    paragraph: string;
  };
}

// Default content when CMS is not available
const defaultContent: SEIPContent = {
  meta: {
    title: 'Secondary Education Improvement Programme | GETFund',
    description: 'Enhancing the quality and accessibility of secondary education across Ghana through strategic investments and reforms.',
  },
  hero: {
    title: 'Secondary Education Improvement Programme',
    subtitle: 'Transforming secondary education through strategic investments and quality improvements',
  },
  overview: {
    heading: 'Programme Overview',
    paragraph: 'The Secondary Education Improvement Programme (SEIP) is a comprehensive initiative designed to enhance the quality and accessibility of secondary education across Ghana. Through strategic investments in infrastructure, teacher development, and curriculum enhancement, SEIP aims to prepare students for higher education and the workforce.',
  },
  objectives: {
    heading: 'Programme Objectives',
    items: [
      'Improve access to quality secondary education for all Ghanaian students',
      'Enhance teaching and learning outcomes through modern pedagogical approaches',
      'Strengthen school infrastructure and learning facilities',
      'Develop relevant curricula aligned with 21st-century skills',
      'Promote equity and inclusion in secondary education',
    ],
  },
  keyComponents: {
    heading: 'Key Components',
    items: [
      {
        title: 'Infrastructure Development',
        description: 'Construction and rehabilitation of classrooms, laboratories, libraries, and dormitories to create conducive learning environments.',
      },
      {
        title: 'Teacher Training & Development',
        description: 'Continuous professional development programs for teachers to enhance pedagogical skills and subject matter expertise.',
      },
      {
        title: 'Curriculum Enhancement',
        description: 'Updating curricula to incorporate STEM education, ICT skills, and critical thinking competencies.',
      },
      {
        title: 'Learning Resources',
        description: 'Provision of textbooks, digital learning materials, and laboratory equipment to support effective teaching and learning.',
      },
    ],
  },
  implementation: {
    heading: 'Implementation Strategy',
    paragraph: 'SEIP is implemented through a collaborative approach involving the Ministry of Education, Ghana Education Service, GETFund, and development partners. The programme operates across all 16 regions of Ghana, with priority given to underserved communities and schools with the greatest need.',
  },
  impactMetrics: {
    heading: 'Programme Impact',
    metrics: [
      { value: '500+', label: 'Schools Improved' },
      { value: '50,000+', label: 'Students Benefited' },
      { value: '5,000+', label: 'Teachers Trained' },
      { value: '16', label: 'Regions Covered' },
    ],
  },
  achievements: {
    heading: 'Key Achievements',
    items: [
      'Improved pass rates in WASSCE examinations across participating schools',
      'Increased enrollment in science and mathematics courses',
      'Enhanced teacher retention rates in rural areas',
      'Successful integration of ICT in teaching and learning',
      'Establishment of model secondary schools in each region',
    ],
  },
  futureOutlook: {
    heading: 'Future Outlook',
    paragraph: 'Building on the successes achieved, SEIP continues to evolve with emerging educational needs. Future phases will focus on expanding digital learning infrastructure, strengthening career guidance services, and establishing partnerships with industries to enhance practical skills development.',
  },
};

export default function SecondaryEducationImprovementProgramme() {
  const [content, setContent] = useState<SEIPContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('secondary-education-improvement-programme');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content as SEIPContent });
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
          defaultGradient="#7c3aed"
        />

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Overview */}
              {content.overview?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-purple-600 rounded"></span>
                    {content.overview?.heading}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.overview?.paragraph}
                  </p>
                </div>
              )}

              {/* Objectives */}
              {content.objectives?.items?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 rounded" style={{ backgroundColor: '#2a3f75' }}></span>
                    {content.objectives?.heading}
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <ul className="space-y-3">
                      {content.objectives?.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Key Components */}
              {content.keyComponents?.items?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-green-600 rounded"></span>
                    {content.keyComponents?.heading}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {content.keyComponents?.items?.map((item, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Implementation */}
              {content.implementation?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-yellow-500 rounded"></span>
                    {content.implementation?.heading}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.implementation?.paragraph}
                  </p>
                </div>
              )}

              {/* Impact Metrics */}
              {content.impactMetrics?.metrics?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-purple-600 rounded"></span>
                    {content.impactMetrics?.heading}
                  </h2>
                  <div className="bg-purple-600 p-8 rounded-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {content.impactMetrics?.metrics?.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-purple-200 text-sm">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements */}
              {content.achievements?.items?.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-getfund-primary rounded"></span>
                    {content.achievements?.heading}
                  </h2>
                  <div className="bg-getfund-primary/10 p-6 rounded-xl">
                    <ul className="space-y-3">
                      {content.achievements?.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-getfund-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Future Outlook */}
              {content.futureOutlook?.paragraph && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded"></span>
                    {content.futureOutlook?.heading}
                  </h2>
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {content.futureOutlook?.paragraph}
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
