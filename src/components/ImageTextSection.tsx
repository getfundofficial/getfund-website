import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ImageTextSectionProps {
  title: string;
  description: string | React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  reversed?: boolean; // Image on right instead of left
  overlayColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ImageTextSection({
  title,
  description,
  imageUrl,
  imageAlt = '',
  ctaText,
  ctaLink,
  reversed = false,
  overlayColor = 'from-getfund-primary/20 to-transparent',
  className = '',
  children,
}: ImageTextSectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}>
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-2xl group">
              <img
                src={imageUrl}
                alt={imageAlt || title}
                className="w-full h-64 sm:h-80 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Optional gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor} opacity-60`} />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>

            <div className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 space-y-4">
              {typeof description === 'string' ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>

            {children}

            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 bg-getfund-primary hover:bg-getfund-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
