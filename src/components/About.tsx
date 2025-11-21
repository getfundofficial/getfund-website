import { Target, Eye, Heart } from 'lucide-react';
import { useState } from 'react';

interface HomepageContent {
  aboutHeading: string;
  aboutSubheading: string;
  aboutDescription?: string;
  aboutStats?: Array<{ number: string; label: string; description: string }>;
  aboutImage?: string;
  aboutImageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  coreValues: {
    title: string;
    description: string;
  };
  aboutGETFundHeading: string;
  aboutGETFundContent: string[];
  relevantFactors: string[];
}

interface AboutProps {
  content?: HomepageContent;
}

export default function About({ content: propContent }: AboutProps) {
  const [content] = useState<HomepageContent>(propContent || {
    aboutHeading: 'Who We Are',
    aboutSubheading: 'The Ghana Education Trust Fund is a statutory body established to provide financial resources for educational development.',
    mission: {
      title: 'Our Mission',
      description: 'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'
    },
    vision: {
      title: 'Our Vision',
      description: 'To be a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'
    },
    coreValues: {
      title: 'Core Values',
      description: 'Integrity, transparency, excellence, and commitment to transforming lives through education'
    },
    aboutGETFundHeading: 'About GETFund',
    aboutGETFundContent: [],
    relevantFactors: [
      'Promotion of the study of Mathematics, Science and Technology',
      'Advancement of female education',
      'Reduction in the high level of illiteracy in historically disadvantaged areas',
      'Promotion of Vocational, Technical Education and Training',
      'Equitable allocation of funds to the Districts at the Pre-Tertiary level of education'
    ]
  });
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      {/* Scroll anchor with offset for fixed header */}
      <div id="about" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">{content.aboutHeading}</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.aboutSubheading}
          </p>
          {content.aboutDescription && (
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed mt-6">
              {content.aboutDescription}
            </p>
          )}
        </div>

        {/* Stats Section */}
        {content.aboutStats && content.aboutStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            {content.aboutStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <p className="text-xs sm:text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="text-center">
            <div className="bg-getfund-primary/10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-getfund-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{content.mission.title}</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {content.mission.description}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-getfund-secondary/10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-getfund-secondary" aria-hidden="true" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{content.vision.title}</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {content.vision.description}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-getfund-gold/10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-getfund-gold" aria-hidden="true" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{content.coreValues.title}</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {content.coreValues.description}
            </p>
          </div>
        </div>

        {/* Image Section */}
        {content.aboutImage && (
          <div className="mb-12 sm:mb-16 md:mb-20">
            <img 
              src={content.aboutImage} 
              alt={content.aboutImageAlt || 'GETFund'} 
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Detailed About GETFund Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            {content.aboutGETFundHeading || 'About GETFund'}
          </h2>
          <div className="space-y-6 sm:space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl max-w-6xl mx-auto">
            {/* Main Description */}
            {(content.aboutGETFundContent && content.aboutGETFundContent.length > 0) ? (
              content.aboutGETFundContent.map((paragraph, index) => (
                <p key={index} className="text-justify">{paragraph}</p>
              ))
            ) : (
              <>
                <p className="text-justify">
                  Since its establishment in the year 2000, the fund has remained committed to its mandate espoused in its governing legislation, Act 581. The object of the Fund is to provide funding to supplement government's effort for the provision of educational infrastructure and facilities at all levels.
                </p>
                <p className="text-justify">
                  GETFund has since its inception remained a significant player in Ghana's education sector not only by way of providing physical infrastructure, but also through the enhancement of our human capital, awarding scholarships to many deserving citizens.
                </p>
                <p className="text-justify">
                  The law establishing GETFund further emphasizes a distribution formula that must be approved by Parliament each year, requiring that some crucial factors related to education delivery and development are considered in the process of preparing the Formula.
                </p>
              </>
            )}
            
            {/* Relevant Factors */}
            {content.relevantFactors && content.relevantFactors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-xl sm:text-2xl mb-4 text-gray-900">Relevant Factors:</h3>
                <ul className="list-disc pl-6 sm:pl-8 space-y-2">
                  {content.relevantFactors.map((factor, index) => (
                    <li key={index} className="text-gray-700">{factor}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        {content.ctaText && content.ctaLink && (
          <div className="text-center">
            <a 
              href={content.ctaLink}
              className="inline-block bg-getfund-primary hover:bg-getfund-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              {content.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
