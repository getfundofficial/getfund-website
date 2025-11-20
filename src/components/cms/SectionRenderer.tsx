/**
 * Universal Section Renderer
 * Renders CMS page sections based on their type
 */

import { PageSection } from '../../services/cmsApi';
import HeroSection from './sections/HeroSection';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import CTASection from './sections/CTASection';
import StatsSection from './sections/StatsSection';
import GallerySection from './sections/GallerySection';
import VideoSection from './sections/VideoSection';

interface SectionRendererProps {
  section: PageSection;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  if (!section.is_active) {
    return null;
  }

  switch (section.section_type) {
    case 'hero':
      return <HeroSection section={section} />;

    case 'text':
    case 'html':
      return <TextSection section={section} />;

    case 'image':
      return <ImageSection section={section} />;

    case 'cta':
      return <CTASection section={section} />;

    case 'stats':
      return <StatsSection section={section} />;

    case 'gallery':
      return <GallerySection section={section} />;

    case 'video':
      return <VideoSection section={section} />;

    default:
      console.warn(`Unknown section type: ${section.section_type}`);
      return null;
  }
}
