import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface ScholarshipProgrammeContent {
  bannerBackground?: BannerBackground;
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

  // Determine if we're using the custom hero image banner or PageBanner
  const useCustomHero = !content.bannerBackground?.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{content.meta?.title}</title>
        <meta name="description" content={content.meta?.description} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {useCustomHero ? (
          // Custom Hero Banner with image
          <section className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] flex items-center justify-center mb-8">
            <OptimizedImage
              src={content.hero?.heroImage || '/images/scholarship/GETFund-Scholarship-Programme.jpg'}
              alt={content.hero?.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0"
              width={1920}
              height={520}
              priority
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <GraduationCap className="w-14 h-14 mb-4 text-getfund-gold drop-shadow-lg" />
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">{content.hero?.title}</h1>
              <p className="text-lg sm:text-xl max-w-2xl drop-shadow">{content.hero?.subtitle}</p>
            </div>
          </section>
        ) : (
          // PageBanner with CMS background
          <PageBanner
            title={content.hero?.title}
            subtitle={content.hero?.subtitle}
            bannerBackground={content.bannerBackground}
            defaultGradient="linear-gradient(to right, #DC143C, #1e3a5f)"
          />
        )}

        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="mb-6 text-lg text-gray-800">
            The GETFund Scholarship Programme is a flagship initiative designed to provide financial support to Ghanaian students pursuing tertiary education, both locally and internationally. The programme aims to bridge the financial gap for brilliant but needy students, empowering them to achieve their academic and professional aspirations.
          </p>

          {/* Programme Overview */}
          {content.overview?.paragraph && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{content.overview?.heading}</h2>
              <p className="mb-4 text-gray-700">
                {content.overview?.paragraph}
              </p>
            </section>
          )}

          {/* Key Objectives */}
          {content.objectives?.items?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{content.objectives?.heading}</h2>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                {content.objectives?.items?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Eligibility Criteria */}
          {content.eligibility?.items?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{content.eligibility?.heading}</h2>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                {content.eligibility?.items?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Application Process */}
          {content.applicationProcess?.steps?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{content.applicationProcess?.heading}</h2>
              <ol className="list-decimal list-inside mb-4 text-gray-700">
                {content.applicationProcess?.steps?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* Important Notes */}
          {content.importantNotes?.items?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{content.importantNotes?.heading}</h2>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                {content.importantNotes?.items?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Closing */}
          {content.closingParagraph && (
            <p className="mt-8 text-gray-800">
              {content.closingParagraph.split('Resources page').length > 1 ? (
                <>
                  For detailed guidelines, application timelines, and frequently asked questions, please visit the{' '}
                  <Link to="/resources" className="text-getfund-primary underline">Resources</Link> page or contact us for assistance.
                </>
              ) : (
                content.closingParagraph
              )}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
