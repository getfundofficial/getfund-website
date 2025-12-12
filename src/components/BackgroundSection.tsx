import React from 'react';

interface BackgroundSectionProps {
  backgroundImage: string;
  overlayOpacity?: number; // 0-100
  overlayColor?: string;
  useGradient?: boolean;
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl';
  gradientFrom?: string;
  gradientTo?: string;
  parallax?: boolean;
  minHeight?: string;
  className?: string;
  children: React.ReactNode;
}

export default function BackgroundSection({
  backgroundImage,
  overlayOpacity = 70,
  overlayColor = '#000000',
  useGradient = true,
  gradientDirection = 'to-r',
  gradientFrom = 'rgba(5, 150, 105, 0.9)', // getfund-primary
  gradientTo = 'rgba(25, 24, 37, 0.9)', // getfund-secondary
  parallax = false,
  minHeight = '400px',
  className = '',
  children,
}: BackgroundSectionProps) {
  const overlayStyle = useGradient
    ? {
        backgroundImage: `linear-gradient(${gradientDirection.replace('-', ' ')}, ${gradientFrom}, ${gradientTo})`,
      }
    : {
        backgroundColor: overlayColor,
        opacity: overlayOpacity / 100,
      };

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${parallax ? 'bg-fixed' : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {children}
        </div>
      </div>
    </section>
  );
}

// Pre-configured variants for common use cases
export function StatsBackgroundSection({
  backgroundImage,
  children,
  className = '',
}: {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BackgroundSection
      backgroundImage={backgroundImage}
      useGradient={false}
      overlayColor="#000000"
      overlayOpacity={55}
      minHeight="350px"
      className={className}
    >
      {children}
    </BackgroundSection>
  );
}

export function QuoteBackgroundSection({
  backgroundImage,
  children,
  className = '',
}: {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BackgroundSection
      backgroundImage={backgroundImage}
      useGradient={false}
      overlayColor="#000000"
      overlayOpacity={60}
      minHeight="300px"
      className={className}
    >
      {children}
    </BackgroundSection>
  );
}

export function CTABackgroundSection({
  backgroundImage,
  children,
  className = '',
}: {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BackgroundSection
      backgroundImage={backgroundImage}
      useGradient={true}
      gradientFrom="rgba(220, 20, 60, 0.9)" // Crimson red
      gradientTo="rgba(37, 99, 235, 0.9)" // Blue
      minHeight="250px"
      className={className}
    >
      {children}
    </BackgroundSection>
  );
}
