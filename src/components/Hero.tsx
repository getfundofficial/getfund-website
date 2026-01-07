import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

interface BlueBoxSettings {
  text?: string;
  color?: string;
  opacity?: number;
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
  blueBoxText?: string; // Optional blue label text above headline (legacy)
  blueBox?: BlueBoxSettings; // New blue box settings with color/opacity
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
  blueBoxText?: string;
  blueBox?: BlueBoxSettings;
}

// Default overlay settings
const defaultOverlay: SlideOverlay = {
  tintColor: '#059669', // green-600
  tintColor2: '#0d9488', // teal-600
  useGradient: true,
  gradientDirection: 'to bottom',
  tintOpacity: 60,
};

// Default blue box settings
const defaultBlueBox: BlueBoxSettings = {
  color: '#2a3f75',
  opacity: 100,
};

// Helper to generate blue box style
function getBlueBoxStyle(blueBox?: BlueBoxSettings): React.CSSProperties {
  const settings = { ...defaultBlueBox, ...blueBox };
  const opacity = (settings.opacity ?? 100) / 100;

  return {
    backgroundColor: settings.color || '#2a3f75',
    opacity: opacity,
  };
}

// Helper to generate overlay style - supports both solid and gradient (CMS-controllable)
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

// Helper to get headline font size classes
function getHeadlineSizeClasses(size?: FontSize): string {
  switch (size) {
    case 'small':
      return 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl';
    case 'large':
      return 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl';
    case 'xlarge':
      return 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl';
    case 'medium':
    default:
      return 'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl';
  }
}

// Helper to get description font size classes
function getDescriptionSizeClasses(size?: FontSize): string {
  switch (size) {
    case 'small':
      return 'text-xs sm:text-sm md:text-base lg:text-lg 3xl:text-xl';
    case 'large':
      return 'text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl';
    case 'xlarge':
      return 'text-lg sm:text-xl md:text-2xl lg:text-3xl 3xl:text-4xl';
    case 'medium':
    default:
      return 'text-sm sm:text-base md:text-lg lg:text-xl 3xl:text-2xl';
  }
}


interface HeroProps {
  slides?: CMSSlide[];
}

export default function Hero({ slides: propSlides }: HeroProps = {}) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        blueBoxText: slide.blueBoxText,
        blueBox: slide.blueBox,
      }));
      setSlides(transformedSlides);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch from CMS
    const fetchHeroSlides = async () => {
      try {
        const cmsSlides = await cmsApi.getHeroSlides();

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
            blueBoxText: slide.blueBoxText,
            blueBox: slide.blueBox,
          }));

          setSlides(transformedSlides);
        } else {
          setSlides([]);
        }
      } catch {
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroSlides();
  }, [propSlides]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'ease-out',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    waitForAnimate: false,
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

  // Don't render anything while loading or if no slides
  if (isLoading) {
    return null;
  }

  if (slides.length === 0) {
    return null;
  }

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


                {/* Blue Content Box - Bottom Left */}
                <div className="absolute inset-0 z-20 flex items-end justify-start px-4 sm:px-8 md:px-12 lg:px-16 3xl:px-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 3xl:pb-32">
                  <div
                    className="slide-content pointer-events-auto p-6 sm:p-8 md:p-10 lg:p-12 3xl:p-14 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 3xl:max-w-3xl"
                    style={getBlueBoxStyle(slide.blueBox)}
                  >
                    {(slide.blueBox?.text || slide.blueBoxText) && (
                      <span className="inline-block text-xs sm:text-sm md:text-base 3xl:text-lg text-blue-200 mb-2 sm:mb-3 uppercase tracking-wider font-medium">
                        {slide.blueBox?.text || slide.blueBoxText}
                      </span>
                    )}
                    <h1 className={`${getHeadlineSizeClasses(slide.titleFontSize)} font-bold mb-3 sm:mb-4 md:mb-5 leading-tight text-white`}>
                      {slide.headline}
                    </h1>
                    <p className={`${getDescriptionSizeClasses(slide.subtitleFontSize)} mb-4 sm:mb-5 md:mb-6 text-gray-200 leading-relaxed`}>
                      {slide.description}
                    </p>
                    {slide.cta && (
                      <Link
                        to={slide.ctaLink || "/scholarship-apply"}
                        className="inline-flex items-center gap-2 text-white text-sm sm:text-base md:text-lg 3xl:text-xl uppercase tracking-wider font-semibold hover:text-blue-200 transition-colors group"
                        aria-label={slide.ctaText || "Apply for GETFund scholarship program"}
                      >
                        {slide.ctaText || "Apply Now"}
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
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
