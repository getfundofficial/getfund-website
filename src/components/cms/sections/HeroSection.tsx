/**
 * Hero Section Renderer
 * Displays a hero banner with title, subtitle, background image, and CTA button
 */

import { PageSection } from '../../../services/cmsApi';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  section: PageSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const { title, subtitle, backgroundImage, ctaText, ctaLink } = section.content;

  return (
    <section
      className="relative bg-gradient-to-br from-getfund-primary via-red-800 to-red-900 text-white pt-20 pb-16"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-getfund-primary/90 via-red-800/90 to-red-900/90" />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              {subtitle}
            </p>
          )}

          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className="inline-block bg-white text-getfund-red px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-50 transition-colors shadow-lg"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
