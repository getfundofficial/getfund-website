import { Target, Eye, Heart } from 'lucide-react';
import { useState } from 'react';

interface HomepageContent {
  aboutHeading: string;
  aboutSubheading: string;
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
        </div>

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

        <div className="bg-gradient-to-br from-getfund-secondary/5 to-getfund-secondary/10 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{content.aboutGETFundHeading}</h3>
          <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-5xl mx-auto">
            <p>
              Since its establishment in the year 2000, the fund has remained committed to its mandate espoused in its governing legislation, Act 581. The object of the Fund is to provide funding to supplement government's effort for the provision of educational infrastructure and facilities at all levels.
            </p>
            <p>
              GETFund has since its inception remained a significant player in Ghana's education sector not only by way of providing physical infrastructure, but also through the enhancement of our human capital, awarding scholarships to many deserving citizens.
            </p>
            <p>
              The law establishing GETFund further emphasizes a distribution formula that must be approved by Parliament each year, requiring that some crucial factors related to education delivery and development are considered in the process of preparing the Formula.
            </p>
            <div>
              <span className="font-semibold">Relevant Factors:</span>
              <ul className="list-disc pl-6 mt-2">
                {content.relevantFactors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
