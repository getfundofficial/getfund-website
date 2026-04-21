import { useState } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// CSS imported globally in main.tsx

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

interface ArrowProps {
  onClick?: () => void;
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      aria-label="Previous image"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      aria-label="Next image"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

const MAX_DOTS = 7;

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const showDots = images.length <= MAX_DOTS;

  if (images.length === 0) {
    return null;
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className="mb-6">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <img
            src={images[0]}
            alt={title || 'Article image'}
            className="absolute inset-0 w-full h-full object-contain bg-gray-100"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
            }}
          />
        </div>
      </div>
    );
  }

  const progressPercent = ((currentSlide + 1) / images.length) * 100;

  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    ...(showDots && {
      customPaging: (i: number) => (
        <button
          className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
            i === currentSlide
              ? 'bg-getfund-primary scale-110'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ),
      dotsClass: 'slick-dots custom-dots',
    }),
  };

  return (
    <div className="mb-6 relative">
      {showDots && (
        <style>{`
          .custom-dots {
            position: relative;
            bottom: 0;
            display: flex !important;
            justify-content: center;
            gap: 8px;
            padding: 12px 0 0 0;
            margin: 0;
            list-style: none;
          }
          .custom-dots li {
            margin: 0;
            padding: 0;
            width: auto;
            height: auto;
          }
          .custom-dots li button {
            padding: 0;
          }
        `}</style>
      )}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <img
                src={image}
                alt={`${title || 'Article'} - Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                }}
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Progress bar + counter for large image sets */}
      {!showDots && (
        <div className="mt-3 px-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-getfund-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-2 tabular-nums">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
}
