import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorStatCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface StatCardProps {
  sector: string;
  shortName: string;
  completionRate: number;
  total: number;
  completed: number;
  progress70to99: number;
  progress30to69: number;
  belowThreshold: number;
  animationDelay?: number;
  color: string;
}

function StatCard({
  sector,
  shortName,
  completionRate,
  total,
  completed,
  progress70to99,
  progress30to69,
  belowThreshold,
  animationDelay = 0,
  color,
}: StatCardProps) {
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

  // Get status color
  const getStatusColor = () => {
    if (completionRate >= 70) return COMPLETION_COLORS.completed;
    if (completionRate >= 50) return COMPLETION_COLORS.progress70to99;
    if (completionRate >= 30) return COMPLETION_COLORS.progress30to69;
    return COMPLETION_COLORS.belowThreshold;
  };

  return (
    <div
      ref={ref}
      className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 overflow-hidden group hover:bg-white/10 transition-all duration-300"
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: getStatusColor() }}
      />

      {/* Main percentage */}
      <div className="text-center mb-6">
        <div
          className="text-6xl md:text-7xl font-bold mb-1"
          style={{ color: getStatusColor() }}
        >
          {Math.round(completionRate * progress)}
          <span className="text-3xl">%</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{shortName}</h3>
        <p className="text-white/50 text-sm">{sector}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(completed / total) * 100 * progress}%`,
                backgroundColor: COMPLETION_COLORS.completed,
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(progress70to99 / total) * 100 * progress}%`,
                backgroundColor: COMPLETION_COLORS.progress70to99,
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(progress30to69 / total) * 100 * progress}%`,
                backgroundColor: COMPLETION_COLORS.progress30to69,
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(belowThreshold / total) * 100 * progress}%`,
                backgroundColor: COMPLETION_COLORS.belowThreshold,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round(completed * progress).toLocaleString()}
          </div>
          <div className="text-xs text-white/50 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
            Completed
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round((total - completed) * progress).toLocaleString()}
          </div>
          <div className="text-xs text-white/50 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            In Progress
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <span className="text-white/60 text-sm">Total: </span>
        <span className="text-white font-semibold">{total.toLocaleString()} projects</span>
      </div>
    </div>
  );
}

export default function SectorStatCards({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorStatCardsProps) {
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

        {/* Stat cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mainSectors.map((sector, index) => (
            <StatCard
              key={sector.id}
              sector={sector.sector}
              shortName={sector.shortName}
              completionRate={sector.completionRate}
              total={sector.total}
              completed={sector.completed}
              progress70to99={sector.progress70to99}
              progress30to69={sector.progress30to69}
              belowThreshold={sector.belowThreshold}
              color={sector.color}
              animationDelay={index * 150}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
            <span className="text-white/70">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }} />
            <span className="text-white/70">70-99%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }} />
            <span className="text-white/70">30-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.belowThreshold }} />
            <span className="text-white/70">&lt;30%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
