import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, TrendingUp, Target } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface ProjectCard {
  title: string;
  description: string;
}

interface Achievement {
  text: string;
}

interface FundingHighlight {
  text: string;
}

interface InfrastructureProjectsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  mainIntro: {
    paragraph: string;
  };
  projectHighlights: {
    heading: string;
    items: string[];
  };
  recentProjects: {
    heading: string;
    projects: ProjectCard[];
  };
  mandateSection: {
    paragraph: string;
  };
  achievements: {
    heading: string;
    items: Achievement[];
  };
  fundingHighlights: {
    heading: string;
    items: FundingHighlight[];
  };
  impactSection: {
    heading: string;
    paragraph: string;
  };
  ongoingCommitment: {
    heading: string;
    paragraph: string;
  };
}

// Default content when CMS is not available
const defaultContent: InfrastructureProjectsContent = {
  meta: {
    title: 'Infrastructure Projects | GETFund',
    description: "GETFund's infrastructure investments have transformed the educational landscape of Ghana.",
  },
  hero: {
    title: 'Infrastructure Projects',
    subtitle: "GETFund's infrastructure investments have transformed the educational landscape of Ghana.",
  },
  mainIntro: {
    paragraph: "GETFund's infrastructure investments have transformed the educational landscape of Ghana. We build, rehabilitate, and equip schools and tertiary institutions to provide safe, modern, and inspiring spaces for learning and growth.",
  },
  projectHighlights: {
    heading: 'Project Highlights',
    items: [
      'Construction of classroom blocks, dormitories, libraries, science and ICT laboratories.',
      'Modern school infrastructure in both urban and rural communities.',
      'Special focus on underserved, remote, and disadvantaged areas.',
      'Collaboration with government, local authorities, and development partners.',
    ],
  },
  recentProjects: {
    heading: 'Recent Projects',
    projects: [
      {
        title: 'Community Day Senior High Schools',
        description: 'Newly constructed classroom blocks, dormitories, and science labs to expand access to secondary education, especially in rural communities.',
      },
      {
        title: 'Basic Education Infrastructure',
        description: 'Rehabilitation and equipping of basic schools with modern facilities, furniture, and teaching/learning materials.',
      },
      {
        title: 'Tertiary Institution Upgrades',
        description: 'Expansion and modernization of lecture halls, libraries, and laboratories in universities and colleges across Ghana.',
      },
      {
        title: 'Inclusive Facilities',
        description: 'Provision of disability-friendly infrastructure and resources to promote inclusive education for all learners.',
      },
    ],
  },
  mandateSection: {
    paragraph: "Since its inception, the core mandate of GETFund, per its enabling Act of parliament in 2000 (Act 581), has been to provide funding to supplement government effort for the provision of educational infrastructure and facilities within the public sector from the pre-tertiary to the tertiary level. In its efforts to discharge this important mandate, GETFund has chalked many successes and made significant contributions towards supporting education service delivery in the country.",
  },
  achievements: {
    heading: 'Key Achievements',
    items: [
      { text: 'Expansion and improvement of academic facilities at tertiary, technical, and health institutions' },
      { text: 'Construction of lecture theatres, libraries, laboratories, and hostel facilities' },
      { text: 'Renovation of existing hostels and provision of essential laboratory equipment' },
      { text: 'Significant infrastructural improvements at institutions like University of Cape Coast (UCC)' },
    ],
  },
  fundingHighlights: {
    heading: 'Funding Highlights',
    items: [
      { text: 'In 2004, over 74% of total allocations were directed toward tertiary infrastructure' },
      { text: 'In 2018, Parliament approved GHC 924.8 million for disbursement, with 37.48% allocated to tertiary education' },
      { text: 'In 2019, GHC 1.2 billion was approved, with tertiary education receiving the largest share of 26.4%' },
    ],
  },
  impactSection: {
    heading: 'Impact',
    paragraph: "GETFund's investments have enhanced the learning environment and strengthened Ghana's capacity to train a new generation of skilled professionals. The Fund remains committed to ensuring that every Ghanaian learner has access to quality tertiary education in a modern, well-resourced academic environment.",
  },
  ongoingCommitment: {
    heading: 'Ongoing Commitment',
    paragraph: "Through sustained investments, GETFund continues to play a transformative role in Ghana's higher education landscape, ensuring access and quality for all.",
  },
};

export default function InfrastructureProjects() {
  const [content, setContent] = useState<InfrastructureProjectsContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('infrastructure-projects');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content as InfrastructureProjectsContent });
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
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Infrastructure Projects'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {content.mainIntro?.paragraph}
                </p>
                {content.mandateSection?.paragraph && (
                  <p className="text-gray-600 leading-relaxed">
                    {content.mandateSection?.paragraph}
                  </p>
                )}
              </div>
              <div>
                <img
                  src="/images/infrastructure/school-building.jpg"
                  alt="Infrastructure Project"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Highlights */}
        {content.projectHighlights?.items?.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.projectHighlights?.heading || 'Project Highlights'}
                </h2>
                <div className="w-12 h-1 bg-green-600" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {content.projectHighlights?.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-5 rounded-lg shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Projects */}
        {content.recentProjects?.projects?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.recentProjects?.heading || 'Recent Projects'}
                </h2>
                <div className="w-12 h-1 bg-green-600" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.recentProjects?.projects?.map((project, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-white/80" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Achievements & Funding - Side by Side */}
        {(content.achievements?.items?.length > 0 || content.fundingHighlights?.items?.length > 0) && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Achievements */}
                {content.achievements?.items?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {content.achievements?.heading || 'Key Achievements'}
                      </h2>
                    </div>
                    <div className="w-12 h-1 mb-6 ml-8" style={{ backgroundColor: '#2a3f75' }} />
                    <div className="space-y-4">
                      {content.achievements?.items?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Funding Highlights */}
                {content.fundingHighlights?.items?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {content.fundingHighlights?.heading || 'Funding Highlights'}
                      </h2>
                    </div>
                    <div className="w-12 h-1 bg-green-600 mb-6 ml-8" />
                    <div className="space-y-4">
                      {content.fundingHighlights?.items?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-gray-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Impact & Commitment */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.impactSection?.heading || 'Our Impact'}
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              {content.impactSection?.paragraph || "GETFund's investments have enhanced the learning environment and strengthened Ghana's capacity to train a new generation of skilled professionals."}
            </p>
            {content.ongoingCommitment?.paragraph && (
              <p className="text-green-100 max-w-2xl mx-auto">
                {content.ongoingCommitment?.paragraph}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
