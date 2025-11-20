# Template System Documentation

## Overview

The template system provides a code-based approach to defining page layouts and section components. Templates are defined in code (not in the database) for better version control, developer experience, and flexibility.

## Directory Structure

```
src/templates/
├── README.md                    # This file
├── registry.ts                  # Template registry and metadata
├── TemplateRenderer.tsx         # Main renderer component
├── layouts/                     # Page layout templates
│   ├── DefaultLayout.tsx        # Standard layout
│   ├── LandingPageLayout.tsx    # Marketing landing page
│   └── FullWidthLayout.tsx      # Full-width layout
└── sections/                    # Section components
    ├── HeroSection.tsx          # Hero carousel
    ├── TextSection.tsx          # Rich text content
    ├── StatsSection.tsx         # Statistics display
    ├── FeaturesSection.tsx      # Feature cards
    ├── CTASection.tsx           # Call-to-action
    └── GallerySection.tsx       # Image gallery
```

## How It Works

### 1. Layout Templates

Layouts define the overall structure of a page with named "slots" for sections.

**Available Layouts:**
- `default` - Standard layout with hero, content, and CTA slots
- `landing-page` - Marketing page with hero, features, testimonials, pricing, CTA
- `full-width` - Immersive layout with full-width sections

**Example Layout Usage:**
```tsx
import { DefaultLayout } from './layouts/DefaultLayout';

<DefaultLayout
  sections={pageSections}
  page={pageData}
/>
```

### 2. Section Components

Sections are reusable content blocks that can be placed in layout slots.

**Available Sections:**
- `hero` - Full-width hero carousel with slides
- `text` - Rich text content block
- `stats` - Statistics/metrics display
- `features` - Feature cards grid
- `cta` - Call-to-action with button
- `gallery` - Image gallery (grid or carousel)

### 3. Using the Template System

#### In CMS

1. Create a page and assign sections via the CMS
2. Set the `layout_template` or link to a `layout_id`
3. Sections are assigned to slots via `section_key`

#### In Code

```tsx
import { TemplateRenderer } from './templates/TemplateRenderer';

function PageView({ pageData }) {
  return <TemplateRenderer page={pageData} />;
}
```

The `TemplateRenderer` automatically:
- Selects the correct layout
- Renders sections in the right slots
- Sorts sections by `order_index`
- Passes variables to components

## Creating New Templates

### Adding a New Layout

1. Create the layout file:
```tsx
// src/templates/layouts/MyCustomLayout.tsx
import React from 'react';
import { getSectionComponent } from '../registry';

export const MyCustomLayout: React.FC<LayoutProps> = ({ sections, page }) => {
  // Your layout logic
  return <div>...</div>;
};
```

2. Register it in `registry.ts`:
```tsx
import { MyCustomLayout } from './layouts/MyCustomLayout';

export const layoutRegistry = {
  // ... existing layouts
  'my-custom': MyCustomLayout,
};

export const layoutMetadata = {
  'my-custom': {
    name: 'my-custom',
    displayName: 'My Custom Layout',
    description: 'Description of your layout',
    slots: [
      { key: 'header', required: true, description: 'Header section' },
      // ...
    ],
  },
};
```

3. Use it in CMS by setting `layout_template` to `'my-custom'`

### Adding a New Section Type

1. Create the section file:
```tsx
// src/templates/sections/MySection.tsx
export const MySection: React.FC<MySectionProps> = (props) => {
  return <div>...</div>;
};
```

2. Register it in `registry.ts`:
```tsx
import { MySection } from './sections/MySection';

export const sectionRegistry = {
  // ... existing sections
  'my-section': MySection,
};

export const sectionMetadata = {
  'my-section': {
    name: 'my-section',
    displayName: 'My Section',
    description: 'Description',
    props: {
      // Document your props
    },
  },
};
```

3. Create sections in CMS with `section_type: 'my-section'`

## Template Variables

Templates support variable substitution for dynamic content.

### Page-Level Variables
```json
{
  "template_variables": {
    "companyName": "GETFund",
    "year": "2024"
  }
}
```

### Section-Level Variables
```json
{
  "template_variables": {
    "theme": "dark",
    "highlight": true
  }
}
```

Access variables in components:
```tsx
export const MySection: React.FC<Props> = ({
  variables,
  pageVariables
}) => {
  const theme = variables?.theme || 'light';
  const company = pageVariables?.companyName;
  // ...
};
```

## Best Practices

1. **Keep Components Reusable** - Sections should work in any layout
2. **Use Props for Configuration** - Don't hardcode values
3. **Document Your Templates** - Update metadata in registry.ts
4. **Handle Missing Data** - Provide defaults and fallbacks
5. **Version Control** - Templates are in git, so use branches for changes
6. **Type Safety** - Use TypeScript interfaces for props

## Database Integration

The template system works with the database schema:

- `pages.layout_template` - Legacy string-based layout selection
- `pages.layout_id` - Reference to `page_layouts` table (optional)
- `pages.template_variables` - Page-level variables (JSONB)
- `page_sections.section_type` - Maps to section registry
- `page_sections.section_key` - Slot assignment
- `page_sections.content` - Section data (JSONB)
- `page_sections.template_variables` - Section-level variables (JSONB)

## Migration from Old System

The old Hero component can be replaced with:

```tsx
// Old way
<Hero slides={heroSlides} />

// New way
<TemplateRenderer page={pageWithHeroSection} />
```

Where `pageWithHeroSection` has:
- `layout_template: 'default'`
- A section with `section_type: 'hero'` and `section_key: 'hero'`
- Section content containing slides data

## Examples

See [TEMPLATE_SYSTEM_DESIGN.md](../../../TEMPLATE_SYSTEM_DESIGN.md) for detailed examples and architecture documentation.
