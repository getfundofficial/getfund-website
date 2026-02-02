import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface CompletionVerticalChartProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

// Sector descriptions
const SECTOR_DESCRIPTIONS: Record<string, string> = {
  basic: 'Primary and Junior High Schools infrastructure across Ghana',
  secondary: 'Senior High Schools and related facilities nationwide',
  eblock: 'Community Day Senior High Schools (E-Block Programme)',
  modelshs: 'Modern Model Senior High School facilities (V-Block)',
  tertiary: 'Universities, Polytechnics and Colleges of Education',
};

// Color palette matching page theme
const SECTOR_COLORS: Record<string, { complete: string; incomplete: string }> = {
  basic: { complete: '#059669', incomplete: '#e5e7eb' },
  secondary: { complete: '#2a3f75', incomplete: '#e5e7eb' },
  eblock: { complete: '#7c3aed', incomplete: '#e5e7eb' },
  modelshs: { complete: '#ea580c', incomplete: '#e5e7eb' },
  tertiary: { complete: '#0891b2', incomplete: '#e5e7eb' },
};

// Complete building icon
function CompleteBuildingIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="4" y="10" width="16" height="12" rx="1" />
      <polygon points="12,2 2,12 22,12" />
      <rect x="10" y="16" width="4" height="6" fill="white" opacity="0.3" />
      <rect x="6" y="12" width="3" height="3" fill="white" opacity="0.3" />
      <rect x="15" y="12" width="3" height="3" fill="white" opacity="0.3" />
    </svg>
  );
}

// Incomplete building icon
function IncompleteBuildingIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="4" y="10" width="16" height="12" rx="1" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
      <polygon points="12,2 2,12 22,12" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="2" y1="6" x2="2" y2="22" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="22" y1="6" x2="22" y2="22" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="1" y1="10" x2="23" y2="10" stroke="#f59e0b" strokeWidth="1" />
      <line x1="1" y1="16" x2="23" y2="16" stroke="#f59e0b" strokeWidth="1" />
    </svg>
  );
}

// Waffle grid component
interface WaffleGridProps {
  completionRate: number;
  completeColor: string;
  incompleteColor: string;
  gridSize?: number;
  iconSize?: number;
  animationProgress: number;
}

function WaffleGrid({
  completionRate,
  completeColor,
  incompleteColor,
  gridSize = 10,
  iconSize = 20,
  animationProgress
}: WaffleGridProps) {
  const totalCells = gridSize * gridSize;
  const animatedRate = completionRate * animationProgress;
  const completedCells = Math.round((animatedRate / 100) * totalCells);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${iconSize}px)`,
        gap: '2px',
      }}
    >
      {Array.from({ length: totalCells }).map((_, index) => {
        const isComplete = index < completedCells;
        return (
          <div
            key={index}
            className="flex items-center justify-center transition-all duration-300"
            style={{
              width: iconSize,
              height: iconSize,
              opacity: animationProgress > 0 ? 1 : 0,
              transform: `scale(${animationProgress > 0 ? 1 : 0.5})`,
              transitionDelay: `${(index % 20) * 8}ms`
            }}
          >
            {isComplete ? (
              <CompleteBuildingIcon color={completeColor} size={iconSize} />
            ) : (
              <IncompleteBuildingIcon color={incompleteColor} size={iconSize} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CompletionVerticalChart({
  className = '',
  title = 'Progress Completion Summary',
  subtitle = 'Project completion status across all education sectors',
}: CompletionVerticalChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const mainSectors = SECTOR_COMPLETION_DATA.filter(s => !s.isSubSector);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            if (prefersReducedMotion) {
              setProgress(1);
              return;
            }

            const startTime = performance.now();
            const duration = 1500;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const rawProgress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - rawProgress, 4);
              setProgress(easeOutQuart);

              if (rawProgress < 1) {
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

  return (
    <section ref={ref} className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 max-w-2xl">{subtitle}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">
              <AnimatedCounter end={COMPLETION_TOTALS.total} duration={1500} />
            </div>
            <div className="text-sm font-semibold text-gray-900">Total Projects</div>
          </div>
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#059669' }}>
              <AnimatedCounter end={COMPLETION_TOTALS.completed} duration={1500} />
            </div>
            <div className="text-sm font-semibold text-gray-900">Completed</div>
          </div>
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#059669' }}>
              <AnimatedCounter end={OVERALL_COMPLETION_RATE} duration={1500} suffix="%" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Completion Rate</div>
          </div>
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#f59e0b' }}>
              <AnimatedCounter end={COMPLETION_TOTALS.uncompleted} duration={1500} />
            </div>
            <div className="text-sm font-semibold text-gray-900">In Progress</div>
          </div>
        </div>

        {/* Sector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainSectors.map((sector, index) => {
            const colors = SECTOR_COLORS[sector.id] || { complete: '#059669', incomplete: '#e5e7eb' };
            const description = SECTOR_DESCRIPTIONS[sector.id] || '';
            const subSectors = SECTOR_COMPLETION_DATA.filter(s => s.parentId === sector.id);

            return (
              <div
                key={sector.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="px-5 py-4 text-white" style={{ backgroundColor: colors.complete }}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{sector.shortName}</h4>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {Math.round(sector.completionRate * progress)}%
                      </div>
                      <span className="text-white/80 text-xs">complete</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-4">{description}</p>

                  {/* Waffle Grid */}
                  <div className="flex justify-center mb-5 bg-gray-50 rounded-lg p-3">
                    <WaffleGrid
                      completionRate={sector.completionRate}
                      completeColor={colors.complete}
                      incompleteColor={colors.incomplete}
                      gridSize={10}
                      iconSize={18}
                      animationProgress={progress}
                    />
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Total</span>
                      <span className="font-semibold text-gray-900">{sector.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.complete }} />
                        <span className="text-gray-500">Completed</span>
                      </div>
                      <span className="font-semibold" style={{ color: colors.complete }}>
                        {sector.completed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-gray-500">In Progress</span>
                      </div>
                      <span className="font-semibold text-amber-600">
                        {(sector.total - sector.completed).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Sub-sectors */}
                  {subSectors.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2 font-medium">Includes:</p>
                      <div className="space-y-1">
                        {subSectors.map((sub) => {
                          const subColors = SECTOR_COLORS[sub.id] || colors;
                          return (
                            <div key={sub.id} className="flex justify-between text-xs bg-gray-50 rounded px-3 py-2">
                              <span className="text-gray-600">{sub.shortName}</span>
                              <span className="font-medium" style={{ color: subColors.complete }}>
                                {sub.total} ({sub.completionRate}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CompleteBuildingIcon color="#059669" size={18} />
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <IncompleteBuildingIcon color="#d1d5db" size={18} />
            <span className="text-gray-600">Under Construction</span>
          </div>
          <span className="text-gray-400 text-xs">Each grid = 100 units</span>
        </div>
      </div>
    </section>
  );
}
