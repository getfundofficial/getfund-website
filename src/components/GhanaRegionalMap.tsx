import { useState, useMemo, useEffect } from 'react';
import RegionalDetailPanel from './RegionalDetailPanel';
import RegionalMapSVG from './RegionalMapSVG';

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
  // Find the region with highest totalProjects
  const highestImpactRegion = useMemo(() => {
    if (!regions || regions.length === 0) return null;
    return regions.reduce((max, region) =>
      region.totalProjects > max.totalProjects ? region : max
    , regions[0]).name;
  }, [regions]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Set default selected region when component mounts or regions change
  useEffect(() => {
    if (highestImpactRegion && !selectedRegion) {
      setSelectedRegion(highestImpactRegion);
    }
  }, [highestImpactRegion]);

  const findRegionData = (regionName: string): Region | undefined => {
    // Normalize region names for matching
    const normalize = (name: string) => name.trim().toLowerCase();
    return regions.find(r => normalize(r.name) === normalize(regionName));
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  const selectedData = selectedRegion ? findRegionData(selectedRegion) : null;
  const hoveredData = hoveredRegion ? findRegionData(hoveredRegion) : null;

  return (
    <div className={className}>
      {/* Map and Detail Panel - Side by Side Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
        {/* Left Side - Map (no container) */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          {/* Map - No container styling */}
          <div className="relative">
            <RegionalMapSVG
              regions={regions}
              onRegionHover={setHoveredRegion}
              onRegionClick={handleRegionClick}
              selectedRegion={selectedRegion}
            />

            {/* Hover Tooltip */}
            {hoveredData && (
              <div className="absolute top-6 left-6 bg-gray-900 bg-opacity-95 text-white px-5 py-3 rounded-lg shadow-2xl z-20 pointer-events-none">
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

          {/* Legend - Below Map */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#065F46' }}></div>
              <span className="text-xs text-gray-700">500+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#047857' }}></div>
              <span className="text-xs text-gray-700">200-499</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#10B981' }}></div>
              <span className="text-xs text-gray-700">100-199</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#34D399' }}></div>
              <span className="text-xs text-gray-700">50-99</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#6EE7B7' }}></div>
              <span className="text-xs text-gray-700">1-49</span>
            </div>
          </div>
        </div>

        {/* Right Side - White container with title and detail panel */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
            {/* Title inside container */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Regional Impact Distribution
              </h3>
              <p className="text-lg text-gray-600">
                Click on any region to view detailed breakdown
              </p>
            </div>

            {/* Detail Panel Content - Always show selected or default region */}
            {selectedData && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedData.name} Region
                  </h4>
                  <p className="text-gray-500">Detailed project breakdown</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Total Projects */}
                  <div className="col-span-2 bg-getfund-primary text-white rounded-xl p-6">
                    <div className="text-4xl font-bold mb-1">{selectedData.totalProjects.toLocaleString()}</div>
                    <div className="text-lg opacity-95">Total Projects</div>
                  </div>

                  {/* Basic Education */}
                  {selectedData.basicEducation !== undefined && selectedData.basicEducation > 0 && (
                    <div className="bg-emerald-600 text-white rounded-xl p-5">
                      <div className="text-2xl font-bold mb-1">{selectedData.basicEducation.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Basic Education</div>
                    </div>
                  )}

                  {/* Secondary Education */}
                  {selectedData.secondaryEducation !== undefined && selectedData.secondaryEducation > 0 && (
                    <div className="bg-blue-600 text-white rounded-xl p-5">
                      <div className="text-2xl font-bold mb-1">{selectedData.secondaryEducation.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Secondary Education</div>
                    </div>
                  )}

                  {/* Tertiary Education */}
                  {selectedData.tertiaryEducation !== undefined && selectedData.tertiaryEducation > 0 && (
                    <div className="bg-purple-600 text-white rounded-xl p-5">
                      <div className="text-2xl font-bold mb-1">{selectedData.tertiaryEducation.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Tertiary Education</div>
                    </div>
                  )}

                  {/* Model Schools */}
                  {selectedData.modelSchools !== undefined && selectedData.modelSchools > 0 && (
                    <div className="bg-amber-500 text-white rounded-xl p-5">
                      <div className="text-2xl font-bold mb-1">{selectedData.modelSchools.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Model Schools</div>
                    </div>
                  )}

                  {/* TVET Centers */}
                  {selectedData.tvetCenters !== undefined && selectedData.tvetCenters > 0 && (
                    <div className="bg-indigo-600 text-white rounded-xl p-5">
                      <div className="text-2xl font-bold mb-1">{selectedData.tvetCenters.toLocaleString()}</div>
                      <div className="text-sm opacity-90">TVET Centers</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
