import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// scroll helper not used here
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cmsApi } from '../services/cmsApi';

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 right-2 xs:right-4 sm:right-6 md:right-8 3xl:right-12 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-1.5 xs:p-2 md:p-2.5 3xl:p-3 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary touch-manipulation"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 3xl:w-9 3xl:h-9" />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-2 xs:left-4 sm:left-6 md:left-8 3xl:left-12 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-1.5 xs:p-2 md:p-2.5 3xl:p-3 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary touch-manipulation"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 3xl:w-9 3xl:h-9" />
    </button>
  );
}
import OptimizedImage from './OptimizedImage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HeroSlide {
  src: string;
  alt: string;
  headline: string;
  description: string;
  cta: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface CMSSlide {
  image: string;
  headline: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroProps {
  slides?: CMSSlide[];
}

export default function Hero({ slides: propSlides }: HeroProps = {}) {
  // Default slides as fallback
  const defaultSlides: HeroSlide[] = [
    {
      src: '/images/hero/main-slider-3.jpg',
      alt: "Modern educational infrastructure showcasing GETFund's commitment to quality education in Ghana",
      headline: "Every Ghanaian Child Deserves the Opportunity to be Educated",
      description: "Supporting the delivery of quality education to Ghanaians from basic to tertiary level",
      cta: true
    },
    {
      src: '/images/hero/main-slider-1.jpg',
      alt: "GETFund project: new classroom block exterior",
      headline: "Transforming Schools Across Ghana",
      description: "GETFund builds and renovates classrooms, science labs, and libraries for a brighter future.",
      cta: false
    },
    {
      src: '/images/scholarship/GETFund-Projects-02-768x436.jpg',
      alt: "GETFund Projects - School building",
      headline: "Investing in Educational Infrastructure",
      description: "Modern facilities and safe learning environments for all students.",
      cta: false
    },
    {
      src: '/images/scholarship/OME1079.jpg',
      alt: "GETFund Scholarship Awardees",
      headline: "Empowering Students Through Scholarships",
      description: "Financial support for talented Ghanaians to pursue higher education.",
      cta: false
    },
    {
      src: '/images/infrastructure/school-building.jpg',
      alt: "GETFund Infrastructure - School Building",
      headline: "Building the Future of Ghana",
      description: "GETFund is committed to sustainable growth in the education sector.",
      cta: false
    },
  ];

  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);

  // Use prop slides or fetch from CMS
  useEffect(() => {
    // If slides are provided as props, use them
    if (propSlides && propSlides.length > 0) {
      const transformedSlides: HeroSlide[] = propSlides.map(slide => ({
        src: slide.image,
        alt: slide.headline,
        headline: slide.headline,
        description: slide.description,
        cta: !!slide.ctaText && !!slide.ctaLink,
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
      }));
      console.log('[Hero] Using prop slides:', transformedSlides);
      setSlides(transformedSlides);
      return;
    }

    // Otherwise fetch from CMS
    const fetchHeroSlides = async () => {
      try {
        console.log('[Hero] Fetching hero slides from CMS...');
        const cmsSlides = await cmsApi.getHeroSlides();
        console.log('[Hero] Received slides:', cmsSlides.length, cmsSlides);

        if (cmsSlides.length > 0) {
          // Transform CMS slides to component format
          const transformedSlides: HeroSlide[] = cmsSlides.map(slide => ({
            src: slide.image,
            alt: slide.title,
            headline: slide.title,
            description: slide.subtitle,
            cta: !!slide.buttonText && !!slide.buttonLink,
          }));

          console.log('[Hero] Setting transformed slides:', transformedSlides);
          setSlides(transformedSlides);
        } else {
          console.log('[Hero] No CMS slides found, using default slides');
        }
        // If no CMS slides, keep default slides
      } catch (error) {
        console.error('[Hero] Failed to fetch hero slides from CMS, using default slides:', error);
        // Keep default slides on error
      }
    };

    fetchHeroSlides();
  }, [propSlides]);

  const settings = {
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
    <section className="relative bg-transparent text-white overflow-hidden mt-[80px]">
      {/* Carousel Background */}
      <Slider {...settings} className="w-full">
        {slides.map((slide, idx) => {
          return (
            <div key={idx}>
              <div
                className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center"
              >
                <OptimizedImage
                  src={slide.src}
                  alt={slide.alt}
                  fallbackSrc="/images/hero/main-slider-4.jpg"
                  className="hero-slide-img w-full h-full object-cover object-center"
                  width={1920}
                  height={1080}
                  priority={idx === 0}
                />
                {/* Green teal overlay matching the design */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-600/40 via-green-700/60 to-teal-600/70 z-10" />

                {/* Social Media Icons - Bottom Left */}
                <div className="absolute bottom-8 left-8 z-30 flex items-center gap-4">
                  <img src="/images/logos/getfund-logo-white.png" alt="GETFund" className="w-16 h-16" />
                  <div className="flex items-center gap-3">
                    <a href="https://instagram.com/getfund" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://facebook.com/getfund" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/getfund" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <span className="text-white text-sm font-medium">getfund</span>
                  </div>
                </div>

                {/* Text Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 3xl:px-12">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="max-w-4xl 3xl:max-w-6xl 4xl:max-w-7xl text-center slide-content pointer-events-auto">
                      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold mb-3 xs:mb-4 sm:mb-6 md:mb-8 3xl:mb-10 leading-tight tracking-tight drop-shadow-lg">
                        {slide.headline}
                      </h1>
                      <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 3xl:text-4xl 4xl:text-5xl mb-4 xs:mb-6 sm:mb-8 md:mb-10 3xl:mb-12 text-green-100 leading-relaxed max-w-3xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto drop-shadow">
                        {slide.description}
                      </p>
                      {slide.cta && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center max-w-2xl 3xl:max-w-3xl mx-auto">
                          <Link
                            to="/scholarship-apply"
                            className="w-full sm:w-auto bg-transparent text-white px-6 xs:px-8 sm:px-10 md:px-12 3xl:px-16 py-3 xs:py-4 md:py-5 3xl:py-6 rounded-sm font-semibold hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors border-2 3xl:border-3 border-white text-center uppercase tracking-wide text-sm xs:text-base md:text-lg 3xl:text-xl 4xl:text-2xl min-h-[48px] 3xl:min-h-[64px] flex items-center justify-center touch-manipulation"
                            aria-label="Apply for GETFund scholarship program"
                          >
                            Apply for Scholarship
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
