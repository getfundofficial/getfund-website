import React from 'react';

interface TextSectionProps {
  content: string;
  alignment?: 'left' | 'center' | 'right';
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

/**
 * Text Section Component
 *
 * Rich text content block with optional alignment
 * Used in: All layouts
 */
export const TextSection: React.FC<TextSectionProps> = ({
  content,
  alignment = 'left',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section className="text-section py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className={`prose prose-lg max-w-none ${alignmentClasses[alignment]}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};
