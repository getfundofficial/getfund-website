import React from 'react';

interface BannerBackground {
  imageUrl?: string | null;
  tintColor?: string;
  tintColor2?: string;
  gradientDirection?: 'to right' | 'to bottom' | 'to bottom right' | 'to top right';
  useGradient?: boolean;
  tintOpacity?: number;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bannerBackground?: BannerBackground;
  defaultGradient?: string;
}

/**
 * Reusable page banner component with CMS-editable background
 * Supports background images with tinted overlays (solid or gradient) or solid gradients
 */
export default function PageBanner({
  title,
  subtitle,
  bannerBackground,
  defaultGradient = 'linear-gradient(to bottom right, #DC143C, #B22222, #8B0000)',
}: PageBannerProps) {
  const hasBackgroundImage = bannerBackground?.imageUrl;
  const useGradient = bannerBackground?.useGradient ?? false;

  // Generate tint overlay style - supports both solid and gradient
  const getTintStyle = () => {
    if (!hasBackgroundImage) return {};

    const opacity = (bannerBackground.tintOpacity ?? 50) / 100;

    if (useGradient) {
      const direction = bannerBackground.gradientDirection || 'to right';
      const color1 = bannerBackground.tintColor || '#DC143C';
      const color2 = bannerBackground.tintColor2 || '#B22222';
      return {
        backgroundImage: `linear-gradient(${direction}, ${color1}, ${color2})`,
        opacity,
      };
    } else {
      return {
        backgroundColor: bannerBackground.tintColor || '#DC143C',
        opacity,
      };
    }
  };

  // Generate background style - supports CMS gradient settings when no image
  const getBackgroundStyle = () => {
    if (hasBackgroundImage) {
      return {
        backgroundImage: `url(${bannerBackground.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    // No image - use gradient from CMS settings or default
    if (useGradient && bannerBackground?.tintColor && bannerBackground?.tintColor2) {
      const direction = bannerBackground.gradientDirection || 'to right';
      return {
        background: `linear-gradient(${direction}, ${bannerBackground.tintColor}, ${bannerBackground.tintColor2})`,
      };
    }

    // Use solid color or default gradient
    return {
      background: bannerBackground?.tintColor || defaultGradient,
    };
  };

  return (
    <section
      className="relative text-white py-24 md:py-32 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Tint Overlay - Only show if background image exists */}
      {hasBackgroundImage && (
        <div className="absolute inset-0" style={getTintStyle()} />
      )}
      {/* Additional subtle depth layer for modern feel */}
      {hasBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-5"
            style={{ color: bannerBackground?.titleColor || '#FFFFFF', letterSpacing: '-0.035em', lineHeight: '1.05' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: bannerBackground?.subtitleColor || 'rgba(255,255,255,0.8)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
