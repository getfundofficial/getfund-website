import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, FileText, Award, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { cmsApi } from '../services/cmsApi';
import { ScholarshipsContent, FAQItem, defaultContent } from '../data/scholarshipsContent';

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">{item.question}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: '#064e3b' }} />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed pt-3">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ScholarshipHowToApply() {
  const [content, setContent] = useState<ScholarshipsContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('scholarships');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent(prev => ({ ...prev, ...section.content as ScholarshipsContent }));
          }
        }
      } catch (error) {
        console.error('Failed to load scholarships content from CMS:', error);
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
        <title>How to Apply | GETFund Scholarships</title>
        <meta name="description" content="Learn how to apply for GETFund scholarships - eligibility requirements, application procedure, required documents, and FAQs." />
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
              How to Apply
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#064e3b' }} />
            <p className="text-gray-600 mt-4 max-w-3xl">
              Everything you need to know about applying for a GETFund scholarship.
            </p>
          </div>
        </section>

        {/* Call for Application */}
        <section className="py-12 md:py-16" style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)' }}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2">
                <Award className="w-8 h-8 text-white/80 mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {content.callForApplication.heading}
                </h2>
                <p className="text-white/90 leading-relaxed text-lg mb-2">
                  {content.callForApplication.subheading}
                </p>
                <p className="text-white/80 leading-relaxed">{content.callForApplication.description}</p>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-4">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Opening Date</p>
                  <p className="font-semibold text-white text-lg">{content.callForApplication.openingDate}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-4">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Closing Date</p>
                  <p className="font-semibold text-white text-lg">{content.callForApplication.closingDate}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Procedure */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#064e3b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.applicationProcedure.heading}
            </h2>
            <div className="w-16 h-1 mb-10" style={{ backgroundColor: '#064e3b' }} />
            <div className="grid md:grid-cols-3 gap-8">
              {content.applicationProcedure.steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -inset-2 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-10" style={{ backgroundColor: '#064e3b' }} />
                  <div className="relative bg-gray-50 p-6 border border-gray-200 transition-shadow duration-300 group-hover:shadow-lg">
                    <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white mb-4" style={{ backgroundColor: '#064e3b' }}>
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Academic Requirements - Split Layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Eligibility - Left */}
              <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.eligibilityRequirements.heading}
                </h2>
                <div className="space-y-4">
                  {content.eligibilityRequirements.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#064e3b' }}>
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

              {/* Academic Requirements - Right */}
              <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.academicRequirements.heading}
                </h2>
                <div className="space-y-4">
                  {content.academicRequirements.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 list-none">
                      <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#064e3b' }} />
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Documents & Special Dispensation - Split Layout */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Supporting Documents - Left */}
              <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.supportingDocuments.heading}
                </h2>
                <ul className="space-y-3">
                  {content.supportingDocuments.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#064e3b' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

              {/* Special Dispensation - Right */}
              <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {content.specialDispensation.heading}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{content.specialDispensation.description}</p>
                <ul className="space-y-3">
                  {content.specialDispensation.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#064e3b' }} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.applicationSteps.heading}
            </h2>
            <div className="w-16 h-1 mb-10" style={{ backgroundColor: '#064e3b' }} />
            <div className="flex flex-col md:flex-row gap-4">
              {content.applicationSteps.steps.map((step, idx) => (
                <div key={idx} className="flex-1 relative">
                  <div className="bg-gray-50 border border-gray-200 p-5 text-center h-full">
                    <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white mx-auto mb-3" style={{ backgroundColor: '#064e3b' }}>
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 font-medium text-sm">{step}</p>
                  </div>
                  {idx < content.applicationSteps.steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disqualifying Factors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="w-7 h-7 text-red-500 flex-shrink-0" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {content.disqualifyingFactors.heading}
              </h2>
            </div>
            <ul className="space-y-3">
              {content.disqualifyingFactors.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Funding & Duration */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.fundingAndDuration.heading}
            </h2>
            <div className="w-16 h-1 mb-10" style={{ backgroundColor: '#064e3b' }} />
            <div className="space-y-6">
              {content.fundingAndDuration.items.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#064e3b' }}>{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-7 h-7" style={{ color: '#064e3b' }} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {content.faqs.heading}
              </h2>
            </div>
            <div className="w-16 h-1 mb-8" style={{ backgroundColor: '#064e3b' }} />
            <FAQAccordion items={content.faqs.items} />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {content.cta.heading}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {content.cta.description}
              </p>
              <a
                href={content.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-8 py-3 font-semibold hover:bg-gray-100 transition-all duration-300"
                style={{ color: '#064e3b' }}
              >
                {content.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
