/**
 * Image Section Renderer
 * Displays a single image with optional caption
 */

import { PageSection } from '../../../services/cmsApi';

interface ImageSectionProps {
  section: PageSection;
}

export default function ImageSection({ section }: ImageSectionProps) {
  const { url, alt, caption } = section.content;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={url}
            alt={alt || section.title || ''}
            className="w-full rounded-xl shadow-lg"
          />
          {caption && (
            <p className="text-center text-gray-600 mt-4 text-sm italic">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
