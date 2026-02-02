import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorWaffleChartsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface WaffleChartProps {
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

function WaffleChart({
  sector,
  shortName,
  completionRate,
  total,
  completed,
  progress70to99,
  progress30to69,
  belowThreshold,
  animationDelay = 0,
}: WaffleChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSquares, setAnimatedSquares] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Calculate how many squares for each category (out of 100)
  const completedSquares = Math.round((completed / total) * 100);
  const progress70Squares = Math.round((progress70to99 / total) * 100);
  const progress30Squares = Math.round((progress30to69 / total) * 100);
  const belowSquares = 100 - completedSquares - progress70Squares - progress30Squares;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            if (prefersReducedMotion) {
              setAnimatedSquares(100);
              return;
            }

            setTimeout(() => {
              let current = 0;
              const interval = setInterval(() => {
                current += 2;
                setAnimatedSquares(Math.min(current, 100));
                if (current >= 100) {
                  clearInterval(interval);
                }
              }, 20);
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

  // Generate 100 squares
  const squares = [];
  for (let i = 0; i < 100; i++) {
    let color = 'rgba(255,255,255,0.1)';
    let shouldShow = i < animatedSquares;

    if (shouldShow) {
      if (i < completedSquares) {
        color = COMPLETION_COLORS.completed;
      } else if (i < completedSquares + progress70Squares) {
        color = COMPLETION_COLORS.progress70to99;
      } else if (i < completedSquares + progress70Squares + progress30Squares) {
        color = COMPLETION_COLORS.progress30to69;
      } else {
        color = COMPLETION_COLORS.belowThreshold;
      }
    }

    squares.push(
      <div
        key={i}
        className="aspect-square rounded-sm transition-all duration-150"
        style={{
          backgroundColor: color,
          transform: shouldShow ? 'scale(1)' : 'scale(0.5)',
          opacity: shouldShow ? 1 : 0.3,
        }}
      />
    );
  }

  return (
    <div ref={ref} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{shortName}</h3>
          <p className="text-white/50 text-sm">{total.toLocaleString()} projects</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-white">{completionRate}%</span>
          <p className="text-white/50 text-sm">complete</p>
        </div>
      </div>

      {/* Waffle grid */}
      <div className="grid grid-cols-10 gap-1 mb-4">
        {squares}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <div className="w-3 h-3 rounded-sm mx-auto mb-1" style={{ backgroundColor: COMPLETION_COLORS.completed }} />
          <div className="text-white font-semibold">{completed.toLocaleString()}</div>
          <div className="text-white/50">Done</div>
        </div>
        <div>
          <div className="w-3 h-3 rounded-sm mx-auto mb-1" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }} />
          <div className="text-white font-semibold">{progress70to99.toLocaleString()}</div>
          <div className="text-white/50">70-99%</div>
        </div>
        <div>
          <div className="w-3 h-3 rounded-sm mx-auto mb-1" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }} />
          <div className="text-white font-semibold">{progress30to69.toLocaleString()}</div>
          <div className="text-white/50">30-69%</div>
        </div>
        <div>
          <div className="w-3 h-3 rounded-sm mx-auto mb-1" style={{ backgroundColor: COMPLETION_COLORS.belowThreshold }} />
          <div className="text-white font-semibold">{belowThreshold.toLocaleString()}</div>
          <div className="text-white/50">&lt;30%</div>
        </div>
      </div>
    </div>
  );
}

export default function SectorWaffleCharts({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorWaffleChartsProps) {
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

        {/* Waffle charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mainSectors.map((sector, index) => (
            <WaffleChart
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

        {/* Legend note */}
        <div className="mt-8 text-center text-white/50 text-sm">
          Each square represents 1% of the sector's total projects
        </div>
      </div>
    </section>
  );
}
