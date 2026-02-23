import React from 'react';
import { Eye, Target, Heart, ChevronRight } from 'lucide-react';

interface AboutPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    heroTitle?: string;
    heroSubtitle?: string;
    mainImage?: string;
    mainImageAlt?: string;
    mainHeading?: string;
    redHeading?: string;
    paragraph1?: string;
    paragraph2?: string;
    vision?: string;
    mission?: string;
    values?: string;
    
    // Educational Financing Section
    financingTitle?: string;
    financingContent?: string;
    
    // Funding Formula Section
    fundingFormulaTitle?: string;
    fundingFormulaIntro?: string;
    fundingFormulaItems?: Array<{
      text: string;
    }>;
    
    // Leadership & Governance
    leadershipGovernanceTitle?: string;
    leadershipGovernanceSubtitle?: string;
    
    // Board of Trustees
    boardImage?: string;
    boardImageAlt?: string;
    boardTitle?: string;
    boardDescription?: string;
    boardCommitments?: Array<{
      title: string;
      description: string;
      color: 'red' | 'yellow' | 'orange';
    }>;
    
    // Footer Message
    footerMessage?: string;
    
    leadership?: Array<{
      name: string;
      title: string;
      imageUrl?: string;
      bio?: string;
    }>;
  };
}

/**
 * About Page Template
 *
 * A dedicated template for the "About Us" / "Who We Are" page.
 * Content is managed through the CMS and passed as props.
 */
export const AboutPage: React.FC<AboutPageProps> = ({ pageData, content }) => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="relative bg-getfund-primary text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              {content.heroSubtitle || pageData.template_variables?.heroSubtitle || 'Supporting the delivery of quality education to Ghanaians from basic to tertiary level'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src={content.mainImage || '/images/about/getfund-7th-board-inauguration.jpg'}
                alt={content.mainImageAlt || 'GETFund Inauguration - 7th Board'}
                className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {content.mainHeading || 'Ghana Education Trust Fund'}
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-getfund-red mb-4">
                {content.redHeading || 'Since its establishment in the year 2000,'}
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.paragraph1 || 'The fund has remained committed to its mandate espouse in its governing legislation, the GETFund Act (Act 581), to provide funding to supplement government effort for the provision of educational infrastructure and facilities with the public sector.'}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.paragraph2 || 'GETFund has played a significant role in this country\'s education sector not only by way of physical infrastructure, but also through the enhancement of our human capital by way of scholarships.'}
                </p>
              </div>
            </div>
          </div>

          {/* Vision, Mission, Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-red-800" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                {content.vision || 'To become a trusted public sector educational financing agency that sustainably manages assigned government resources'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-getfund-gold" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {content.mission || 'To support the delivery of quality education to Ghanaians from the basic to tertiary level through dynamic funding policies aimed at ensuring equitable provision of essential resources for all levels of education'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-orange-800" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                {content.values || 'Integrity, transparency, excellence, and commitment to transforming lives through education'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Financing Section */}
      {content.financingContent && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {content.financingTitle || 'The Issue of Educational Financing'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content.financingContent }}
            />
          </div>
        </section>
      )}

      {/* Funding Formula Section */}
      {content.fundingFormulaItems && content.fundingFormulaItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.fundingFormulaTitle || 'Funding Formula'}
            </h2>
            {content.fundingFormulaIntro && (
              <p className="text-lg text-gray-700 mb-8">
                {content.fundingFormulaIntro}
              </p>
            )}
            <ul className="space-y-4">
              {content.fundingFormulaItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-getfund-red mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Leadership & Governance Section */}
      {content.leadershipGovernanceTitle && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.leadershipGovernanceTitle}
            </h2>
            {content.leadershipGovernanceSubtitle && (
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {content.leadershipGovernanceSubtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Board of Trustees Section */}
      {content.boardTitle && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <img 
                  src={content.boardImage || '/images/about/getfund-7th-board-inauguration.jpg'}
                  alt={content.boardImageAlt || 'Board of Trustees'}
                  className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {content.boardTitle}
                </h2>
                {content.boardDescription && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.boardDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Board Commitments */}
            {content.boardCommitments && content.boardCommitments.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {content.boardCommitments.map((commitment, index) => {
                  const bgColor = commitment.color === 'red' ? 'bg-red-500' : 
                                 commitment.color === 'yellow' ? 'bg-yellow-500' : 
                                 'bg-orange-500';
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`${bgColor} w-12 h-12 rounded flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{commitment.title}</h3>
                        <p className="text-sm text-gray-600">{commitment.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer Message Section */}
      {content.footerMessage && (
        <section className="py-12 bg-gray-900 text-white text-center">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl font-semibold">
              {content.footerMessage}
            </p>
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {content.leadership && content.leadership.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.leadership.map((leader, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {leader.imageUrl && (
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-getfund-primary font-medium mb-3">{leader.title}</p>
                    {leader.bio && (
                      <p className="text-gray-600 text-sm">{leader.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
