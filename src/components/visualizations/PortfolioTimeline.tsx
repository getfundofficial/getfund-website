import React, { useEffect, useState, useRef } from 'react';
import { PROGRAMMES_DATA, Programme, TOTAL_PORTFOLIO_PROJECTS, PORTFOLIO_DESCRIPTION } from '../../data/projectsPortfolio';
import AnimatedCounter from '../AnimatedCounter';

interface PortfolioTimelineProps {
  className?: string;
  showDescription?: boolean;
}

export default function PortfolioTimeline({
  className = '',
  showDescription = true,
}: PortfolioTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Find max project count for scaling
  const maxCount = Math.max(...PROGRAMMES_DATA.map(p => p.projectCount));

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
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const formatCount = (count: number, unit?: string) => {
    if (unit) {
      return `${count} ${unit}`;
    }
    return count.toLocaleString();
  };

  return (
    <div ref={ref} className={className}>
      {/* Header with total */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          {showDescription && (
            <p className="text-gray-600 text-sm md:text-base max-w-2xl">
              {PORTFOLIO_DESCRIPTION}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-bold" style={{ color: '#064e3b' }}>
            {isVisible ? (
              <AnimatedCounter end={TOTAL_PORTFOLIO_PROJECTS} duration={1500} />
            ) : (
              '0'
            )}
          </div>
          <div className="text-sm text-gray-500">Total Projects</div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="space-y-4">
        {PROGRAMMES_DATA.map((programme, index) => {
          const barWidth = (programme.projectCount / maxCount) * 100 * animationProgress;
          const delay = index * 100;

          return (
            <div
              key={programme.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProgramme(selectedProgramme?.id === programme.id ? null : programme)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProgramme(selectedProgramme?.id === programme.id ? null : programme);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={selectedProgramme?.id === programme.id}
              aria-label={`${programme.name}: ${formatCount(programme.projectCount, programme.unit)} projects`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {/* Programme info row */}
              <div className="flex items-center gap-4 mb-1">
                {/* Period badge */}
                <span
                  className="text-xs font-semibold px-2 py-1 text-white min-w-[90px] text-center"
                  style={{ backgroundColor: programme.color }}
                >
                  {programme.period}
                </span>

                {/* Programme name */}
                <span className="text-sm font-medium text-gray-800 flex-1 min-w-0 truncate">
                  {programme.shortName}
                  <span className="hidden md:inline text-gray-500 font-normal ml-2">
                    ({programme.name})
                  </span>
                </span>

                {/* Count */}
                <span className="text-sm font-bold text-gray-900 min-w-[80px] text-right">
                  {isVisible ? formatCount(programme.projectCount, programme.unit) : '0'}
                </span>
              </div>

              {/* Animated bar */}
              <div className="relative h-10 bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors">
                <div
                  className="absolute inset-y-0 left-0 flex items-center justify-end pr-3 transition-all duration-300"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: programme.color,
                    minWidth: barWidth > 0 ? '60px' : '0',
                  }}
                >
                  {barWidth > 15 && (
                    <span className="text-white text-sm font-semibold">
                      {formatCount(programme.projectCount, programme.unit)}
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {selectedProgramme?.id === programme.id && (
                <div
                  className="mt-2 p-4 bg-gray-50 border-l-4 animate-fadeIn"
                  style={{ borderLeftColor: programme.color }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{programme.name}</h4>
                  {programme.description && (
                    <p className="text-sm text-gray-600 mb-2">{programme.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Period:</span>{' '}
                      <span className="font-medium">{programme.period}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Projects:</span>{' '}
                      <span className="font-medium">{formatCount(programme.projectCount, programme.unit)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>{' '}
                      <span className="font-medium">{programme.endYear ? 'Completed' : 'Ongoing'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500 mb-3">Programme Colours</div>
        <div className="flex flex-wrap gap-3">
          {PROGRAMMES_DATA.map((programme) => (
            <div key={programme.id} className="flex items-center gap-2">
              <span
                className="w-3 h-3"
                style={{ backgroundColor: programme.color }}
              />
              <span className="text-xs text-gray-600">{programme.shortName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
