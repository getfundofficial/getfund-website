import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageUrl?: string;
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

/**
 * CTA Section Component
 *
 * Call-to-action section with button and optional background image
 * Used in: All layouts
 */
export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImageUrl,
}) => {
  return (
    <section
      className="cta-section relative py-20 px-4 sm:px-6 lg:px-8"
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImageUrl && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            backgroundImageUrl ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-lg sm:text-xl mb-8 ${
              backgroundImageUrl ? 'text-white' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        )}
        <Link
          to={buttonLink}
          className="inline-block bg-getfund-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-getfund-secondary transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};
