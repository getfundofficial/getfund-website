import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ============================================
// TYPES
// ============================================

interface ArrowProps {
  onClick?: () => void;
}

interface SlideOverlay {
  tintColor?: string;
  tintColor2?: string;
  useGradient?: boolean;
  gradientDirection?: 'to right' | 'to bottom' | 'to bottom right' | 'to top right';
  tintOpacity?: number;
}

export interface HeroSlide {
  image: string;
  headline?: string;
  description?: string;
  overlay?: SlideOverlay;
  // Content box fields
  boxTitle?: string;
  boxDescription?: string;
  exploreText?: string;
  exploreLink?: string;
}

interface HeroProps {
  slides: HeroSlide[];
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_CONTENT_BOX = {
  boxTitle: 'Supporting Research & Innovation',
  boxDescription: 'The Ghana Education Trust Fund is committed to supporting innovative educational initiatives that address national priorities, enhance academic capacity, and contribute to sustainable development in Ghana.',
  exploreText: 'EXPLORE',
  exploreLink: '/scholarship-apply'
};

const DEFAULT_OVERLAY: SlideOverlay = {
  tintColor: '#000000',
  useGradient: false,
  tintOpacity: 20,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getOverlayStyle(overlay?: SlideOverlay): React.CSSProperties {
  const settings = { ...DEFAULT_OVERLAY, ...overlay };
  const opacity = (settings.tintOpacity ?? 20) / 100;

  return {
    backgroundColor: settings.tintColor,
    opacity: opacity,
  };
}

// ============================================
// ARROW COMPONENTS
// ============================================

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-0 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 md:p-3 shadow-md transition-all duration-200 focus:outline-none touch-manipulation"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className="absolute top-1/2 left-0 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 md:p-3 shadow-md transition-all duration-200 focus:outline-none touch-manipulation"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Hero({ slides }: HeroProps) {
  // If no slides provided, show nothing
  if (!slides || slides.length === 0) {
    return null;
  }

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
      <Slider {...settings} className="w-full">
        {slides.map((slide, idx) => (
          <div key={idx}>
            <div className="relative h-[75vh] md:h-[80vh] lg:h-[85vh] w-full flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <OptimizedImage
                  src={slide.image}
                  alt={slide.headline || `Slide ${idx + 1}`}
                  fallbackSrc="/images/hero/main-slider-4.jpg"
                  className="w-full h-full object-cover object-center"
                  width={1920}
                  height={1080}
                  priority={idx === 0}
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 z-10"
                style={getOverlayStyle(slide.overlay)}
              />

              {/* Content Box */}
              <div className="absolute inset-0 z-20 flex items-end pb-8 md:pb-12 lg:pb-16 px-4 sm:px-8 md:px-12 lg:px-16 3xl:px-24">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl slide-content pointer-events-auto">
                  <div className="bg-blue-900/85 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 leading-tight text-white">
                      {slide.boxTitle || DEFAULT_CONTENT_BOX.boxTitle}
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 leading-relaxed">
                      {slide.boxDescription || DEFAULT_CONTENT_BOX.boxDescription}
                    </p>
                    <Link
                      to={slide.exploreLink || DEFAULT_CONTENT_BOX.exploreLink}
                      className="inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-base uppercase tracking-wider hover:gap-3 transition-all duration-200 group"
                      aria-label={slide.exploreText || DEFAULT_CONTENT_BOX.exploreText}
                    >
                      {slide.exploreText || DEFAULT_CONTENT_BOX.exploreText}
                      <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
