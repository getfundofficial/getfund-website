import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, GraduationCap, FileText, Award, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';
import { ScholarshipsContent, FAQItem, defaultContent } from '../data/scholarshipsContent';

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">{item.question}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-4 bg-gray-50">
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-16 md:py-20">
          <div className="absolute inset-0">
            <img
              src={content.hero.heroImage || '/images/scholarship/scholarship-programme-hero.jpg'}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a3f75]/80 to-[#1a2a55]/90" />
          <div className="relative container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10 text-getfund-gold" />
              <span className="text-getfund-gold font-semibold tracking-wide uppercase text-sm">Scholarship Programme</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              How to Apply
            </h1>
            <p className="text-xl text-white max-w-3xl">
              Everything you need to know about applying for a GETFund scholarship.
            </p>
            <div className="mt-8">
              <a
                href={content.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-getfund-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Call for Application Banner */}
        <section className="py-12 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-start gap-4">
              <Award className="w-10 h-10 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {content.callForApplication.heading}
                </h2>
                <p className="text-lg text-amber-800 font-medium mb-3">
                  {content.callForApplication.subheading}
                </p>
                <p className="text-gray-700 mb-4">{content.callForApplication.description}</p>
                <div className="flex flex-wrap gap-6">
                  <div className="bg-white rounded-lg px-5 py-3 border border-amber-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Opening Date</p>
                    <p className="font-semibold text-gray-900">{content.callForApplication.openingDate}</p>
                  </div>
                  <div className="bg-white rounded-lg px-5 py-3 border border-amber-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Closing Date</p>
                    <p className="font-semibold text-red-600">{content.callForApplication.closingDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Procedure */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.applicationProcedure.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {content.applicationProcedure.steps.map((step, idx) => (
                <div key={idx} className="relative bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-[#2a3f75] text-white flex items-center justify-center text-lg font-bold mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Academic Requirements Side by Side */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Eligibility */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {content.eligibilityRequirements.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                <div className="space-y-3">
                  {content.eligibilityRequirements.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-[#2a3f75] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {content.academicRequirements.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                <div className="space-y-3">
                  {content.academicRequirements.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <FileText className="w-5 h-5 text-[#2a3f75] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Documents */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.supportingDocuments.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <div className="grid md:grid-cols-2 gap-4">
              {content.supportingDocuments.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Dispensation */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start gap-4 mb-6">
                <Award className="w-8 h-8 text-[#2a3f75] flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {content.specialDispensation.heading}
                  </h2>
                  <p className="text-gray-600">{content.specialDispensation.description}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {content.specialDispensation.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.applicationSteps.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <div className="flex flex-col md:flex-row gap-4">
              {content.applicationSteps.steps.map((step, idx) => (
                <div key={idx} className="flex-1 relative">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center h-full">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
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
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="flex items-start gap-3 mb-6">
                <AlertTriangle className="w-7 h-7 text-red-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {content.disqualifyingFactors.heading}
                </h2>
              </div>
              <div className="space-y-3">
                {content.disqualifyingFactors.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Funding & Duration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.fundingAndDuration.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <div className="space-y-4">
              {content.fundingAndDuration.items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-1">{item.question}</p>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-7 h-7 text-[#2a3f75]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {content.faqs.heading}
              </h2>
            </div>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <FAQAccordion items={content.faqs.items} />
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                <p className="text-gray-900 font-medium">{content.contactInfo.address}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                <p className="text-gray-900 font-medium">{content.contactInfo.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="text-gray-900 font-medium">{content.contactInfo.email}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Website</p>
                <p className="text-gray-900 font-medium">{content.contactInfo.website}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#2a3f75]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.cta.heading}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={content.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-getfund-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
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
