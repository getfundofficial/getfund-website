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
  showViewResourcesButton?: boolean;
}

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
        <section className="pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'GETFund Scholarship Programme'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Two-column Intro with Image */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#2a3f75 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="absolute -inset-4 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30" style={{ backgroundColor: '#2a3f75' }} />
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src={content.hero?.heroImage || '/images/scholarship/GETFund-Scholarship-Programme.jpg'}
                    alt="Scholarship Programme"
                    className="w-full h-[400px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Text content */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full hidden lg:block" style={{ backgroundColor: '#2a3f75' }} />
                <div className="lg:pl-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {content.overview?.heading || 'Programme Overview'}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2a3f75' }} />
                    <span className="text-sm md:text-base font-semibold" style={{ color: '#2a3f75' }}>
                      {content.hero?.subtitle || 'Empowering Ghanaian students'}
                    </span>
                  </div>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                    <p>
                      The GETFund Scholarship Programme is a flagship initiative designed to provide financial support to Ghanaian students pursuing tertiary education, both locally and internationally.
                    </p>
                    {content.overview?.paragraph && (
                      <p>{content.overview.paragraph}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Objectives - Blue Overlay Section */}
        {content.objectives?.items?.length > 0 && (
          <section className="py-12 md:py-16" style={{ backgroundColor: 'rgba(42, 63, 117, 0.85)' }}>
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
                {content.objectives?.heading || 'Key Objectives'}
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {content.objectives?.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-white/80 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 leading-relaxed text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Eligibility & Application Process - Split Layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Eligibility - Left */}
              {content.eligibility?.items?.length > 0 && (
                <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    {content.eligibility?.heading || 'Eligibility Criteria'}
                  </h2>
                  <div className="space-y-4">
                    {content.eligibility?.items?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-7 h-7 flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#2a3f75' }}>
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

              {/* Application Process - Right */}
              {content.applicationProcess?.steps?.length > 0 && (
                <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    {content.applicationProcess?.heading || 'Application Process'}
                  </h2>
                  <ul className="space-y-4">
                    {content.applicationProcess?.steps?.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2a3f75' }} />
                        <span className="text-gray-700 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        {content.importantNotes?.items?.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {content.importantNotes?.heading || 'Important Notes'}
              </h2>
              <ul className="space-y-3">
                {content.importantNotes?.items?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2a3f75' }} />
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Apply?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {content.closingParagraph || 'For detailed guidelines, application timelines, and frequently asked questions, visit our resources page.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/scholarship-apply"
                  className="inline-flex items-center gap-2 bg-white px-8 py-3 font-semibold hover:bg-gray-100 transition-all duration-300"
                  style={{ color: '#2a3f75' }}
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/scholarships/how-to-apply"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  How to Apply
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
