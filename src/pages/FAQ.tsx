import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  meta?: {
    title: string;
    description: string;
  };
  hero?: {
    title: string;
    subtitle?: string;
  };
  faqs?: FAQItem[];
  contactCta?: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What is GETFund?',
    answer: 'GETFund (Ghana Education Trust Fund) is a public trust established by the Government of Ghana to provide dedicated funding to support the development and improvement of education infrastructure, scholarships, and educational resources at all levels in Ghana.'
  },
  {
    question: 'How do I apply for a GETFund scholarship?',
    answer: 'Visit the Scholarship Application page for step-by-step instructions, eligibility criteria, and a list of required documents. Applications are accepted only during the official application window announced each year.'
  },
  {
    question: 'Who is eligible for GETFund support?',
    answer: 'Eligibility varies by programme, but generally applicants must be Ghanaian citizens, have gained admission to an accredited institution, demonstrate academic excellence, and show financial need.'
  },
  {
    question: 'What documents are required for scholarship applications?',
    answer: 'Required documents typically include an admission letter, academic transcripts, national ID, and any other documents specified in the application guidelines for the relevant year.'
  },
  {
    question: 'How are scholarship recipients selected?',
    answer: 'Recipients are selected based on merit, need, and alignment with national development priorities. The process is competitive and transparent, and only shortlisted applicants are contacted.'
  },
  {
    question: 'How can I contact GETFund for more information?',
    answer: 'Visit the Contact page for our address, email, phone number, and office hours, or use the contact form to send us a message.'
  }
];

const defaultContent: FAQContent = {
  meta: {
    title: 'FAQ | GETFund',
    description: 'Frequently asked questions about GETFund scholarships, programmes, and services.'
  },
  hero: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about GETFund'
  },
  faqs: defaultFAQs,
  contactCta: {
    text: "Can't find the answer you're looking for?",
    buttonText: 'Contact Us',
    buttonLink: '/contact'
  }
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [content, setContent] = useState<FAQContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('faq');
        if (response?.sections) {
          const section = response.sections.find(
            (s: any) => s.section_type === 'page_content' && s.is_active
          );
          if (section?.content) {
            setContent({ ...defaultContent, ...section.content });
          }
        }
      } catch (error) {
        console.error('Failed to fetch FAQ content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const faqs = content.faqs || defaultFAQs;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta?.title || 'FAQ | GETFund'}</title>
        <meta name="description" content={content.meta?.description || 'Frequently asked questions about GETFund'} />
      </Helmet>

      <Header />
      <Breadcrumb />
      <main className="flex-1">
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Frequently Asked Questions'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            {content.hero?.subtitle && (
              <p className="text-gray-600 mt-4 max-w-3xl">
                {content.hero.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                {content.contactCta?.text || "Can't find the answer you're looking for?"}
              </p>
              <a
                href={content.contactCta?.buttonLink || '/contact'}
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: '#2a3f75' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e2d54'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a3f75'}
              >
                {content.contactCta?.buttonText || 'Contact Us'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}