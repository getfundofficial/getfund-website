/**
 * Gallery Section Renderer
 * Displays a grid of images
 */

import { PageSection } from '../../../services/cmsApi';

interface GallerySectionProps {
  section: PageSection;
}

export default function GallerySection({ section }: GallerySectionProps) {
  const { images, layout = 'grid' } = section.content;

  if (!images || !Array.isArray(images)) {
    return null;
  }

  const layoutClasses = {
    grid: 'grid grid-cols-2 md:grid-cols-3 gap-6',
    masonry: 'columns-2 md:columns-3 gap-6',
    carousel: 'flex overflow-x-auto gap-6 snap-x snap-mandatory',
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {section.title}
          </h2>
        )}

        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {images.map((image: any, index: number) => (
            <div key={index} className={layout === 'carousel' ? 'flex-none w-80 snap-center' : ''}>
              <img
                src={image.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
              />
              {image.caption && (
                <p className="text-center text-gray-600 mt-2 text-sm">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
