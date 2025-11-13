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
      className="absolute top-1/2 right-6 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-7 h-7" />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-6 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-getfund-primary rounded-full p-2 shadow-lg transition-colors border border-white focus:outline-none focus:ring-2 focus:ring-getfund-primary"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-7 h-7" />
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
}

interface HeroProps {
  slides?: HeroSlide[];
}

export default function Hero({ slides: propSlides }: HeroProps) {
  // Default slides as fallback
  const defaultSlides: HeroSlide[] = [
    {
      src: '/images/hero/main-slider-1.jpg',
      alt: "Modern educational infrastructure showcasing GETFund's commitment to quality education in Ghana",
      headline: "Every Ghanaian Child Deserves the Opportunity to be Educated",
      description: "Supporting the delivery of quality education to Ghanaians from basic to tertiary level",
      cta: true
    },
    {
      src: '/images/hero/main-slider-3.jpg',
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

  const [slides, setSlides] = useState<HeroSlide[]>(propSlides || defaultSlides);


  // Fetch slides from CMS on component mount
  useEffect(() => {
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
          }));

          setSlides(transformedSlides);
        }
        // If no CMS slides, keep default slides
      } catch (error) {
        console.error('Failed to fetch hero slides from CMS, using default slides:', error);
        // Keep default slides on error
      }
    };

    // Only fetch if propSlides wasn't provided
    if (!propSlides) {
      fetchHeroSlides();
    }
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
  <section className="relative bg-transparent text-white pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden min-h-[100vh] flex items-center">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Slider {...settings} className="h-full w-full">
          {slides.map((slide, idx) => {
            return (
                <div
                  key={idx}
                  className="relative h-[85vh] sm:h-[95vh] md:h-[100vh] lg:h-[110vh] xl:h-[110vh] w-full flex items-center justify-center"
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
                {/* Subtle green tint: transparent at top, light green at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-getfund-primary/80 to-getfund-primary/95 z-10" />

                <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="max-w-5xl text-center slide-content pointer-events-auto max-h-[70vh] sm:max-h-[80vh] md:max-h-[90vh] overflow-auto">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-lg">
                        {slide.headline}
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 text-green-100 leading-relaxed max-w-4xl mx-auto drop-shadow">
                        {slide.description}
                      </p>
                      {slide.cta && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center max-w-2xl mx-auto">
                          <Link
                            to="/scholarship-apply"
                            className="w-full sm:w-auto bg-transparent text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-sm font-semibold hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors border-2 border-white text-center uppercase tracking-wide text-sm sm:text-base md:text-lg min-h-[48px] flex items-center justify-center"
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
            );
          })}
        </Slider>
      </div>
      
  {/* removed bottom fade to let images show through */}
    </section>
  );
}
