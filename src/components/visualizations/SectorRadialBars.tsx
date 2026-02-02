import React, { useEffect, useState, useRef } from 'react';
import { SECTOR_COMPLETION_DATA, COMPLETION_TOTALS, OVERALL_COMPLETION_RATE, COMPLETION_COLORS } from '../../data/completionData';
import AnimatedCounter from '../AnimatedCounter';

interface SectorRadialBarsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectorRadialBars({
  className = '',
  title = 'Sector Performance Analysis',
  subtitle = 'Detailed completion metrics for each education sector',
}: SectorRadialBarsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Get main sectors only (exclude sub-sectors)
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

  // SVG dimensions
  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const innerRadius = 60;
  const maxOuterRadius = 180;
  const barWidth = 35;
  const gap = 8;

  // Calculate bar positions
  const totalSectors = mainSectors.length;
  const anglePerSector = (2 * Math.PI) / totalSectors;

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

        {/* Radial Chart */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="relative">
            <svg width={size} height={size} className="overflow-visible">
              {/* Center circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={innerRadius - 10}
                fill="rgba(255,255,255,0.05)"
              />
              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                className="fill-white text-2xl font-bold"
              >
                {Math.round(OVERALL_COMPLETION_RATE * progress)}%
              </text>
              <text
                x={centerX}
                y={centerY + 15}
                textAnchor="middle"
                className="fill-white/60 text-sm"
              >
                Overall
              </text>

              {/* Radial bars for each sector */}
              {mainSectors.map((sector, index) => {
                const startAngle = index * anglePerSector - Math.PI / 2;
                const endAngle = startAngle + anglePerSector - 0.1; // Small gap between sectors

                // Calculate the bar length based on completion rate
                const barLength = (maxOuterRadius - innerRadius) * (sector.completionRate / 100) * progress;

                // Calculate positions for each segment
                const segments = [
                  { value: sector.completed, color: COMPLETION_COLORS.completed },
                  { value: sector.progress70to99, color: COMPLETION_COLORS.progress70to99 },
                  { value: sector.progress30to69, color: COMPLETION_COLORS.progress30to69 },
                  { value: sector.belowThreshold, color: COMPLETION_COLORS.belowThreshold },
                ];

                let currentRadius = innerRadius;

                return (
                  <g key={sector.id}>
                    {/* Background track */}
                    <path
                      d={describeArc(centerX, centerY, innerRadius, maxOuterRadius, startAngle + 0.05, endAngle - 0.05)}
                      fill="rgba(255,255,255,0.05)"
                    />

                    {/* Segments */}
                    {segments.map((segment, segIndex) => {
                      const segmentLength = ((segment.value / sector.total) * (maxOuterRadius - innerRadius)) * progress;
                      const segStartRadius = currentRadius;
                      const segEndRadius = currentRadius + segmentLength;
                      currentRadius = segEndRadius;

                      if (segment.value === 0) return null;

                      return (
                        <path
                          key={segIndex}
                          d={describeArc(centerX, centerY, segStartRadius, segEndRadius, startAngle + 0.05, endAngle - 0.05)}
                          fill={segment.color}
                          className="transition-all duration-300"
                          style={{ filter: `drop-shadow(0 0 4px ${segment.color}40)` }}
                        />
                      );
                    })}

                    {/* Sector label */}
                    <text
                      x={centerX + (maxOuterRadius + 25) * Math.cos((startAngle + endAngle) / 2)}
                      y={centerY + (maxOuterRadius + 25) * Math.sin((startAngle + endAngle) / 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white text-sm font-semibold"
                    >
                      {sector.shortName}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend and details */}
          <div className="space-y-4">
            {mainSectors.map((sector) => (
              <div key={sector.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{sector.shortName}</span>
                  <span className="text-2xl font-bold text-white">{sector.completionRate}%</span>
                </div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-white/10">
                  <div style={{ width: `${(sector.completed / sector.total) * 100}%`, backgroundColor: COMPLETION_COLORS.completed }} />
                  <div style={{ width: `${(sector.progress70to99 / sector.total) * 100}%`, backgroundColor: COMPLETION_COLORS.progress70to99 }} />
                  <div style={{ width: `${(sector.progress30to69 / sector.total) * 100}%`, backgroundColor: COMPLETION_COLORS.progress30to69 }} />
                  <div style={{ width: `${(sector.belowThreshold / sector.total) * 100}%`, backgroundColor: COMPLETION_COLORS.belowThreshold }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/60">
                  <span>{sector.completed.toLocaleString()} done</span>
                  <span>{sector.total.toLocaleString()} total</span>
                </div>
              </div>
            ))}
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

// Helper function to create arc path
function describeArc(cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): string {
  const innerStart = {
    x: cx + innerRadius * Math.cos(startAngle),
    y: cy + innerRadius * Math.sin(startAngle),
  };
  const innerEnd = {
    x: cx + innerRadius * Math.cos(endAngle),
    y: cy + innerRadius * Math.sin(endAngle),
  };
  const outerStart = {
    x: cx + outerRadius * Math.cos(startAngle),
    y: cy + outerRadius * Math.sin(startAngle),
  };
  const outerEnd = {
    x: cx + outerRadius * Math.cos(endAngle),
    y: cy + outerRadius * Math.sin(endAngle),
  };

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${innerStart.x} ${innerStart.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
    `L ${outerEnd.x} ${outerEnd.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${outerStart.x} ${outerStart.y}`,
    'Z',
  ].join(' ');
}
