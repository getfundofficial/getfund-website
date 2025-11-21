import React from 'react';
import { Target, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import News from '../../components/News';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 right-4 sm:right-8 md:right-12 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 md:p-3 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-4 sm:left-8 md:left-12 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 md:p-3 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
}

interface HomePageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    // Hero Section
    heroSlides?: Array<{
      image: string;
      headline: string;
      description: string;
      ctaText?: string;
      ctaLink?: string;
    }>;

    // Mission/Vision/Values
    mission?: {
      title: string;
      description: string;
    };
    vision?: {
      title: string;
      description: string;
    };
    coreValues?: {
      title: string;
      description: string;
    };

    // About Section
    aboutHeading?: string;
    aboutSubheading?: string;
    aboutGETFundHeading?: string;
    aboutGETFundContent?: string[];
    relevantFactors?: string[];

    // Services/Programs Highlight
    servicesTitle?: string;
    services?: Array<{
      title: string;
      description: string;
      icon: string;
      link?: string;
    }>;

    // Impact Stats
    impactStats?: Array<{
      number: string;
      label: string;
      description?: string;
    }>;

    // News Section
    newsTitle?: string;
    newsSubtitle?: string;
  };
}

/**
 * Home Page Template
 *
 * Dedicated template for the homepage with hero, mission/vision/values, about section, and news.
 */
export const HomePage: React.FC<HomePageProps> = ({ pageData, content }) => {
  // Debug logging
  console.log('[HomePage] Rendering with content:', content);
  console.log('[HomePage] Relevant Factors:', content.relevantFactors);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ul className="flex gap-2 justify-center items-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-white/90 border border-white/80 transition-colors"></button>
    ),
  };

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      {content.heroSlides && content.heroSlides.length > 0 && (
        <section className="relative bg-transparent text-white overflow-hidden min-h-[100vh] flex items-center">
          <div className="absolute inset-0">
            <Slider {...sliderSettings} className="h-full w-full">
              {content.heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className="relative h-[100vh] w-full flex items-center justify-center"
                >
                  {/* Background Image */}
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.headline}
                      className="w-full h-full object-cover object-center"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-getfund-primary/80 to-getfund-primary/95 z-10" />

                  {/* Content */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="max-w-4xl text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg">
                          {slide.headline}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-green-100 leading-relaxed max-w-3xl mx-auto drop-shadow">
                          {slide.description}
                        </p>
                        {slide.ctaText && slide.ctaLink && (
                          <Link
                            to={slide.ctaLink}
                            className="inline-block bg-transparent text-white px-8 sm:px-10 md:px-12 py-4 md:py-5 rounded-sm font-semibold hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors border-2 border-white text-center uppercase tracking-wide text-base md:text-lg min-h-[48px] shadow-lg"
                          >
                            {slide.ctaText}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* Mission/Vision/Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.aboutHeading || 'Who We Are'}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.aboutSubheading ||
                'The Ghana Education Trust Fund is a statutory body established to provide financial resources for educational development.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Mission */}
            <div className="text-center">
              <div className="bg-getfund-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-getfund-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {content.mission?.title || 'Our Mission'}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {content.mission?.description ||
                  'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'}
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="bg-getfund-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-12 h-12 text-getfund-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {content.vision?.title || 'Our Vision'}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {content.vision?.description ||
                  'To be a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'}
              </p>
            </div>

            {/* Core Values */}
            <div className="text-center">
              <div className="bg-getfund-gold/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-getfund-gold" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {content.coreValues?.title || 'Core Values'}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {content.coreValues?.description ||
                  'Integrity, transparency, excellence, and commitment to transforming lives through education'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About GETFund Section */}
      {(content.aboutGETFundContent || content.relevantFactors) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-getfund-secondary/5 to-getfund-secondary/10 p-8 md:p-12 rounded-xl max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                {content.aboutGETFundHeading || 'About GETFund'}
              </h3>
              <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
                {content.aboutGETFundContent && content.aboutGETFundContent.length > 0 ? (
                  content.aboutGETFundContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Since its establishment in the year 2000, the fund has remained committed to its mandate
                      espoused in its governing legislation, Act 581. The object of the Fund is to provide funding
                      to supplement government's effort for the provision of educational infrastructure and
                      facilities at all levels.
                    </p>
                    <p>
                      GETFund has since its inception remained a significant player in Ghana's education sector not
                      only by way of providing physical infrastructure, but also through the enhancement of our
                      human capital, awarding scholarships to many deserving citizens.
                    </p>
                  </>
                )}

                {content.relevantFactors && content.relevantFactors.length > 0 && (
                  <div>
                    <span className="font-semibold">Relevant Factors:</span>
                    <ul className="list-disc pl-6 mt-2">
                      {content.relevantFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services/Programs Highlight Section */}
      {content.services && content.services.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
              {content.servicesTitle || 'What We Do'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                  {service.link && (
                    <Link
                      to={service.link}
                      className="inline-flex items-center text-getfund-primary font-semibold hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Statistics Section */}
      {content.impactStats && content.impactStats.length > 0 && (
        <section className="py-16 bg-getfund-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-2">{stat.label}</div>
                  {stat.description && (
                    <p className="text-red-100 text-sm">{stat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News & Updates Section */}
      <News
        title={content.newsTitle}
        subtitle={content.newsSubtitle}
      />
    </div>
  );
};
