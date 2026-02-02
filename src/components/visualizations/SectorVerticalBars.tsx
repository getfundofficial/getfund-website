import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorVerticalBarsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectorVerticalBars({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorVerticalBarsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Get main sectors only (exclude sub-sectors)
  const mainSectors = SECTOR_COMPLETION_DATA.filter(s => !s.isSubSector);
  const maxTotal = Math.max(...mainSectors.map(s => s.total));

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
    <section ref={ref} className={`py-16 ${className}`} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>

          {/* Overall stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedCounter end={COMPLETION_TOTALS.total} duration={1500} />
              </div>
              <div className="text-sm text-white/60">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400">
                <AnimatedCounter end={OVERALL_COMPLETION_RATE} duration={1500} suffix="%" />
              </div>
              <div className="text-sm text-white/60">Overall Completion</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400">
                <AnimatedCounter end={COMPLETION_TOTALS.uncompleted} duration={1500} />
              </div>
              <div className="text-sm text-white/60">Ongoing Projects</div>
            </div>
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          {/* Y-axis labels and chart */}
          <div className="flex">
            {/* Y-axis */}
            <div className="flex flex-col justify-between text-right pr-4 text-sm text-white/50" style={{ height: '320px' }}>
              <span>{maxTotal.toLocaleString()}</span>
              <span>{Math.round(maxTotal * 0.75).toLocaleString()}</span>
              <span>{Math.round(maxTotal * 0.5).toLocaleString()}</span>
              <span>{Math.round(maxTotal * 0.25).toLocaleString()}</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="flex-1 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-white/10 w-full" />
                ))}
              </div>

              {/* Bars */}
              <div className="relative h-80 flex items-end justify-around gap-4 px-4">
                {mainSectors.map((sector, index) => {
                  const barHeight = (sector.total / maxTotal) * 100;
                  const completedHeight = (sector.completed / sector.total) * barHeight;
                  const progress70Height = (sector.progress70to99 / sector.total) * barHeight;
                  const progress30Height = (sector.progress30to69 / sector.total) * barHeight;
                  const belowHeight = (sector.belowThreshold / sector.total) * barHeight;

                  return (
                    <div
                      key={sector.id}
                      className="flex-1 flex flex-col items-center group"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Bar */}
                      <div
                        className="w-full max-w-20 relative flex flex-col-reverse rounded-t-lg overflow-hidden transition-all duration-500"
                        style={{ height: `${barHeight * progress}%` }}
                      >
                        {/* Completed */}
                        <div
                          className="w-full transition-all duration-300"
                          style={{
                            height: `${(completedHeight / barHeight) * 100}%`,
                            backgroundColor: COMPLETION_COLORS.completed,
                          }}
                        />
                        {/* 70-99% */}
                        <div
                          className="w-full transition-all duration-300"
                          style={{
                            height: `${(progress70Height / barHeight) * 100}%`,
                            backgroundColor: COMPLETION_COLORS.progress70to99,
                          }}
                        />
                        {/* 30-69% */}
                        <div
                          className="w-full transition-all duration-300"
                          style={{
                            height: `${(progress30Height / barHeight) * 100}%`,
                            backgroundColor: COMPLETION_COLORS.progress30to69,
                          }}
                        />
                        {/* <30% */}
                        <div
                          className="w-full transition-all duration-300"
                          style={{
                            height: `${(belowHeight / barHeight) * 100}%`,
                            backgroundColor: COMPLETION_COLORS.belowThreshold,
                          }}
                        />

                        {/* Hover tooltip */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          <div className="font-semibold">{sector.shortName}</div>
                          <div>{sector.total.toLocaleString()} total</div>
                          <div className="text-emerald-400">{sector.completionRate}% complete</div>
                        </div>
                      </div>

                      {/* Value label */}
                      <div className="mt-2 text-white font-bold text-lg">
                        {Math.round(sector.total * progress).toLocaleString()}
                      </div>

                      {/* Sector label */}
                      <div className="text-white/70 text-sm font-medium">
                        {sector.shortName}
                      </div>

                      {/* Completion rate */}
                      <div
                        className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                        style={{
                          backgroundColor: sector.completionRate >= 70 ? COMPLETION_COLORS.completed : sector.completionRate >= 50 ? COMPLETION_COLORS.progress70to99 : COMPLETION_COLORS.progress30to69,
                          color: 'white',
                        }}
                      >
                        {sector.completionRate}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* X-axis label */}
          <div className="text-center mt-6 text-white/50 text-sm">
            Education Sectors
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
            <span className="text-white/70">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }} />
            <span className="text-white/70">70-99%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }} />
            <span className="text-white/70">30-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: COMPLETION_COLORS.belowThreshold }} />
            <span className="text-white/70">&lt;30%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
