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

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type GradientDirection = 'to right' | 'to bottom' | 'to bottom right' | 'to top right';

interface SlideOverlay {
  tintColor?: string;
  tintColor2?: string;
  useGradient?: boolean;
  gradientDirection?: GradientDirection;
  tintOpacity?: number;
}

interface HeroSlide {
  src: string;
  alt: string;
  headline: string;
  description: string;
  cta: boolean;
  ctaText?: string;
  ctaLink?: string;
  titleFontSize?: FontSize;
  subtitleFontSize?: FontSize;
  overlay?: SlideOverlay;
}

interface CMSSlide {
  image: string;
  headline: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  titleFontSize?: FontSize;
  subtitleFontSize?: FontSize;
  overlay?: SlideOverlay;
}

// Default overlay settings
const defaultOverlay: SlideOverlay = {
  tintColor: '#059669', // green-600
  tintColor2: '#0d9488', // teal-600
  useGradient: true,
  gradientDirection: 'to bottom',
  tintOpacity: 60,
};

// Helper to generate overlay style
function getOverlayStyle(overlay?: SlideOverlay): React.CSSProperties {
  const settings = { ...defaultOverlay, ...overlay };
  const opacity = (settings.tintOpacity ?? 60) / 100;

  if (settings.useGradient && settings.tintColor2) {
    return {
      background: `linear-gradient(${settings.gradientDirection || 'to bottom'}, ${settings.tintColor}${Math.round(opacity * 0.6 * 255).toString(16).padStart(2, '0')}, ${settings.tintColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${settings.tintColor2}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`,
    };
  }

  return {
    backgroundColor: settings.tintColor,
    opacity: opacity,
  };
}

// Font size class mappings
const titleFontSizeClasses: Record<FontSize, string> = {
  small: 'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl',
  medium: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl 4xl:text-9xl',
  large: 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl',
  xlarge: 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
};

const subtitleFontSizeClasses: Record<FontSize, string> = {
  small: 'text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl 4xl:text-4xl',
  medium: 'text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 3xl:text-4xl 4xl:text-5xl',
  large: 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl',
  xlarge: 'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl',
};

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
      src: '/images/hero/main-slider-4.jpg',
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
        titleFontSize: slide.titleFontSize || 'medium',
        subtitleFontSize: slide.subtitleFontSize || 'medium',
        overlay: slide.overlay,
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
            ctaText: slide.buttonText,
            ctaLink: slide.buttonLink,
            titleFontSize: slide.titleFontSize || 'medium',
            subtitleFontSize: slide.subtitleFontSize || 'medium',
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
                {/* Dynamic overlay - customizable per slide */}
                <div
                  className="absolute inset-0 z-10"
                  style={getOverlayStyle(slide.overlay)}
                />


                {/* Text Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 3xl:px-12">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="max-w-4xl 3xl:max-w-6xl 4xl:max-w-7xl text-center slide-content pointer-events-auto">
                      <h1 className={`${titleFontSizeClasses[slide.titleFontSize || 'medium']} font-bold mb-3 xs:mb-4 sm:mb-6 md:mb-8 3xl:mb-10 leading-tight tracking-tight drop-shadow-lg`}>
                        {slide.headline}
                      </h1>
                      <p className={`${subtitleFontSizeClasses[slide.subtitleFontSize || 'medium']} mb-4 xs:mb-6 sm:mb-8 md:mb-10 3xl:mb-12 text-green-100 leading-relaxed max-w-3xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto drop-shadow`}>
                        {slide.description}
                      </p>
                      {slide.cta && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center max-w-2xl 3xl:max-w-3xl mx-auto">
                          <Link
                            to={slide.ctaLink || "/scholarship-apply"}
                            className="w-full sm:w-auto bg-transparent text-white px-6 xs:px-8 sm:px-10 md:px-12 3xl:px-16 py-3 xs:py-4 md:py-5 3xl:py-6 rounded-sm font-semibold hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors border-2 3xl:border-3 border-white text-center uppercase tracking-wide text-sm xs:text-base md:text-lg 3xl:text-xl 4xl:text-2xl min-h-[48px] 3xl:min-h-[64px] flex items-center justify-center touch-manipulation"
                            aria-label={slide.ctaText || "Apply for GETFund scholarship program"}
                          >
                            {slide.ctaText || "Apply for Scholarship"}
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
