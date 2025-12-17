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

// Simplified SVG paths for Ghana regions (approximate positioning)
const regionPaths: Record<string, string> = {
  'Upper West': 'M50,80 L140,80 L140,180 L50,180 Z',
  'Upper East': 'M140,80 L240,80 L240,180 L140,180 Z',
  'North East': 'M240,80 L320,80 L320,160 L240,160 Z',
  'Savannah': 'M80,180 L200,180 L200,260 L80,260 Z',
  'Northern': 'M200,160 L350,160 L350,280 L200,280 Z',
  'Bono': 'M50,260 L140,260 L140,360 L50,360 Z',
  'Bono East': 'M140,260 L230,260 L230,350 L140,350 Z',
  'Oti': 'M280,280 L370,280 L370,380 L280,380 Z',
  'Ahafo': 'M80,360 L160,360 L160,440 L80,440 Z',
  'Ashanti': 'M140,350 L250,350 L250,460 L140,460 Z',
  'Western North': 'M30,440 L110,440 L110,530 L30,530 Z',
  'Western': 'M30,530 L130,530 L130,650 L30,650 Z',
  'Central': 'M130,530 L240,530 L240,630 L130,630 Z',
  'Eastern': 'M240,460 L360,460 L360,580 L240,580 Z',
  'Volta': 'M330,380 L420,380 L420,520 L330,520 Z',
  'Greater Accra': 'M210,630 L310,630 L310,680 L210,680 Z',
};

export default function GhanaRegionalMap({ regions, className = '' }: GhanaRegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const findRegionData = (regionName: string): Region | undefined => {
    return regions.find(r => r.name === regionName);
  };

  const getRegionColor = (regionName: string): string => {
    const region = findRegionData(regionName);
    if (!region) return '#D1D5DB';

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
          viewBox="0 0 450 700"
          className="w-full h-auto max-w-3xl mx-auto"
          style={{ maxHeight: '700px' }}
        >
          {Object.entries(regionPaths).map(([regionName, pathData]) => {
            const isHovered = hoveredRegion === regionName;
            const isSelected = selectedRegion === regionName;

            return (
              <path
                key={regionName}
                d={pathData}
                fill={getRegionColor(regionName)}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.5}
                style={{
                  cursor: 'pointer',
                  filter: isSelected ? 'brightness(0.7)' : isHovered ? 'brightness(0.85)' : 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={() => setHoveredRegion(regionName)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(regionName)}
              />
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
            <div className="w-6 h-6 rounded shadow-sm" style={{ backgroundColor: '#D1D5DB' }}></div>
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
