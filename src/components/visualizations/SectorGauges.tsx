import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorGaugesProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface GaugeProps {
  sector: string;
  shortName: string;
  completionRate: number;
  total: number;
  completed: number;
  color: string;
  animationDelay?: number;
}

function SemiCircleGauge({ sector, shortName, completionRate, total, completed, color, animationDelay = 0 }: GaugeProps) {
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
              setProgress(completionRate);
              return;
            }

            // Delay animation start
            setTimeout(() => {
              const startTime = performance.now();
              const duration = 1500;

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const rawProgress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - rawProgress, 4);
                setProgress(easeOutQuart * completionRate);

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
  }, [isVisible, completionRate, animationDelay]);

  // Semi-circle gauge calculations
  const radius = 80;
  const strokeWidth = 12;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get color based on completion rate
  const getGaugeColor = () => {
    if (completionRate >= 70) return COMPLETION_COLORS.completed;
    if (completionRate >= 50) return COMPLETION_COLORS.progress70to99;
    if (completionRate >= 30) return COMPLETION_COLORS.progress30to69;
    return COMPLETION_COLORS.belowThreshold;
  };

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl">
      {/* Gauge SVG */}
      <div className="relative" style={{ width: radius * 2 + strokeWidth, height: radius + strokeWidth + 10 }}>
        <svg
          width={radius * 2 + strokeWidth}
          height={radius + strokeWidth + 10}
          className="transform"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius + strokeWidth / 2} A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth / 2} ${radius + strokeWidth / 2}`}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius + strokeWidth / 2} A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth / 2} ${radius + strokeWidth / 2}`}
            fill="none"
            stroke={getGaugeColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
            style={{ filter: 'drop-shadow(0 0 8px ' + getGaugeColor() + '40)' }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-3xl font-bold text-white">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold text-white">{shortName}</h3>
        <p className="text-white/60 text-sm">
          {completed.toLocaleString()} / {total.toLocaleString()} completed
        </p>
      </div>
    </div>
  );
}

export default function SectorGauges({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorGaugesProps) {
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

        {/* Gauges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mainSectors.map((sector, index) => (
            <SemiCircleGauge
              key={sector.id}
              sector={sector.sector}
              shortName={sector.shortName}
              completionRate={sector.completionRate}
              total={sector.total}
              completed={sector.completed}
              color={sector.color}
              animationDelay={index * 150}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
            <span className="text-white/70">70%+ Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }} />
            <span className="text-white/70">50-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }} />
            <span className="text-white/70">30-49%</span>
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
