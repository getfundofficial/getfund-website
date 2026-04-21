import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorImage?: string;
  location?: string;
}

interface TestimonialCardProps extends Testimonial {
  variant?: 'card' | 'minimal' | 'featured';
  className?: string;
}

export default function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorImage,
  location,
  variant = 'card',
  className = '',
}: TestimonialCardProps) {
  if (variant === 'minimal') {
    return (
      <div className={`text-center ${className}`}>
        <Quote className="w-10 h-10 text-getfund-gold mx-auto mb-4 opacity-80" />
        <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          {authorImage && (
            <img
              src={authorImage}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{authorName}</p>
            {authorRole && (
              <p className="text-sm text-gray-500">{authorRole}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-white rounded-xl shadow-xl p-8 sm:p-10 ${className}`}>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {authorImage && (
            <div className="flex-shrink-0">
              <img
                src={authorImage}
                alt={authorName}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg border-4 border-getfund-gold"
              />
            </div>
          )}
          <div className="flex-1 text-center lg:text-left">
            <Quote className="w-12 h-12 text-getfund-gold mb-4 mx-auto lg:mx-0 opacity-80" />
            <blockquote className="text-xl sm:text-2xl text-gray-700 italic mb-6 leading-relaxed">
              "{quote}"
            </blockquote>
            <div>
              <p className="font-bold text-xl text-gray-900">{authorName}</p>
              {authorRole && (
                <p className="text-getfund-primary font-medium">{authorRole}</p>
              )}
              {location && (
                <p className="text-sm text-gray-500 mt-1">{location}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`bg-white rounded-xl shadow-lg p-3 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-getfund-gold mb-2 sm:mb-4 opacity-80" />
      <blockquote className="text-[10px] sm:text-base text-gray-700 italic mb-3 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-2 sm:gap-4 border-t pt-2 sm:pt-4">
        {authorImage ? (
          <img
            src={authorImage}
            alt={authorName}
            className="w-8 h-8 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-getfund-primary to-getfund-secondary flex items-center justify-center text-white font-bold text-xs sm:text-xl flex-shrink-0">
            {authorName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-[10px] sm:text-base text-gray-900 truncate">{authorName}</p>
          {authorRole && (
            <p className="text-[9px] sm:text-sm text-gray-500 truncate">{authorRole}</p>
          )}
          {location && (
            <p className="text-[8px] sm:text-xs text-gray-400 truncate hidden sm:block">{location}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Testimonials Section Component
interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: 'grid' | 'carousel' | 'featured';
  className?: string;
}

export function TestimonialsSection({
  title = 'What Our Beneficiaries Say',
  subtitle = 'Hear from students and communities whose lives have been transformed through GETFund support',
  testimonials,
  variant = 'grid',
  className = '',
}: TestimonialsSectionProps) {
  return (
    <section className={`py-10 sm:py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-xs sm:text-lg max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>

        {variant === 'featured' && testimonials.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <TestimonialCard {...testimonials[0]} variant="featured" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} variant="card" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
