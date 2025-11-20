import React from 'react';
import { getSectionComponent } from '../registry';

interface FullWidthLayoutProps {
  sections: Array<{
    id: string;
    section_key: string;
    section_type: string;
    title?: string;
    content: any;
    order_index: number;
    is_active: boolean;
  }>;
  page: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
}

/**
 * Full Width Layout
 *
 * Immersive full-width layout with:
 * - Full-width banner (required)
 * - Full-width content sections
 */
export const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({ sections, page }) => {
  // Group sections by slot
  const bannerSections = sections.filter(s => s.section_key === 'banner' && s.is_active);
  const contentSections = sections.filter(s => s.section_key === 'content' && s.is_active);

  const renderSection = (section: any) => {
    const SectionComponent = getSectionComponent(section.section_type);
    if (!SectionComponent) {
      console.warn(`No component found for section type: ${section.section_type}`);
      return null;
    }

    return (
      <SectionComponent
        key={section.id}
        {...section.content}
        variables={section.template_variables || {}}
        pageVariables={page.template_variables || {}}
      />
    );
  };

  return (
    <div className="full-width-layout">
      {/* Banner Section - Full Width */}
      {bannerSections.length > 0 && (
        <div className="banner-slot w-full">
          {bannerSections.map(renderSection)}
        </div>
      )}

      {/* Content Sections - Full Width */}
      <div className="content-slot w-full">
        {contentSections.map(renderSection)}
      </div>
    </div>
  );
};
