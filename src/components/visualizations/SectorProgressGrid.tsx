import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_COLORS } from '../../data/completionData';
import { TOTAL_PORTFOLIO_PROJECTS } from '../../data/projectsPortfolio';
import AnimatedCounter from '../AnimatedCounter';

interface SectorProgressGridProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectorProgressGrid({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorProgressGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const mainSectors = SECTOR_COMPLETION_DATA.filter(s => !s.isSubSector);

  const totalProjects = TOTAL_PORTFOLIO_PROJECTS;
  const completedProjects = mainSectors.reduce((sum, sector) => sum + sector.completed, 0);
  const ongoingProjects = totalProjects - completedProjects;
  const completionRate = Math.round((completedProjects / totalProjects) * 100);

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

  const chartHeight = 400;
  const barMaxHeight = chartHeight - 60;

  const categories = [
    { key: 'completed', label: 'Completed', color: COMPLETION_COLORS.completed },
    { key: 'progress70to99', label: '70-99%', color: COMPLETION_COLORS.progress70to99 },
    { key: 'progress30to69', label: '30-69%', color: COMPLETION_COLORS.progress30to69 },
    { key: 'belowThreshold', label: '<30%', color: COMPLETION_COLORS.belowThreshold },
  ];

  return (
    <section ref={ref} className={`py-12 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 max-w-2xl">{subtitle}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">
              <AnimatedCounter end={totalProjects} duration={1500} />
            </div>
            <div className="text-sm font-semibold text-gray-900">Total Projects</div>
          </div>
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#059669' }}>
              <AnimatedCounter end={completionRate} duration={1500} suffix="%" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Completion Rate</div>
          </div>
          <div className="bg-blue-50 p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#f59e0b' }}>
              <AnimatedCounter end={ongoingProjects} duration={1500} />
            </div>
            <div className="text-sm font-semibold text-gray-900">In Progress</div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex">
            {/* Y-axis */}
            <div className="flex flex-col justify-between text-right pr-4 text-xs md:text-sm text-gray-400 font-medium" style={{ height: `${barMaxHeight}px` }}>
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1">
              <div className="relative" style={{ height: `${barMaxHeight}px` }}>
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-gray-200 w-full" />
                  <div className="border-t border-dashed border-gray-100 w-full" />
                  <div className="border-t border-dashed border-gray-100 w-full" />
                  <div className="border-t border-dashed border-gray-100 w-full" />
                  <div className="border-t border-gray-300 w-full" />
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-around">
                  {mainSectors.map((sector) => {
                    const values = [
                      { count: sector.completed, pct: (sector.completed / sector.total) * 100, ...categories[0] },
                      { count: sector.progress70to99, pct: (sector.progress70to99 / sector.total) * 100, ...categories[1] },
                      { count: sector.progress30to69, pct: (sector.progress30to69 / sector.total) * 100, ...categories[2] },
                      { count: sector.belowThreshold, pct: (sector.belowThreshold / sector.total) * 100, ...categories[3] },
                    ];

                    return (
                      <div
                        key={sector.id}
                        className="flex items-end gap-1 md:gap-1.5"
                      >
                        {values.map((item) => {
                          const barHeight = (item.pct / 100) * barMaxHeight * progress;

                          return (
                            <div
                              key={item.key}
                              className="flex flex-col items-center"
                            >
                              {/* Label */}
                              {item.count > 0 && progress > 0.5 && (
                                <div className="text-[9px] md:text-[11px] font-medium text-gray-700 mb-1 text-center">
                                  <div>{Math.round(item.pct)}%</div>
                                  <div className="text-gray-400 text-[8px]">({item.count.toLocaleString()})</div>
                                </div>
                              )}

                              {/* Bar */}
                              <div
                                className="w-5 md:w-8 rounded-t transition-all duration-700"
                                style={{
                                  height: item.count > 0 ? `${barHeight}px` : '0px',
                                  backgroundColor: item.color,
                                  minHeight: item.count > 0 ? '4px' : '0px',
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis Labels */}
              <div className="flex justify-around mt-4 pt-4 border-t border-gray-200">
                {mainSectors.map((sector) => (
                  <div key={sector.id} className="text-center" style={{ width: `${100 / mainSectors.length}%` }}>
                    <div className="font-semibold text-gray-900 text-xs md:text-sm">{sector.shortName}</div>
                    <div className="text-[10px] md:text-xs text-gray-500">{sector.total.toLocaleString()} projects</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {categories.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }} />
                <span className="text-gray-600 text-xs md:text-sm">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
