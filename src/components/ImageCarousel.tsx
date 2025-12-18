import { useState } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (images.length === 0) {
    return null;
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className="mb-6">
        <img
          src={images[0]}
          alt={title || 'Article image'}
          className="w-full h-auto object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
          }}
        />
      </div>
    );
  }

  // Multiple images - use carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <button
        className={`w-3 h-3 rounded-full transition-colors ${
          i === currentSlide ? 'bg-getfund-primary' : 'bg-gray-300'
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <div className="mb-6 relative">
      <style>{`
        .custom-dots {
          bottom: -30px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
          padding: 0;
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
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`${title || 'Article'} - Image ${index + 1}`}
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
              }}
            />
          </div>
        ))}
      </Slider>
      <div className="text-center text-sm text-gray-500 mt-10">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  );
}
