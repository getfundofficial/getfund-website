import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Globe, Building, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi, Partner } from '../services/cmsApi';

export default function PartnerUniversities() {
  const [universityPartners, setUniversityPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cmsApi.getPartners('university').then(partners => {
      setUniversityPartners(partners.filter(p => p.category === 'university'));
    }).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Group partners by country (stored in description field)
  const groups = universityPartners.reduce<Record<string, Partner[]>>((acc, p) => {
    const country = p.description || 'Other';
    if (!acc[country]) acc[country] = [];
    acc[country].push(p);
    return acc;
  }, {});
  const countryOrder = ['UK', 'USA'];
  const sortedCountries = Object.keys(groups).sort((a, b) => {
    const ai = countryOrder.indexOf(a);
    const bi = countryOrder.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Partner Universities | GETFund Scholarships</title>
        <meta name="description" content="GETFund partner universities across the UK and USA providing world-class education for Ghanaian scholars." />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-16 md:py-20">
          <div className="absolute inset-0">
            <img
              src="/images/scholarship/GETFund-Scholarship-Programme.jpg"
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
              Partner Universities
            </h1>
            <p className="text-xl text-white max-w-3xl">
              GETFund has established partnerships with internationally recognized universities to provide world-class education for Ghanaian scholars.
            </p>
          </div>
        </section>

        {universityPartners.length > 0 ? (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#2a3f75]/10 text-[#2a3f75] px-4 py-1.5 text-sm font-medium mb-4">
                  <Globe className="w-4 h-4" />
                  International Partnerships
                </div>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Our scholars study at some of the world's most prestigious institutions, gaining skills and knowledge to drive Ghana's development.
                </p>
              </div>

              {/* Summary Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2 bg-white px-5 py-3 border border-gray-200">
                  <Building className="w-5 h-5 text-[#2a3f75]" />
                  <span className="text-2xl font-bold text-[#2a3f75]">{universityPartners.length}</span>
                  <span className="text-gray-600 text-sm">Partner Universities</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-5 py-3 border border-gray-200">
                  <Globe className="w-5 h-5 text-getfund-gold" />
                  <span className="text-2xl font-bold text-[#2a3f75]">{sortedCountries.length}</span>
                  <span className="text-gray-600 text-sm">Countries</span>
                </div>
              </div>

              {/* University Groups by Country */}
              {sortedCountries.map((country) => (
                <div key={country} className="mb-10 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {country === 'UK' ? 'United Kingdom' : country === 'USA' ? 'United States of America' : country}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {groups[country].length} {groups[country].length === 1 ? 'institution' : 'institutions'}
                      </p>
                    </div>
                  </div>

                  <div className={`grid gap-3 ${
                    groups[country].length <= 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                  }`}>
                    {groups[country].map((uni) => {
                      const CardWrapper = uni.website_url ? 'a' : 'div';
                      const linkProps = uni.website_url
                        ? { href: uni.website_url, target: '_blank' as const, rel: 'noopener noreferrer' }
                        : {};
                      return (
                        <CardWrapper
                          key={uni.id}
                          {...linkProps}
                          className={`group flex flex-col items-center gap-3 bg-white p-4 border border-gray-200 hover:border-[#2a3f75]/30 hover:shadow-md transition-all ${uni.website_url ? 'cursor-pointer' : ''}`}
                        >
                          <div className="w-full h-12 flex items-center justify-center">
                            <img
                              src={uni.logo_url}
                              alt={`${uni.name} logo`}
                              className="max-h-12 max-w-full object-contain"
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-[#2a3f75] transition-colors">
                            {uni.name}
                          </span>
                          {uni.website_url && (
                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#2a3f75] transition-colors" />
                          )}
                        </CardWrapper>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Partner Universities</h2>
              <p className="text-gray-500">Partner university information will be available soon.</p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
