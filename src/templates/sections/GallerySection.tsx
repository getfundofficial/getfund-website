import React from 'react';
import Slider from 'react-slick';

interface GalleryImage {
  url: string;
  caption?: string;
  alt: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
  layout?: 'grid' | 'carousel';
  columns?: number;
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

/**
 * Gallery Section Component
 *
 * Display images in grid or carousel format
 * Used in: All layouts
 */
export const GallerySection: React.FC<GallerySectionProps> = ({
  images = [],
  layout = 'grid',
  columns = 3,
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  if (layout === 'carousel') {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
    };

    return (
      <section className="gallery-section py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {image.caption && (
                  <p className="text-center text-gray-600 mt-4">{image.caption}</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${gridClasses} gap-6`}>
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
              {image.caption && (
                <p className="text-center text-gray-600 mt-2">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
