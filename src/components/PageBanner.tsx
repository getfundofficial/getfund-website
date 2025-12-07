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

  // Generate tint overlay style
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

  return (
    <section
      className="relative text-white py-16 overflow-hidden"
      style={{
        background: hasBackgroundImage
          ? `url(${bannerBackground.imageUrl})`
          : defaultGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Tint Overlay - Only show if background image exists */}
      {hasBackgroundImage && (
        <div className="absolute inset-0" style={getTintStyle()} />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
            style={{ color: bannerBackground?.titleColor || '#FFFFFF' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-xl md:text-2xl leading-relaxed drop-shadow-md"
              style={{ color: bannerBackground?.subtitleColor || '#FCA5A5' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
