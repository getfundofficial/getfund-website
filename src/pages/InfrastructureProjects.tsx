import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
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
  bannerBackground?: BannerBackground;
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
        <PageBanner
          title={content.hero?.title}
          subtitle={content.hero?.subtitle}
          bannerBackground={content.bannerBackground}
          defaultGradient="#059669"
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <p className="mb-6 text-lg text-gray-800">
            {content.mainIntro?.paragraph}
          </p>

          {/* Project Highlights */}
          {content.projectHighlights?.items?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4">{content.projectHighlights?.heading}</h2>
              <ul className="list-disc list-inside mb-8 text-gray-700">
                {content.projectHighlights?.items?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Recent Projects */}
          {content.recentProjects?.projects?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4">{content.recentProjects?.heading}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {content.recentProjects?.projects?.map((project, idx) => (
                  <div key={idx} className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Mandate Section */}
          {content.mandateSection?.paragraph && (
            <section className="mb-12 mt-12">
              <p className="mb-8 text-gray-700 text-lg">
                {content.mandateSection?.paragraph}
              </p>
            </section>
          )}

          {/* Achievements & Funding Highlights */}
          {(content.achievements?.items?.length > 0 || content.fundingHighlights?.items?.length > 0) && (
            <section className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {content.achievements?.items?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      {content.achievements?.heading}
                    </h3>
                    <ul className="space-y-3">
                      {content.achievements?.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {content.fundingHighlights?.items?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                      {content.fundingHighlights?.heading}
                    </h3>
                    <ul className="space-y-3">
                      {content.fundingHighlights?.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Impact Section */}
          {content.impactSection?.paragraph && (
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-purple-600 rounded-full"></span>
                {content.impactSection?.heading}
              </h3>
              <p className="mb-4 text-gray-700 text-lg">
                {content.impactSection?.paragraph}
              </p>
            </section>
          )}

          {/* Ongoing Commitment */}
          {content.ongoingCommitment?.paragraph && (
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
                {content.ongoingCommitment?.heading}
              </h3>
              <p className="mb-4 text-gray-700 text-lg">
                {content.ongoingCommitment?.paragraph}
              </p>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
