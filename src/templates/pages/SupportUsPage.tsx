import React from 'react';
import { Heart, Building2, Users, Mail, Phone, ExternalLink } from 'lucide-react';

interface SupportUsPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    // Hero Section
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaText?: string;
    heroCtaLink?: string;

    // Impact Stats Section
    impactTitle?: string;
    impactSubtitle?: string;
    stats?: Array<{
      number: string;
      label: string;
      icon?: string;
    }>;

    // GETFund Act Section
    actTitle?: string;
    actIntro?: string;
    legalFoundationTitle?: string;
    legalFoundationText?: string;
    fundingMechanismTitle?: string;
    fundingMechanismText?: string;
    constitutionalMandate?: string;

    // Ways to Support Section
    waysToSupportTitle?: string;
    waysToSupportSubtitle?: string;
    supportOptions?: Array<{
      title: string;
      description: string;
      ctaText?: string;
      ctaLink?: string;
      icon?: string;
    }>;

    // Scholarship Section
    scholarshipTitle?: string;
    scholarshipSubtitle?: string;
    scholarshipTypes?: Array<{
      title: string;
      description: string;
    }>;
    scholarshipAmount?: string;
    scholarshipAmountText?: string;
    scholarshipCtaText?: string;
    scholarshipCtaLink?: string;

    // Final CTA Section
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    ctaSecondaryText?: string;
    ctaSecondaryLink?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
}

export const SupportUsPage: React.FC<SupportUsPageProps> = ({ pageData, content }) => {
  // Icon mapping for stats
  const getStatIcon = (iconName?: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-8 h-8" />;
      case 'building':
        return <Building2 className="w-8 h-8" />;
      case 'heart':
        return <Heart className="w-8 h-8" />;
      default:
        return <Heart className="w-8 h-8" />;
    }
  };

  // Icon mapping for support options
  const getSupportIcon = (iconName?: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-12 h-12 text-red-600" />;
      case 'building':
        return <Building2 className="w-12 h-12 text-blue-600" />;
      case 'users':
        return <Users className="w-12 h-12 text-green-600" />;
      default:
        return <Heart className="w-12 h-12 text-red-600" />;
    }
  };

  return (
    <div className="support-us-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {content.heroTitle || "Support Ghana's Educational Future"}
            </h1>
            <p className="text-xl mb-8 text-green-100">
              {content.heroSubtitle || "Join us in transforming lives through education. Every contribution helps build a brighter tomorrow for Ghanaian students."}
            </p>
            {content.heroCtaText && (
              <a
                href={content.heroCtaLink || 'https://donate.getfund.gov.gh/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {content.heroCtaText}
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.impactTitle || 'Our Impact by Numbers'}
            </h2>
            {content.impactSubtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.impactSubtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(content.stats || [
              { number: '500,000+', label: 'Students Reached', icon: 'users' },
              { number: '2,500+', label: 'Schools Supported', icon: 'building' },
              { number: '15,000+', label: 'Scholarship Recipients', icon: 'heart' }
            ]).map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 text-green-700">
                  {getStatIcon(stat.icon)}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-getfund-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GETFund Act Section */}
      {content.actTitle && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                {content.actTitle}
              </h2>
              {content.actIntro && (
                <p className="text-lg text-gray-700 mb-12 text-center">
                  {content.actIntro}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Legal Foundation */}
                {content.legalFoundationTitle && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {content.legalFoundationTitle}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {content.legalFoundationText}
                    </p>
                  </div>
                )}

                {/* Funding Mechanism */}
                {content.fundingMechanismTitle && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {content.fundingMechanismTitle}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {content.fundingMechanismText}
                    </p>
                  </div>
                )}
              </div>

              {/* Constitutional Mandate */}
              {content.constitutionalMandate && (
                <div className="mt-8 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Constitutional Mandate</h3>
                  <p className="text-gray-700 italic leading-relaxed">
                    {content.constitutionalMandate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ways to Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.waysToSupportTitle || 'Ways to Support Our Mission'}
            </h2>
            {content.waysToSupportSubtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.waysToSupportSubtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(content.supportOptions || [
              {
                title: 'Direct Donations',
                description: 'Make a direct financial contribution to support scholarship programs, infrastructure development, and educational initiatives.',
                ctaText: 'Donate Now',
                ctaLink: 'https://donate.getfund.gov.gh/',
                icon: 'heart'
              },
              {
                title: 'Corporate Partnerships',
                description: 'Partner with us through corporate social responsibility programs to make lasting impact on Ghana\'s educational landscape.',
                ctaText: 'Partner With Us',
                ctaLink: '/contact',
                icon: 'building'
              },
              {
                title: 'International Support',
                description: 'Join international organizations and diaspora communities in supporting Ghana\'s educational development initiatives.',
                ctaText: 'Learn More',
                ctaLink: '/contact',
                icon: 'users'
              }
            ]).map((option, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  {getSupportIcon(option.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {option.description}
                </p>
                {option.ctaText && (
                  <a
                    href={option.ctaLink || '#'}
                    className="text-getfund-primary font-semibold hover:text-red-700 inline-flex items-center gap-2"
                  >
                    {option.ctaText}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Section */}
      {content.scholarshipTitle && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {content.scholarshipTitle}
                </h2>
                {content.scholarshipSubtitle && (
                  <p className="text-xl text-gray-600">
                    {content.scholarshipSubtitle}
                  </p>
                )}
              </div>

              {content.scholarshipTypes && content.scholarshipTypes.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {content.scholarshipTypes.map((type, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-700 font-bold">{index + 1}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{type.title}</h3>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {content.scholarshipAmount && (
                <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                    <Heart className="w-8 h-8 text-indigo-700" />
                  </div>
                  <h3 className="text-4xl font-bold text-indigo-700 mb-2">
                    {content.scholarshipAmount}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {content.scholarshipAmountText || 'can fund a full scholarship for one student'}
                  </p>
                  {content.scholarshipCtaText && (
                    <a
                      href={content.scholarshipCtaLink || 'https://donate.getfund.gov.gh/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {content.scholarshipCtaText}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-getfund-primary to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.ctaTitle || 'Ready to Make a Difference?'}
            </h2>
            <p className="text-xl mb-8 text-red-100">
              {content.ctaDescription || 'Join thousands of supporters who are helping to build a stronger, more educated Ghana. Your contribution can be a defining factor in a student\'s life, making a meaningful impact.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {content.ctaButtonText && (
                <a
                  href={content.ctaButtonLink || 'https://donate.getfund.gov.gh/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-getfund-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {content.ctaButtonText}
                </a>
              )}
              {content.ctaSecondaryText && (
                <a
                  href={content.ctaSecondaryLink || '/contact'}
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-getfund-primary transition-colors"
                >
                  {content.ctaSecondaryText}
                </a>
              )}
            </div>

            {(content.contactEmail || content.contactPhone) && (
              <div className="mt-8 pt-8 border-t border-red-400">
                <p className="text-red-100 mb-4">Questions about donating or partnerships?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white">
                  {content.contactEmail && (
                    <a
                      href={`mailto:${content.contactEmail}`}
                      className="inline-flex items-center gap-2 hover:text-red-200 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{content.contactEmail}</span>
                    </a>
                  )}
                  {content.contactPhone && (
                    <a
                      href={`tel:${content.contactPhone}`}
                      className="inline-flex items-center gap-2 hover:text-red-200 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{content.contactPhone}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
