import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface ScholarshipProgrammeContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    heroImage: string;
  };
  overview: {
    heading: string;
    paragraph: string;
  };
  objectives: {
    heading: string;
    items: string[];
  };
  eligibility: {
    heading: string;
    items: string[];
  };
  applicationProcess: {
    heading: string;
    steps: string[];
  };
  importantNotes: {
    heading: string;
    items: string[];
  };
  closingParagraph: string;
}

// Default content when CMS is not available
const defaultContent: ScholarshipProgrammeContent = {
  meta: {
    title: 'GETFund Scholarship Programme | GETFund',
    description: 'Empowering Ghanaian students to achieve their academic dreams through scholarships.',
  },
  hero: {
    title: 'GETFund Scholarship Programme',
    subtitle: 'Empowering Ghanaian students to achieve their academic dreams.',
    heroImage: '/images/scholarship/GETFund-Scholarship-Programme.jpg',
  },
  overview: {
    heading: 'Programme Overview',
    paragraph: 'Since its inception, the GETFund Scholarship Programme has enabled thousands of Ghanaians to access quality higher education. The programme covers tuition, accommodation, and in some cases, stipends for living expenses. Scholarships are awarded based on merit, need, and alignment with national development priorities.',
  },
  objectives: {
    heading: 'Key Objectives',
    items: [
      'Expand access to tertiary education for Ghanaians from all backgrounds.',
      'Support students in fields critical to Ghana\'s socio-economic development.',
      'Promote gender equity and inclusion in higher education.',
      'Develop a skilled workforce to drive national progress.',
    ],
  },
  eligibility: {
    heading: 'Eligibility Criteria',
    items: [
      'Be a Ghanaian citizen with a valid national ID.',
      'Have gained admission to an accredited tertiary institution (local or international).',
      'Demonstrate academic excellence and financial need.',
      'Meet any additional requirements specified in the annual call for applications.',
    ],
  },
  applicationProcess: {
    heading: 'Application Process',
    steps: [
      'Monitor the GETFund website and official channels for the annual scholarship announcement.',
      'Prepare all required documents (admission letter, transcripts, national ID, etc.).',
      'Complete the online application form during the open application window.',
      'Upload supporting documents as specified in the guidelines.',
      'Submit the application before the published deadline.',
    ],
  },
  importantNotes: {
    heading: 'Important Notes',
    items: [
      'Only shortlisted applicants will be contacted for further steps.',
      'Decisions of the GETFund Scholarship Committee are final.',
      'Applicants are encouraged to read all instructions carefully before applying.',
    ],
  },
  closingParagraph: 'For detailed guidelines, application timelines, and frequently asked questions, please visit the Resources page or contact us for assistance.',
};

export default function ScholarshipProgramme() {
  const [content, setContent] = useState<ScholarshipProgrammeContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('scholarship-programme');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content as ScholarshipProgrammeContent });
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
              {content.hero?.title || 'GETFund Scholarship Programme'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Two-column Intro */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The GETFund Scholarship Programme is a flagship initiative designed to provide financial support to Ghanaian students pursuing tertiary education, both locally and internationally.
                </p>
                {content.overview?.paragraph && (
                  <p className="text-gray-600 leading-relaxed">
                    {content.overview?.paragraph}
                  </p>
                )}
              </div>
              <div>
                <img
                  src={content.hero?.heroImage || '/images/scholarship/GETFund-Scholarship-Programme.jpg'}
                  alt="Scholarship Programme"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Objectives */}
        {content.objectives?.items?.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.objectives?.heading || 'Key Objectives'}
                </h2>
                <div className="w-12 h-1" style={{ backgroundColor: '#2a3f75' }} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {content.objectives?.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-5 rounded-lg shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Eligibility & Application Process - Side by Side */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Eligibility */}
              {content.eligibility?.items?.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {content.eligibility?.heading || 'Eligibility Criteria'}
                  </h2>
                  <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#2a3f75' }} />
                  <div className="space-y-4">
                    {content.eligibility?.items?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#2a3f75' }}>
                          {idx + 1}
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application Process */}
              {content.applicationProcess?.steps?.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {content.applicationProcess?.heading || 'Application Process'}
                  </h2>
                  <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#2a3f75' }} />
                  <div className="space-y-4">
                    {content.applicationProcess?.steps?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        {content.importantNotes?.items?.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {content.importantNotes?.heading || 'Important Notes'}
                </h2>
                <ul className="space-y-3">
                  {content.importantNotes?.items?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16" style={{ backgroundColor: '#2a3f75' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {content.closingParagraph || 'For detailed guidelines, application timelines, and frequently asked questions, visit our resources page.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/scholarship-apply"
                className="inline-flex items-center gap-2 bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                style={{ color: '#2a3f75' }}
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View Resources
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
