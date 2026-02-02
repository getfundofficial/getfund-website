import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorProgressBarsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface ProgressBarProps {
  sector: string;
  shortName: string;
  completionRate: number;
  total: number;
  completed: number;
  progress70to99: number;
  progress30to69: number;
  belowThreshold: number;
  animationDelay?: number;
}

function HorizontalProgressBar({
  sector,
  shortName,
  completionRate,
  total,
  completed,
  progress70to99,
  progress30to69,
  belowThreshold,
  animationDelay = 0,
}: ProgressBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

            setTimeout(() => {
              const startTime = performance.now();
              const duration = 1200;

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
            }, animationDelay);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, animationDelay]);

  // Calculate widths as percentages of total
  const completedWidth = (completed / total) * 100 * progress;
  const progress70Width = (progress70to99 / total) * 100 * progress;
  const progress30Width = (progress30to69 / total) * 100 * progress;
  const belowWidth = (belowThreshold / total) * 100 * progress;

  return (
    <div ref={ref} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{shortName}</h3>
          <p className="text-white/50 text-sm">{sector}</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-white">{Math.round(completionRate * progress)}%</span>
          <p className="text-white/50 text-sm">completion rate</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-8 bg-white/10 rounded-full overflow-hidden mb-4">
        <div className="absolute inset-0 flex">
          {/* Completed segment */}
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${completedWidth}%`,
              backgroundColor: COMPLETION_COLORS.completed,
            }}
          />
          {/* 70-99% segment */}
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress70Width}%`,
              backgroundColor: COMPLETION_COLORS.progress70to99,
            }}
          />
          {/* 30-69% segment */}
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress30Width}%`,
              backgroundColor: COMPLETION_COLORS.progress30to69,
            }}
          />
          {/* <30% segment */}
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${belowWidth}%`,
              backgroundColor: COMPLETION_COLORS.belowThreshold,
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{Math.round(completed * progress).toLocaleString()}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wide">Completed</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{Math.round(progress70to99 * progress).toLocaleString()}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wide">70-99%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{Math.round(progress30to69 * progress).toLocaleString()}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wide">30-69%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{Math.round(belowThreshold * progress).toLocaleString()}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wide">&lt;30%</div>
        </div>
      </div>
    </div>
  );
}

export default function SectorProgressBars({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorProgressBarsProps) {
  // Get main sectors only (exclude sub-sectors)
  const mainSectors = SECTOR_COMPLETION_DATA.filter(s => !s.isSubSector);

  return (
    <section className={`py-16 ${className}`} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
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

        {/* Progress bars */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {mainSectors.map((sector, index) => (
            <HorizontalProgressBar
              key={sector.id}
              sector={sector.sector}
              shortName={sector.shortName}
              completionRate={sector.completionRate}
              total={sector.total}
              completed={sector.completed}
              progress70to99={sector.progress70to99}
              progress30to69={sector.progress30to69}
              belowThreshold={sector.belowThreshold}
              animationDelay={index * 200}
            />
          ))}
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
