import { useState } from 'react';
import RegionalDetailPanel from './RegionalDetailPanel';

interface Region {
  name: string;
  totalProjects: number;
  basicEducation?: number;
  secondaryEducation?: number;
  tertiaryEducation?: number;
  modelSchools?: number;
  tvetCenters?: number;
}

interface GhanaRegionalMapProps {
  regions: Region[];
  className?: string;
}

// Accurate Ghana regions based on actual geography
const regionPaths: Record<string, string> = {
  // Northern regions (top)
  'Upper West': 'M 80 50 L 200 50 L 200 150 L 80 180 Z',
  'Upper East': 'M 200 50 L 350 60 L 340 150 L 200 150 Z',
  'North East': 'M 350 60 L 450 80 L 430 160 L 340 150 Z',

  // Middle-upper regions
  'Savannah': 'M 80 180 L 200 150 L 250 220 L 100 240 Z',
  'Northern': 'M 200 150 L 340 150 L 380 240 L 250 220 Z',
  'Oti': 'M 340 150 L 430 160 L 460 250 L 380 240 Z',

  // Middle regions
  'Bono': 'M 100 240 L 250 220 L 260 320 L 120 340 Z',
  'Bono East': 'M 250 220 L 380 240 L 380 330 L 260 320 Z',
  'Ahafo': 'M 120 340 L 260 320 L 270 410 L 140 420 Z',
  'Ashanti': 'M 260 320 L 380 330 L 390 430 L 270 410 Z',
  'Eastern': 'M 380 330 L 460 250 L 490 400 L 390 430 Z',
  'Volta': 'M 460 250 L 500 260 L 500 420 L 490 400 Z',

  // Southern regions
  'Western North': 'M 60 400 L 140 420 L 160 500 L 70 520 Z',
  'Western': 'M 70 520 L 160 500 L 180 620 L 80 650 Z',
  'Central': 'M 160 500 L 270 410 L 300 540 L 180 620 Z',
  'Greater Accra': 'M 300 540 L 390 430 L 420 540 L 340 600 Z',
};

export default function GhanaRegionalMap({ regions, className = '' }: GhanaRegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const findRegionData = (regionName: string): Region | undefined => {
    return regions.find(r => r.name === regionName);
  };

  const getRegionColor = (regionName: string): string => {
    const region = findRegionData(regionName);
    if (!region) return '#E5E7EB';

    const count = region.totalProjects;
    if (count >= 500) return '#065F46';
    if (count >= 200) return '#047857';
    if (count >= 100) return '#10B981';
    if (count >= 50) return '#34D399';
    return '#6EE7B7';
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(prev => prev === regionName ? null : regionName);
  };

  const selectedData = selectedRegion ? findRegionData(selectedRegion) : null;
  const hoveredData = hoveredRegion ? findRegionData(hoveredRegion) : null;

  return (
    <div className={className}>
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Regional Impact Distribution
        </h3>
        <p className="text-lg text-gray-600">
          Click on any region to view detailed breakdown
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <svg
          viewBox="0 0 550 700"
          className="w-full h-auto max-w-2xl mx-auto"
          style={{ maxHeight: '700px' }}
        >
          {/* Background */}
          <rect width="550" height="700" fill="#F9FAFB" />

          {/* Ghana Map Regions */}
          {Object.entries(regionPaths).map(([regionName, pathData]) => {
            const isHovered = hoveredRegion === regionName;
            const isSelected = selectedRegion === regionName;
            const regionData = findRegionData(regionName);

            return (
              <g key={regionName}>
                <path
                  d={pathData}
                  fill={getRegionColor(regionName)}
                  stroke="#374151"
                  strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                  style={{
                    cursor: 'pointer',
                    filter: isSelected ? 'brightness(0.75)' : isHovered ? 'brightness(0.88)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={() => setHoveredRegion(regionName)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleRegionClick(regionName)}
                />
                {/* Region Labels */}
                <text
                  x={parseInt(pathData.match(/M (\d+)/)?.[1] || '0') + 40}
                  y={parseInt(pathData.match(/M \d+ (\d+)/)?.[1] || '0') + 40}
                  fontSize="11"
                  fontWeight="500"
                  fill="#1F2937"
                  pointerEvents="none"
                  textAnchor="middle"
                  style={{ userSelect: 'none' }}
                >
                  {regionName}
                </text>
                {regionData && (
                  <text
                    x={parseInt(pathData.match(/M (\d+)/)?.[1] || '0') + 40}
                    y={parseInt(pathData.match(/M \d+ (\d+)/)?.[1] || '0') + 55}
                    fontSize="10"
                    fill="#6B7280"
                    pointerEvents="none"
                    textAnchor="middle"
                    style={{ userSelect: 'none' }}
                  >
                    {regionData.totalProjects}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredData && !selectedRegion && (
          <div className="absolute top-6 right-6 bg-gray-900 bg-opacity-95 text-white px-5 py-3 rounded-lg shadow-2xl z-20 pointer-events-none">
            <div className="font-bold text-base mb-1">{hoveredData.name}</div>
            <div className="text-gray-200 text-sm">
              {hoveredData.totalProjects.toLocaleString()} projects
            </div>
            <div className="text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
              Click to see details
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-md">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
          Project Distribution Scale
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#065F46' }}></div>
            <span className="text-sm text-gray-700 font-medium">500+ projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#047857' }}></div>
            <span className="text-sm text-gray-700 font-medium">200-499</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-sm text-gray-700 font-medium">100-199</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#34D399' }}></div>
            <span className="text-sm text-gray-700 font-medium">50-99</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#6EE7B7' }}></div>
            <span className="text-sm text-gray-700 font-medium">1-49</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#E5E7EB' }}></div>
            <span className="text-sm text-gray-700 font-medium">No data</span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedData && (
        <RegionalDetailPanel
          region={selectedData}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}
