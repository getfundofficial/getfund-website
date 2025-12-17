import { useState } from 'react';
import RegionalMapSVG from './RegionalMapSVG';
import RegionalDetailPanel from './RegionalDetailPanel';
import { normalizeRegionName } from '../utils/mapUtils';

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

export default function GhanaRegionalMap({ regions, className = '' }: GhanaRegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const findRegionData = (regionName: string): Region | undefined => {
    return regions.find(r => normalizeRegionName(r.name) === normalizeRegionName(regionName));
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
        <RegionalMapSVG
          regions={regions}
          onRegionHover={setHoveredRegion}
          onRegionClick={handleRegionClick}
          selectedRegion={selectedRegion}
        />

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
