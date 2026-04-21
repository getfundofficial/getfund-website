import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { cmsApi } from '../services/cmsApi';

interface ScholarshipApplyContent {
  meta?: {
    title: string;
    description: string;
  };
  hero?: {
    title: string;
    subtitle?: string;
    heroImage?: string;
  };
  requiredDocuments?: {
    heading: string;
    items: string[];
  };
  howToApply?: {
    heading: string;
    steps: string[];
  };
  applyButton?: {
    text: string;
    url: string;
  };
  footerNote?: string;
}

const defaultContent: ScholarshipApplyContent = {
  meta: {
    title: 'Apply for Scholarship | GETFund',
    description: 'Apply for GETFund scholarship - review eligibility criteria and guidelines before submitting your application.'
  },
  hero: {
    title: 'Apply for GETFund Scholarship',
    subtitle: 'Please review the eligibility criteria and guidelines before submitting your application.'
  },
  requiredDocuments: {
    heading: 'Required Documents',
    items: [
      'Completed online application form',
      'Admission letter from an accredited tertiary institution',
      'Academic transcripts and certificates',
      'National ID (Ghana Card, Passport, etc.)',
      'Proof of financial need (if applicable)',
      'Any other documents specified in the application guidelines'
    ]
  },
  howToApply: {
    heading: 'How to Apply',
    steps: [
      'Fill out the online application form during the open application window.',
      'Upload all required documents as specified.',
      'Submit your application before the published deadline.'
    ]
  },
  applyButton: {
    text: 'Start Application',
    url: 'https://scholarships.getfund.gov.gh/'
  },
  footerNote: 'For more information on the application process, eligibility, and deadlines, please refer to the Resources page or contact us for assistance.'
};

export default function ScholarshipApply() {
  const [content, setContent] = useState<ScholarshipApplyContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('scholarship-apply');
        if (response?.sections) {
          const section = response.sections.find(
            (s: any) => s.section_type === 'page_content' && s.is_active
          );
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content });
          }
        }
      } catch (error) {
        console.error('Failed to fetch scholarship apply content:', error);
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
        <title>{content.meta?.title || 'Apply for Scholarship | GETFund'}</title>
        <meta name="description" content={content.meta?.description || 'Apply for GETFund scholarship'} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <AnnouncementBanner
          message="All 2024/2025 GETFund local scholarship beneficiaries who have still not accepted their scholarship awards, are requested to accept their offers by Friday, 27th February, 2026. Failure to do so by the stated deadline, will result in a revocation and forfeiture of the award."
          storageKey="scholarship-acceptance-deadline-2026"
        />

        {/* Page Title Section */}
        <section className="pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Apply for GETFund Scholarship'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#064e3b' }} />
            {content.hero?.subtitle && (
              <p className="text-gray-600 mt-4 max-w-3xl">
                {content.hero.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Required Documents & How to Apply - Split Layout */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#064e3b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="container mx-auto px-4 relative">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Required Documents - Left */}
              <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.requiredDocuments?.heading || 'Required Documents'}
                </h2>
                <ul className="space-y-4">
                  {(content.requiredDocuments?.items || defaultContent.requiredDocuments?.items || []).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#064e3b' }} />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

              {/* How to Apply - Right */}
              <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.howToApply?.heading || 'How to Apply'}
                </h2>
                <div className="space-y-6">
                  {(content.howToApply?.steps || defaultContent.howToApply?.steps || []).map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#064e3b' }}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Start Your Application?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {content.footerNote || defaultContent.footerNote}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={content.applyButton?.url || 'https://scholarships.getfund.gov.gh/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-10 py-4 font-semibold text-lg transition-all duration-300 hover:bg-gray-100 shadow-lg"
                  style={{ color: '#064e3b' }}
                >
                  {content.applyButton?.text || 'Start Application'}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-white/70">
                <Link to="/resources" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Resources <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Contact Us <ArrowRight className="w-4 h-4" />
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
