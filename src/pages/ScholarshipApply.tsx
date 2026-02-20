import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{content.meta?.title || 'Apply for Scholarship | GETFund'}</title>
        <meta name="description" content={content.meta?.description || 'Apply for GETFund scholarship'} />
      </Helmet>

      <Header />
      <Breadcrumb />

      {/* Hero Banner with Cover Image */}
      <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-12 md:py-16">
        <div className="absolute inset-0">
          <img
            src={content.hero?.heroImage || '/images/scholarship/scholarship-cover.jpg'}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a3f75]/80 to-[#1a2a55]/90" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-10 h-10 text-getfund-gold" />
            <span className="text-getfund-gold font-semibold tracking-wide uppercase text-sm">Scholarship Application</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {content.hero?.title || 'Apply for GETFund Scholarship'}
          </h1>
          {content.hero?.subtitle && (
            <p className="text-lg text-white/80 max-w-3xl">
              {content.hero.subtitle}
            </p>
          )}
        </div>
      </section>

      <main className="flex-1">
        <section className="py-12" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Required Documents */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2a3f75' }}>
                {content.requiredDocuments?.heading || 'Required Documents'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {(content.requiredDocuments?.items || defaultContent.requiredDocuments?.items || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2a3f75' }}>
                {content.howToApply?.heading || 'How to Apply'}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {(content.howToApply?.steps || defaultContent.howToApply?.steps || []).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Apply Button */}
            <div className="text-center">
              <a
                href={content.applyButton?.url || 'https://scholarships.getfund.gov.gh/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{ backgroundColor: '#2a3f75' }}
              >
                {content.applyButton?.text || 'Start Application'}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Footer Note */}
            <p className="mt-8 text-gray-600 text-center text-sm">
              {content.footerNote || defaultContent.footerNote}
              {' '}
              <a href="/resources" className="underline" style={{ color: '#2a3f75' }}>Resources</a>
              {' '}page or{' '}
              <a href="/contact" className="underline" style={{ color: '#2a3f75' }}>contact us</a>
              {' '}for assistance.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
