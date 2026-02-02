import React, { useEffect, useState, useRef } from 'react';
import { School, GraduationCap, Building2, Landmark, BookOpen } from 'lucide-react';
import { COMPLETION_COLORS, COMPLETION_LABELS, SectorCompletion } from '../../data/completionData';

// Icon mapping for each sector
const SECTOR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  basic: School,
  secondary: GraduationCap,
  eblock: Building2,
  modelshs: Landmark,
  tertiary: BookOpen,
};

interface CompletionStackedBarsProps {
  data: SectorCompletion[];
  className?: string;
  showValues?: boolean;
  animationDuration?: number;
}

export default function CompletionStackedBars({
  data,
  className = '',
  showValues = true,
  animationDuration = 1200,
}: CompletionStackedBarsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / animationDuration, 1);
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
  }, [isVisible, animationDuration]);

  // Find the maximum total for scaling (only from main sectors, not sub-sectors)
  const mainSectors = data.filter(d => !d.isSubSector);
  const maxTotal = Math.max(...mainSectors.map(d => d.total));

  // Group sectors with their sub-sectors
  const renderSectorBar = (sector: SectorCompletion, index: number, isSubSector: boolean = false) => {
    // For sub-sectors, scale relative to their own total so colors fill the bar
    // For main sectors, scale relative to maxTotal for comparison
    const scaleBase = isSubSector ? sector.total : maxTotal;
    const completedWidth = (sector.completed / scaleBase) * 100 * animationProgress;
    const progress70Width = (sector.progress70to99 / scaleBase) * 100 * animationProgress;
    const progress30Width = (sector.progress30to69 / scaleBase) * 100 * animationProgress;
    const belowWidth = (sector.belowThreshold / scaleBase) * 100 * animationProgress;

    return (
      <div
        key={sector.id}
        className={`group ${isSubSector ? 'ml-6 pl-4 border-l-2 border-gray-200' : ''}`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Sector label and total */}
        <div className="flex items-center justify-between mb-2">
          <div className={`flex items-center gap-2 ${isSubSector ? 'text-gray-600' : 'text-gray-800'}`}>
            {isSubSector && <span className="text-gray-400">↳</span>}
            {(() => {
              const IconComponent = SECTOR_ICONS[sector.id];
              return IconComponent ? (
                <IconComponent className={`${isSubSector ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
              ) : null;
            })()}
            <span className={`${isSubSector ? 'text-sm' : 'text-base'} font-semibold`}>
              {sector.shortName}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {isVisible ? sector.total.toLocaleString() : '0'} total
          </span>
        </div>

        {/* Stacked bar */}
        <div className={`relative ${isSubSector ? 'h-6' : 'h-8'} bg-gray-100 overflow-hidden`}>
          <div className="absolute inset-0 flex">
            {/* Completed segment */}
            <div
              className="h-full transition-all duration-300 relative group/segment"
              style={{
                width: `${completedWidth}%`,
                backgroundColor: COMPLETION_COLORS.completed,
              }}
              title={`${COMPLETION_LABELS.completed}: ${sector.completed.toLocaleString()}`}
            >
              {showValues && completedWidth > 8 && (
                <span className={`absolute inset-0 flex items-center justify-center ${isSubSector ? 'text-[10px]' : 'text-xs'} font-medium text-white`}>
                  {sector.completed.toLocaleString()}
                </span>
              )}
            </div>

            {/* 70-99% segment */}
            <div
              className="h-full transition-all duration-300 relative"
              style={{
                width: `${progress70Width}%`,
                backgroundColor: COMPLETION_COLORS.progress70to99,
              }}
              title={`${COMPLETION_LABELS.progress70to99}: ${sector.progress70to99.toLocaleString()}`}
            >
              {showValues && progress70Width > 6 && (
                <span className={`absolute inset-0 flex items-center justify-center ${isSubSector ? 'text-[10px]' : 'text-xs'} font-medium text-white`}>
                  {sector.progress70to99.toLocaleString()}
                </span>
              )}
            </div>

            {/* 30-69% segment */}
            <div
              className="h-full transition-all duration-300 relative"
              style={{
                width: `${progress30Width}%`,
                backgroundColor: COMPLETION_COLORS.progress30to69,
              }}
              title={`${COMPLETION_LABELS.progress30to69}: ${sector.progress30to69.toLocaleString()}`}
            >
              {showValues && progress30Width > 6 && (
                <span className={`absolute inset-0 flex items-center justify-center ${isSubSector ? 'text-[10px]' : 'text-xs'} font-medium text-white`}>
                  {sector.progress30to69.toLocaleString()}
                </span>
              )}
            </div>

            {/* <30% segment */}
            {sector.belowThreshold > 0 && (
              <div
                className="h-full transition-all duration-300 relative"
                style={{
                  width: `${belowWidth}%`,
                  backgroundColor: COMPLETION_COLORS.belowThreshold,
                }}
                title={`${COMPLETION_LABELS.belowThreshold}: ${sector.belowThreshold.toLocaleString()}`}
              >
                {showValues && belowWidth > 6 && (
                  <span className={`absolute inset-0 flex items-center justify-center ${isSubSector ? 'text-[10px]' : 'text-xs'} font-medium text-white`}>
                    {sector.belowThreshold.toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Completion rate badge */}
        <div className="mt-1 flex items-center gap-2">
          <span
            className={`inline-block ${isSubSector ? 'text-[10px]' : 'text-xs'} font-semibold px-2 py-0.5 text-white`}
            style={{ backgroundColor: sector.completionRate >= 70 ? COMPLETION_COLORS.completed : sector.completionRate >= 50 ? COMPLETION_COLORS.progress70to99 : COMPLETION_COLORS.progress30to69 }}
          >
            {sector.completionRate}% complete
          </span>
        </div>
      </div>
    );
  };

  // Organize data: main sectors with their sub-sectors nested
  const organizedData: { sector: SectorCompletion; subSectors: SectorCompletion[] }[] = [];

  mainSectors.forEach(sector => {
    const subSectors = data.filter(d => d.parentId === sector.id);
    organizedData.push({ sector, subSectors });
  });

  let itemIndex = 0;

  return (
    <div ref={ref} className={`space-y-4 ${className}`}>
      {organizedData.map(({ sector, subSectors }) => (
        <div key={sector.id}>
          {/* Main sector bar */}
          {renderSectorBar(sector, itemIndex++, false)}

          {/* Sub-sectors */}
          {subSectors.length > 0 && (
            <div className="mt-3 space-y-3">
              {subSectors.map((subSector) => renderSectorBar(subSector, itemIndex++, true))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
