import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, GraduationCap, Users, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementBanner from '../components/AnnouncementBanner';
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
        <AnnouncementBanner
          message="All 2024/2025 GETFund local scholarship beneficiaries who have still not accepted their scholarship awards, are requested to accept their offers by Friday, 27th February, 2026. Failure to do so by the stated deadline, will result in a revocation and forfeiture of the award."
          storageKey="scholarship-acceptance-deadline-2026"
        />

        {/* Page Title Section */}
        <section className="pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero.title}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#064e3b' }} />
          </div>
        </section>

        {/* Programme Overview - Two Column with Image */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#064e3b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image with enhanced styling */}
              <div className="relative group">
                <div className="absolute -inset-4 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30" style={{ backgroundColor: '#064e3b' }} />
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src={content.hero.heroImage || '/images/scholarship/scholarship-programme-hero.jpg'}
                    alt="GETFund Scholarship Programme"
                    className="w-full h-[400px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Text content with accent styling */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full hidden lg:block" style={{ backgroundColor: '#064e3b' }} />
                <div className="lg:pl-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {content.programmeOverview.heading}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#064e3b' }} />
                    <span className="text-sm md:text-base font-semibold" style={{ color: '#064e3b' }}>
                      {content.hero.subtitle}
                    </span>
                  </div>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                    {content.programmeOverview.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Belief - Blue Overlay Section */}
        <section className="py-12 md:py-16" style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)' }}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-center md:text-left">
                <Star className="w-8 h-8 text-white/80 mb-4 mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">Our Core Belief</h3>
                <p className="text-white/90 leading-relaxed text-lg italic">
                  "{content.coreBelief}"
                </p>
              </div>
              <div className="text-center md:text-left">
                <GraduationCap className="w-8 h-8 text-white/80 mb-4 mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  {content.supportProvided.heading}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {content.supportProvided.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Areas & Scope - Split Layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Priority Areas - Left */}
              <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.priorityAreas.heading}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The Fund sets out other areas of priority aligned with the nation's development agenda.
                </p>
                <div className="space-y-6">
                  {content.priorityAreas.items.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#064e3b' }}>
                        {idx === 0 ? <Building className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#064e3b' }}>{area.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

              {/* Scope of Scholarship - Right */}
              <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {content.scopeOfScholarship.heading}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{content.scopeOfScholarship.description}</p>
                <ul className="space-y-3">
                  {content.scopeOfScholarship.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#064e3b' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Programme Statistics - Blue Overlay */}
        <section className="py-12 md:py-16" style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)' }}>
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-white">
              {content.programmeStats.heading}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {content.programmeStats.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden shadow-lg">
                <img src="/images/scholarship/service-details-01.jpg" alt="GETFund Scholarship students" className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="relative group overflow-hidden shadow-lg">
                <img src="/images/scholarship/service-details-02.jpg" alt="GETFund education support" className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="relative group overflow-hidden shadow-lg">
                <img src="/images/scholarship/service-details-03.jpg" alt="GETFund scholars programme" className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="relative group overflow-hidden shadow-lg">
                <img src="/images/scholarship/service-details-04.jpg" alt="GETFund academic facilities" className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
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
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={content.cta.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-8 py-3 font-semibold transition-all duration-300 hover:bg-gray-100"
                  style={{ color: '#064e3b' }}
                >
                  {content.cta.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </a>
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
