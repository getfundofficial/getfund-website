import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from '../../components/OptimizedImage';

interface HeroSlide {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  isActive?: boolean;
  blueBoxText?: string;
  blueBoxColor?: string;
  blueBoxOpacity?: number;
}

interface HeroSectionProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  interval?: number;
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 right-4 sm:right-6 md:right-8 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-4 sm:left-6 md:left-8 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}

/**
 * Hero Section Component
 *
 * Full-width hero carousel with slides and blue content box
 * Used in: Default Layout, Landing Page Layout
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  slides = [],
  autoplay = true,
  interval = 5000,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'ease-out',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed: interval,
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

  return (
    <section className="relative bg-transparent text-white overflow-hidden mt-[80px]">
      <Slider {...settings} className="w-full">
        {slides.map((slide, idx) => (
          <div key={idx}>
            <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center">
              <OptimizedImage
                src={slide.imageUrl}
                alt={slide.title}
                fallbackSrc="/images/hero/main-slider-4.jpg"
                className="hero-slide-img w-full h-full object-cover object-center"
                width={1920}
                height={1080}
                priority={idx === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-getfund-primary/60 via-getfund-primary/80 to-teal-700/90 z-10" />

              {/* Blue Content Box - Bottom Left */}
              <div className="absolute inset-0 z-20 flex items-end justify-start px-4 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                <div
                  className="slide-content pointer-events-auto p-6 sm:p-8 md:p-10 lg:p-12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
                  style={{
                    backgroundColor: slide.blueBoxColor || '#064e3b',
                    opacity: (slide.blueBoxOpacity ?? 100) / 100,
                  }}
                >
                  {slide.blueBoxText && (
                    <span className="inline-block text-xs sm:text-sm md:text-base text-blue-200 mb-2 sm:mb-3 uppercase tracking-wider font-medium">
                      {slide.blueBoxText}
                    </span>
                  )}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight text-white">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 text-gray-200 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  {slide.buttonText && slide.buttonLink && (
                    <Link
                      to={slide.buttonLink}
                      className="inline-flex items-center gap-2 text-white text-sm sm:text-base md:text-lg uppercase tracking-wider font-semibold hover:text-blue-200 transition-colors group"
                    >
                      {slide.buttonText}
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
        ))}
      </Slider>
    </section>
  );
};
