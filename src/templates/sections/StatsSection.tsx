import React from 'react';

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  layout?: 'horizontal' | 'grid';
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

/**
 * Stats Section Component
 *
 * Display key statistics and metrics
 * Used in: All layouts
 */
export const StatsSection: React.FC<StatsSectionProps> = ({
  stats = [],
  layout = 'grid',
}) => {
  const layoutClasses = layout === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
    : 'flex flex-wrap justify-center gap-12';

  return (
    <section className="stats-section bg-getfund-primary text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={layoutClasses}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-lg text-green-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
