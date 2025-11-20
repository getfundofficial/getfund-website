import React from 'react';
import { getSectionComponent } from '../registry';

interface DefaultLayoutProps {
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
 * Default Layout
 *
 * Standard page layout with:
 * - Optional hero section
 * - Main content area
 * - Optional CTA sections (max 2)
 */
export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ sections, page }) => {
  // Group sections by slot
  const heroSections = sections.filter(s => s.section_key === 'hero' && s.is_active);
  const contentSections = sections.filter(s => s.section_key === 'content' && s.is_active);
  const ctaSections = sections.filter(s => s.section_key === 'cta' && s.is_active).slice(0, 2);

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
    <div className="default-layout">
      {/* Hero Section */}
      {heroSections.length > 0 && (
        <div className="hero-slot">
          {heroSections.map(renderSection)}
        </div>
      )}

      {/* Main Content Area */}
      <div className="content-slot">
        {contentSections.map(renderSection)}
      </div>

      {/* CTA Sections */}
      {ctaSections.length > 0 && (
        <div className="cta-slot">
          {ctaSections.map(renderSection)}
        </div>
      )}
    </div>
  );
};
