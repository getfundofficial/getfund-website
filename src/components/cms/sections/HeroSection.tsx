/**
 * Hero Section Renderer
 * Displays a hero banner with title, subtitle, background image, and CTA button
 * Supports CMS-controlled gradient and tint settings
 */

import { PageSection } from '../../../services/cmsApi';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  section: PageSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const { title, subtitle, backgroundImage, ctaText, ctaLink, bannerBackground } = section.content;

  // Get tint overlay style
  const getTintStyle = () => {
    if (!backgroundImage) return {};

    const opacity = (bannerBackground?.tintOpacity ?? 80) / 100;
    const useGradient = bannerBackground?.useGradient ?? false;

    if (useGradient && bannerBackground?.tintColor2) {
      const direction = bannerBackground.gradientDirection || 'to right';
      return {
        backgroundImage: `linear-gradient(${direction}, ${bannerBackground.tintColor || '#DC143C'}, ${bannerBackground.tintColor2})`,
        opacity,
      };
    }

    return {
      backgroundColor: bannerBackground?.tintColor || '#DC143C',
      opacity,
    };
  };

  // Get background style
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    const useGradient = bannerBackground?.useGradient ?? false;
    if (useGradient && bannerBackground?.tintColor && bannerBackground?.tintColor2) {
      const direction = bannerBackground.gradientDirection || 'to right';
      return {
        background: `linear-gradient(${direction}, ${bannerBackground.tintColor}, ${bannerBackground.tintColor2})`,
      };
    }

    return {
      backgroundColor: bannerBackground?.tintColor || '#DC143C',
    };
  };

  return (
    <section
      className="relative text-white pt-20 pb-16"
      style={getBackgroundStyle()}
    >
      {backgroundImage && (
        <div className="absolute inset-0" style={getTintStyle()} />
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
