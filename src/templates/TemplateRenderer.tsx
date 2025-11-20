import React from 'react';
import { getLayoutComponent } from './registry';

interface PageSection {
  id: string;
  section_key: string;
  section_type: string;
  title?: string;
  content: any;
  order_index: number;
  is_active: boolean;
  template_variables?: Record<string, any>;
}

interface PageData {
  id: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  layout_template: string;
  layout_id?: string | null;
  layout_name?: string;
  template_variables?: Record<string, any>;
  sections?: PageSection[];
}

interface TemplateRendererProps {
  page: PageData;
}

/**
 * Template Renderer
 *
 * Main component that renders pages using the template system.
 * Fetches the appropriate layout component and passes sections to it.
 *
 * Usage:
 * ```tsx
 * <TemplateRenderer page={pageData} />
 * ```
 */
export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ page }) => {
  // Determine which layout to use
  // Priority: layout_name (from template system) > layout_template (legacy)
  const layoutName = page.layout_name || page.layout_template || 'default';

  // Get the layout component
  const LayoutComponent = getLayoutComponent(layoutName);

  if (!LayoutComponent) {
    console.error(`No layout component found for: ${layoutName}`);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Template Error</h1>
        <p className="text-gray-600">
          Layout template "{layoutName}" not found.
        </p>
      </div>
    );
  }

  // Sort sections by order_index
  const sortedSections = [...(page.sections || [])].sort(
    (a, b) => a.order_index - b.order_index
  );

  return (
    <LayoutComponent
      sections={sortedSections}
      page={{
        title: page.title,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        template_variables: page.template_variables,
      }}
    />
  );
};

export default TemplateRenderer;
