import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, GraduationCap, BookOpen, Users, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';
import { ScholarshipsContent, defaultContent } from '../data/scholarshipsContent';

export default function ScholarshipOverview() {
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
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-16 md:py-24">
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
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
                to="/scholarships/getfund-scholars"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Our Scholars
              </Link>
            </div>
          </div>
        </section>

        {/* Programme Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.programmeOverview.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                <div className="space-y-4">
                  {content.programmeOverview.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <img src="/images/scholarship/service-details-01.jpg" alt="GETFund Scholarship students" className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md" />
                <img src="/images/scholarship/service-details-02.jpg" alt="GETFund education support" className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md" />
                <img src="/images/scholarship/service-details-03.jpg" alt="GETFund scholars programme" className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md" />
                <img src="/images/scholarship/service-details-04.jpg" alt="GETFund academic facilities" className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Belief + Support Provided */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-[#2a3f75] text-white rounded-xl p-8 md:p-12 mb-12 text-center">
              <Star className="w-8 h-8 text-getfund-gold mx-auto mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium italic">
                "{content.coreBelief}"
              </blockquote>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {content.supportProvided.heading}
              </h2>
              <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.supportProvided.description}
              </p>
            </div>
          </div>
        </section>

        {/* Priority Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.priorityAreas.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
            <p className="text-gray-600 mb-8">The Fund sets out other areas of priority aligned with the nation's development agenda.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {content.priorityAreas.items.map((area, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2a3f75] rounded-lg flex items-center justify-center flex-shrink-0">
                      {idx === 0 ? <Building className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{area.title}</h3>
                      <p className="text-gray-600">{area.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programme Statistics */}
        <section className="py-16 bg-[#2a3f75] text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">
              {content.programmeStats.heading}
            </h2>
            <div className="w-12 h-1 bg-getfund-gold mx-auto mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.programmeStats.stats.map((stat, idx) => (
                <div key={idx} className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-bold text-getfund-gold mb-2">{stat.value}</p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scope of Scholarship */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {content.scopeOfScholarship.heading}
            </h2>
            <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
            <p className="text-gray-700 mb-8">{content.scopeOfScholarship.description}</p>
            <div className="space-y-4">
              {content.scopeOfScholarship.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
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
                to="/scholarships/how-to-apply"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                How to Apply
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
