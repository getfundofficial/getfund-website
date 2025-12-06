import React from 'react';

interface BannerBackground {
  imageUrl?: string | null;
  tintColor?: string;
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
 * Supports background images with tinted overlays or solid gradients
 */
export default function PageBanner({
  title,
  subtitle,
  bannerBackground,
  defaultGradient = 'linear-gradient(to bottom right, #DC143C, #B22222, #8B0000)',
}: PageBannerProps) {
  const hasBackgroundImage = bannerBackground?.imageUrl;

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
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: bannerBackground.tintColor || '#DC143C',
            opacity: (bannerBackground.tintOpacity ?? 50) / 100,
          }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
