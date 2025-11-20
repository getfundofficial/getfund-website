/**
 * Template Registry
 *
 * This file maps template names to their React components.
 * Templates are defined in code for version control and developer flexibility.
 */

import React from 'react';

// Layout Templates
import { DefaultLayout } from './layouts/DefaultLayout';
import { LandingPageLayout } from './layouts/LandingPageLayout';
import { FullWidthLayout } from './layouts/FullWidthLayout';

// Section Templates
import { HeroSection } from './sections/HeroSection';
import { TextSection } from './sections/TextSection';
import { StatsSection } from './sections/StatsSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { CTASection } from './sections/CTASection';
import { GallerySection } from './sections/GallerySection';

// Layout Template Registry
export const layoutRegistry: Record<string, React.ComponentType<any>> = {
  'default': DefaultLayout,
  'landing-page': LandingPageLayout,
  'full-width': FullWidthLayout,
};

// Section Template Registry
export const sectionRegistry: Record<string, React.ComponentType<any>> = {
  'hero': HeroSection,
  'text': TextSection,
  'stats': StatsSection,
  'features': FeaturesSection,
  'cta': CTASection,
  'gallery': GallerySection,
};

// Helper to get layout component
export function getLayoutComponent(layoutName: string): React.ComponentType<any> {
  return layoutRegistry[layoutName] || layoutRegistry['default'];
}

// Helper to get section component
export function getSectionComponent(sectionType: string): React.ComponentType<any> | null {
  return sectionRegistry[sectionType] || null;
}

// Template metadata for documentation
export interface TemplateMetadata {
  name: string;
  displayName: string;
  description: string;
  slots?: Array<{
    key: string;
    required: boolean;
    description: string;
  }>;
  props?: Record<string, {
    type: string;
    required: boolean;
    description: string;
    default?: any;
  }>;
}

export const layoutMetadata: Record<string, TemplateMetadata> = {
  'default': {
    name: 'default',
    displayName: 'Default Layout',
    description: 'Standard page layout with header, content area, and footer',
    slots: [
      { key: 'hero', required: false, description: 'Optional hero section at the top' },
      { key: 'content', required: true, description: 'Main content sections' },
      { key: 'cta', required: false, description: 'Call-to-action sections (max 2)' },
    ],
  },
  'landing-page': {
    name: 'landing-page',
    displayName: 'Landing Page',
    description: 'Marketing-focused landing page with hero, features, testimonials, and pricing',
    slots: [
      { key: 'hero', required: true, description: 'Hero banner section' },
      { key: 'features', required: false, description: 'Feature showcase sections (max 3)' },
      { key: 'testimonials', required: false, description: 'Customer testimonials section' },
      { key: 'pricing', required: false, description: 'Pricing table section' },
      { key: 'cta', required: true, description: 'Call-to-action section' },
    ],
  },
  'full-width': {
    name: 'full-width',
    displayName: 'Full Width',
    description: 'Full-width layout for immersive content without sidebars',
    slots: [
      { key: 'banner', required: true, description: 'Full-width banner section' },
      { key: 'content', required: true, description: 'Full-width content sections' },
    ],
  },
};

export const sectionMetadata: Record<string, TemplateMetadata> = {
  'hero': {
    name: 'hero',
    displayName: 'Hero Section',
    description: 'Full-width hero carousel with slides',
    props: {
      slides: {
        type: 'array',
        required: true,
        description: 'Array of slide objects with title, subtitle, image, and optional CTA',
      },
      autoplay: {
        type: 'boolean',
        required: false,
        description: 'Enable automatic slide transitions',
        default: true,
      },
      interval: {
        type: 'number',
        required: false,
        description: 'Autoplay interval in milliseconds',
        default: 5000,
      },
    },
  },
  'text': {
    name: 'text',
    displayName: 'Text Content',
    description: 'Rich text content block with optional alignment',
    props: {
      content: {
        type: 'string',
        required: true,
        description: 'HTML content to display',
      },
      alignment: {
        type: 'string',
        required: false,
        description: 'Text alignment: left, center, or right',
        default: 'left',
      },
    },
  },
  'stats': {
    name: 'stats',
    displayName: 'Statistics Display',
    description: 'Display key statistics and metrics',
    props: {
      stats: {
        type: 'array',
        required: true,
        description: 'Array of stat objects with label, value, and optional suffix',
      },
      layout: {
        type: 'string',
        required: false,
        description: 'Layout style: horizontal or grid',
        default: 'grid',
      },
    },
  },
  'features': {
    name: 'features',
    displayName: 'Feature Cards',
    description: 'Display features or services in card format',
    props: {
      features: {
        type: 'array',
        required: true,
        description: 'Array of feature objects with title, description, icon, and optional image',
      },
      columns: {
        type: 'number',
        required: false,
        description: 'Number of columns in the grid',
        default: 3,
      },
    },
  },
  'cta': {
    name: 'cta',
    displayName: 'Call to Action',
    description: 'Call-to-action section with button',
    props: {
      title: {
        type: 'string',
        required: true,
        description: 'CTA headline',
      },
      description: {
        type: 'string',
        required: false,
        description: 'Supporting text',
      },
      buttonText: {
        type: 'string',
        required: true,
        description: 'Button label',
      },
      buttonLink: {
        type: 'string',
        required: true,
        description: 'Button URL',
      },
      backgroundImageUrl: {
        type: 'string',
        required: false,
        description: 'Optional background image',
      },
    },
  },
  'gallery': {
    name: 'gallery',
    displayName: 'Image Gallery',
    description: 'Display images in grid or carousel format',
    props: {
      images: {
        type: 'array',
        required: true,
        description: 'Array of image objects with url, caption, and alt text',
      },
      layout: {
        type: 'string',
        required: false,
        description: 'Display layout: grid or carousel',
        default: 'grid',
      },
      columns: {
        type: 'number',
        required: false,
        description: 'Number of columns for grid layout',
        default: 3,
      },
    },
  },
};
