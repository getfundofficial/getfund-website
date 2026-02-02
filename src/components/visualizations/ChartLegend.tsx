import React from 'react';

export interface LegendItem {
  label: string;
  color: string;
  value?: number | string;
}

interface ChartLegendProps {
  items: LegendItem[];
  direction?: 'horizontal' | 'vertical';
  showValues?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function ChartLegend({
  items,
  direction = 'horizontal',
  showValues = false,
  className = '',
  itemClassName = '',
}: ChartLegendProps) {
  const containerClass = direction === 'horizontal'
    ? 'flex flex-wrap items-center justify-center gap-4 md:gap-6'
    : 'flex flex-col gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 ${itemClassName}`}
        >
          <span
            className="w-3 h-3 flex-shrink-0"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="text-sm text-gray-600">
            {item.label}
            {showValues && item.value !== undefined && (
              <span className="font-semibold text-gray-800 ml-1">
                ({typeof item.value === 'number' ? item.value.toLocaleString() : item.value})
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
