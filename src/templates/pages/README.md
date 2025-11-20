# Page Templates

This directory contains **page-specific templates** that define complete page layouts for the GETFund website. Each template is a self-contained React component that receives content from the CMS.

## Overview

Unlike the generic section-based approach, page templates provide pre-designed layouts for specific page types (About, Contact, etc.). Content is managed through the CMS and passed to the template as props.

## Architecture

```
CMS (Page Editor)
    ↓
    Sets layout_template: "about" | "contact" | "generic"
    ↓
    Stores content in page_sections table
    ↓
Website (CMSPage component)
    ↓
    Fetches page from API
    ↓
    getPageTemplate(layout_template)
    ↓
    Renders template with content
```

## Available Templates

### 1. About Page (`about`)
**File:** `AboutPage.tsx`

**Description:** Template for About Us / Who We Are pages

**Content Structure:**
```typescript
{
  mission?: string,           // HTML content
  vision?: string,            // HTML content
  history?: string,           // HTML content
  leadership?: [
    {
      name: string,
      title: string,
      imageUrl?: string,
      bio?: string
    }
  ]
}
```

**Template Variables:**
```typescript
{
  heroSubtitle?: string       // Optional subtitle in hero section
}
```

**Usage in CMS:**
1. Create a new page with slug `who-we-are`
2. Select template: "About Page"
3. Add a section with type `page_content`
4. Fill in the content fields (mission, vision, etc.)
5. Optionally set `heroSubtitle` in template variables

---

### 2. Contact Page (`contact`)
**File:** `ContactPage.tsx`

**Description:** Template for Contact pages with form, locations, and social links

**Content Structure:**
```typescript
{
  contactEmail?: string,
  contactPhone?: string,
  officeLocations?: [
    {
      name: string,
      address: string,
      phone?: string,
      email?: string,
      mapUrl?: string
    }
  ],
  socialMedia?: {
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    instagram?: string
  }
}
```

**Template Variables:**
```typescript
{
  subtitle?: string           // Optional subtitle in hero section
}
```

**Usage in CMS:**
1. Create a new page with slug `contact`
2. Select template: "Contact Page"
3. Add a section with type `page_content`
4. Fill in contact information

---

### 3. Generic Page (`generic`)
**Description:** Falls back to section-based rendering

Use this when you want to build a page with individual sections (hero, text, stats, CTA, etc.) rather than a pre-designed template.

---

## How to Create a New Page Template

### Step 1: Create the Template Component

Create a new file in this directory, e.g., `ProgramsPage.tsx`:

```typescript
import React from 'react';

interface ProgramsPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    introduction?: string;
    programs?: Array<{
      name: string;
      description: string;
      imageUrl?: string;
    }>;
  };
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ pageData, content }) => {
  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-getfund-primary to-getfund-secondary py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            {pageData.title}
          </h1>
        </div>
      </section>

      {/* Introduction */}
      {content.introduction && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content.introduction }}
            />
          </div>
        </section>
      )}

      {/* Programs Grid */}
      {content.programs && content.programs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.programs.map((program, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {program.imageUrl && (
                    <img
                      src={program.imageUrl}
                      alt={program.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
```

### Step 2: Register the Template

Edit `index.ts` to add your template:

```typescript
import { ProgramsPage } from './ProgramsPage';

export const pageTemplateRegistry: Record<string, React.ComponentType<any>> = {
  'about': AboutPage,
  'contact': ContactPage,
  'programs': ProgramsPage,  // Add this
};

export const pageTemplateMetadata: Record<string, PageTemplateMetadata> = {
  // ... existing templates
  'programs': {
    name: 'programs',
    displayName: 'Programs Page',
    description: 'Template for displaying educational programs',
    contentSchema: {
      type: 'object',
      properties: {
        introduction: { type: 'string', format: 'html' },
        programs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              imageUrl: { type: 'string', format: 'url' },
            },
            required: ['name', 'description'],
          },
        },
      },
    },
  },
};
```

### Step 3: Add to CMS Template List

Edit `getfund-cms/frontend/src/pages/PageEditorPage.tsx`:

```typescript
const AVAILABLE_PAGE_TEMPLATES = [
  { name: 'about', displayName: 'About Page', description: '...' },
  { name: 'contact', displayName: 'Contact Page', description: '...' },
  { name: 'programs', displayName: 'Programs Page', description: 'Template for displaying educational programs' },  // Add this
  { name: 'generic', displayName: 'Generic Page', description: '...' },
];
```

### Step 4: Use in CMS

1. Go to CMS → Pages → Create New Page
2. Select "Programs Page" as the template
3. Add a section with type `page_content`
4. Set the content as JSON:
```json
{
  "introduction": "<p>Our educational programs...</p>",
  "programs": [
    {
      "name": "Scholarship Program",
      "description": "Supporting students...",
      "imageUrl": "https://..."
    }
  ]
}
```
5. Publish the page

---

## Content Management

### Option 1: Single Section (Recommended for Page Templates)

Store all content in one section with `section_type = 'page_content'`:

```sql
INSERT INTO page_sections (page_id, section_type, content) VALUES (
  'page-uuid',
  'page_content',
  '{
    "mission": "<p>Our mission is...</p>",
    "vision": "<p>Our vision is...</p>",
    "leadership": [...]
  }'
);
```

### Option 2: Multiple Sections (For Generic Pages)

Use individual sections that map to components:

```sql
INSERT INTO page_sections (page_id, section_key, section_type, content) VALUES
  ('page-uuid', 'hero', 'hero', '{"slides": [...]}'),
  ('page-uuid', 'content-1', 'text', '{"content": "..."}'),
  ('page-uuid', 'cta', 'cta', '{"title": "...", "buttonText": "..."}');
```

---

## Template Variables

Template variables are page-level settings stored in `pages.template_variables`:

```typescript
// In CMS page editor
{
  "heroSubtitle": "Supporting Education in Ghana",
  "showSocialLinks": true,
  "contactFormEnabled": true
}

// In template
const { heroSubtitle } = pageData.template_variables || {};
```

---

## Best Practices

1. **Keep Templates Focused**: Each template should serve a specific page type
2. **Use Semantic HTML**: Proper heading hierarchy, ARIA labels, etc.
3. **Mobile-First**: Design for mobile screens first
4. **Accessibility**: Add alt text, ARIA labels, keyboard navigation
5. **Content Schema**: Document expected content structure clearly
6. **Defaults**: Provide sensible defaults for optional fields
7. **Error Handling**: Gracefully handle missing content
8. **Tailwind Classes**: Use existing utility classes for consistency

---

## File Structure

```
templates/
├── pages/                    # Page-specific templates
│   ├── AboutPage.tsx        # About/Who We Are template
│   ├── ContactPage.tsx      # Contact page template
│   ├── index.ts             # Registry and exports
│   └── README.md            # This file
├── layouts/                  # Layout components (legacy)
│   ├── DefaultLayout.tsx
│   ├── LandingPageLayout.tsx
│   └── FullWidthLayout.tsx
├── sections/                 # Reusable section components
│   ├── HeroSection.tsx
│   ├── TextSection.tsx
│   ├── CTASection.tsx
│   └── ...
└── registry.ts              # Component registry (legacy)
```

---

## Migration from Sections to Templates

To convert a section-based page to use a template:

1. **Analyze Current Sections**: Review what sections the page uses
2. **Design Template**: Create a new template that matches the layout
3. **Extract Content**: Combine section content into single content object
4. **Update Page**: Change `layout_template` to new template name
5. **Test**: Verify the page renders correctly

---

## Troubleshooting

### Template Not Rendering
- Check that template is registered in `index.ts`
- Verify `layout_template` field in database matches template name
- Check browser console for errors

### Missing Content
- Verify content structure matches template interface
- Check that section has `section_type = 'page_content'`
- Use browser dev tools to inspect props passed to template

### Styling Issues
- Ensure Tailwind classes are working (check build process)
- Verify custom classes are defined in tailwind.config.js
- Check for CSS conflicts with existing styles

---

## Related Documentation

- [Section Components](../sections/README.md)
- [Layout Templates](../layouts/README.md) (legacy)
- [Template Renderer](../TemplateRenderer.tsx)
- [CMS API Documentation](../../services/cmsApi.ts)
