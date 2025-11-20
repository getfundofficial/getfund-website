import React from 'react';
import { getSectionComponent } from '../registry';

interface LandingPageLayoutProps {
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
 * Landing Page Layout
 *
 * Marketing-focused layout with:
 * - Hero banner (required)
 * - Feature sections (max 3)
 * - Testimonials section
 * - Pricing section
 * - CTA section (required)
 */
export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ sections, page }) => {
  // Group sections by slot
  const heroSections = sections.filter(s => s.section_key === 'hero' && s.is_active);
  const featureSections = sections.filter(s => s.section_key === 'features' && s.is_active).slice(0, 3);
  const testimonialSections = sections.filter(s => s.section_key === 'testimonials' && s.is_active);
  const pricingSections = sections.filter(s => s.section_key === 'pricing' && s.is_active);
  const ctaSections = sections.filter(s => s.section_key === 'cta' && s.is_active).slice(0, 1);

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
    <div className="landing-page-layout">
      {/* Hero Banner - Required */}
      {heroSections.length > 0 && (
        <div className="hero-slot">
          {heroSections.map(renderSection)}
        </div>
      )}

      {/* Features Section */}
      {featureSections.length > 0 && (
        <div className="features-slot py-16">
          {featureSections.map(renderSection)}
        </div>
      )}

      {/* Testimonials Section */}
      {testimonialSections.length > 0 && (
        <div className="testimonials-slot bg-gray-50 py-16">
          {testimonialSections.map(renderSection)}
        </div>
      )}

      {/* Pricing Section */}
      {pricingSections.length > 0 && (
        <div className="pricing-slot py-16">
          {pricingSections.map(renderSection)}
        </div>
      )}

      {/* CTA Section - Required */}
      {ctaSections.length > 0 && (
        <div className="cta-slot">
          {ctaSections.map(renderSection)}
        </div>
      )}
    </div>
  );
};
