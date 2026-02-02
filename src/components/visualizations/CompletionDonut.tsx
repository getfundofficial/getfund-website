import React, { useEffect, useState, useRef } from 'react';
import AnimatedCounter from '../AnimatedCounter';

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface CompletionDonutProps {
  data: DonutSegment[];
  total: number;
  centerLabel?: string;
  centerSubLabel?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function CompletionDonut({
  data,
  total,
  centerLabel = 'Total Projects',
  centerSubLabel,
  size = 280,
  strokeWidth = 40,
  className = '',
}: CompletionDonutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            if (prefersReducedMotion) {
              setAnimationProgress(1);
              return;
            }

            // Animate the donut fill
            const duration = 1500;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setAnimationProgress(easeOutQuart);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Calculate segment angles
  const segments = data.map((segment, index) => {
    const percentage = segment.value / total;
    const previousPercentages = data
      .slice(0, index)
      .reduce((sum, s) => sum + s.value / total, 0);

    return {
      ...segment,
      percentage,
      offset: previousPercentages,
    };
  });

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        role="img"
        aria-label={`Donut chart showing project completion: ${data.map(d => `${d.label}: ${d.value.toLocaleString()}`).join(', ')}`}
      >
        <title>Project Completion Status</title>
        <desc>A donut chart showing the breakdown of {total.toLocaleString()} total projects by completion status</desc>

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segments.map((segment, index) => {
          const segmentLength = circumference * segment.percentage * animationProgress;
          const segmentOffset = circumference * segment.offset * animationProgress;
          const dashOffset = circumference - segmentOffset;

          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={dashOffset}
              className="transition-all duration-100"
              style={{
                transformOrigin: 'center',
              }}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-3xl md:text-4xl font-bold text-gray-900">
          {isVisible ? (
            <AnimatedCounter end={total} duration={1500} />
          ) : (
            '0'
          )}
        </div>
        <div className="text-sm text-gray-600 mt-1">{centerLabel}</div>
        {centerSubLabel && (
          <div className="text-xs text-gray-500">{centerSubLabel}</div>
        )}
      </div>
    </div>
  );
}
