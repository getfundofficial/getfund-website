import React, { useEffect, useState, useRef } from 'react';
import { School, GraduationCap, BookOpen } from 'lucide-react';
import { COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

// Icon mapping for main sectors
const SECTOR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Basic Education': School,
  'Secondary Education': GraduationCap,
  'Tertiary Education': BookOpen,
};

interface SectorProgressRingProps {
  sector: string;
  shortName: string;
  completed: number;
  progress70to99: number;
  progress30to69: number;
  belowThreshold: number;
  total: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  animationDelay?: number;
}

export default function SectorProgressRing({
  sector,
  shortName,
  completed,
  progress70to99,
  progress30to69,
  belowThreshold,
  total,
  color,
  size = 160,
  strokeWidth = 12,
  className = '',
  animationDelay = 0,
}: SectorProgressRingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate percentages
  const completionRate = Math.round((completed / total) * 100);
  const completedPct = completed / total;
  const progress70Pct = progress70to99 / total;
  const progress30Pct = progress30to69 / total;
  const belowPct = belowThreshold / total;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            // Apply animation delay
            setTimeout(() => {
              setIsVisible(true);

              if (prefersReducedMotion) {
                setAnimationProgress(1);
                return;
              }

              const duration = 1200;
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
            }, animationDelay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, animationDelay]);

  // Ring segments (from outside to inside: completed, 70-99%, 30-69%, <30%)
  const rings = [
    { pct: completedPct, color: COMPLETION_COLORS.completed, radius: radius },
    { pct: progress70Pct, color: COMPLETION_COLORS.progress70to99, radius: radius - strokeWidth - 4 },
    { pct: progress30Pct, color: COMPLETION_COLORS.progress30to69, radius: radius - (strokeWidth + 4) * 2 },
    { pct: belowPct, color: COMPLETION_COLORS.belowThreshold, radius: radius - (strokeWidth + 4) * 3 },
  ].filter(ring => ring.pct > 0 && ring.radius > 0);

  return (
    <div
      ref={ref}
      className={`bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-colors ${className}`}
    >
      {/* Sector name with icon */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {(() => {
          const IconComponent = SECTOR_ICONS[sector];
          return IconComponent ? (
            <IconComponent className="w-5 h-5 text-white/80" />
          ) : null;
        })()}
        <h3 className="text-lg font-bold text-white">{shortName}</h3>
      </div>

      {/* Ring chart */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          role="img"
          aria-label={`${sector} completion: ${completionRate}%`}
        >
          {/* Background rings */}
          {rings.map((ring, index) => (
            <circle
              key={`bg-${index}`}
              cx={center}
              cy={center}
              r={ring.radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />
          ))}

          {/* Animated rings */}
          {rings.map((ring, index) => {
            const ringCircumference = 2 * Math.PI * ring.radius;
            const segmentLength = ringCircumference * ring.pct * animationProgress;

            return (
              <circle
                key={`ring-${index}`}
                cx={center}
                cy={center}
                r={ring.radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${ringCircumference - segmentLength}`}
                strokeLinecap="butt"
                className="transition-all duration-100"
              />
            );
          })}
        </svg>

        {/* Center percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {isVisible ? (
              <AnimatedCounter end={completionRate} duration={1200} suffix="%" />
            ) : (
              '0%'
            )}
          </span>
          <span className="text-xs text-white/60">complete</span>
        </div>
      </div>

      {/* Stats breakdown */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
            <span className="text-white/70">Completed</span>
          </div>
          <span className="font-semibold text-white">{completed.toLocaleString()}</span>
        </div>
        {progress70to99 > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }} />
              <span className="text-white/70">70-99%</span>
            </div>
            <span className="font-semibold text-white">{progress70to99.toLocaleString()}</span>
          </div>
        )}
        {progress30to69 > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }} />
              <span className="text-white/70">30-69%</span>
            </div>
            <span className="font-semibold text-white">{progress30to69.toLocaleString()}</span>
          </div>
        )}
        {belowThreshold > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2" style={{ backgroundColor: COMPLETION_COLORS.belowThreshold }} />
              <span className="text-white/70">&lt;30%</span>
            </div>
            <span className="font-semibold text-white">{belowThreshold.toLocaleString()}</span>
          </div>
        )}
        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-sm">
          <span className="text-white/70">Total</span>
          <span className="font-bold text-white">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
