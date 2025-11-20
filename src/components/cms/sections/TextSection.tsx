/**
 * Text Section Renderer
 * Displays rich text/HTML content
 */

import { PageSection } from '../../../services/cmsApi';

interface TextSectionProps {
  section: PageSection;
}

export default function TextSection({ section }: TextSectionProps) {
  const { body, alignment = 'left' } = section.content;

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
          <div
            className={`prose prose-lg max-w-none ${alignmentClasses[alignment as keyof typeof alignmentClasses] || 'text-left'}`}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </section>
  );
}
