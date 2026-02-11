import { useState, useMemo, useEffect } from 'react';
import RegionalMapSVG from './RegionalMapSVG';
import { REGIONAL_COMPLETION_DATA, RegionalCompletionData, REGIONAL_TOTALS } from '../data/regionalCompletion';
import { COMPLETION_COLORS } from '../data/completionData';

interface Region {
  name: string;
  totalProjects: number;
  basicEducation?: number;
  secondaryEducation?: number;
  tertiaryEducation?: number;
  modelSchools?: number;
  tvetCenters?: number;
}

type ViewMode = 'projects' | 'completion';

interface GhanaRegionalMapProps {
  regions: Region[];
  className?: string;
  showCompletionToggle?: boolean;
  initialViewMode?: ViewMode;
}

export default function GhanaRegionalMap({
  regions,
  className = '',
  showCompletionToggle = false,
  initialViewMode = 'projects'
}: GhanaRegionalMapProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highestImpactRegion]);

  const findRegionData = (regionName: string): Region | undefined => {
    // Normalize region names for matching
    const normalize = (name: string) => name.trim().toLowerCase();
    return regions.find(r => normalize(r.name) === normalize(regionName));
  };

  const findCompletionData = (regionName: string): RegionalCompletionData | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return REGIONAL_COMPLETION_DATA.find(r => normalize(r.name) === normalize(regionName));
  };

  const handleRegionClick = (regionName: string) => {
    console.log('[PARENT] handleRegionClick called with:', regionName);
    setSelectedRegion(regionName);
  };

  const selectedData = selectedRegion ? findRegionData(selectedRegion) : null;
  const selectedCompletionData = selectedRegion ? findCompletionData(selectedRegion) : null;
  const hoveredData = hoveredRegion ? findRegionData(hoveredRegion) : null;
  const hoveredCompletionData = hoveredRegion ? findCompletionData(hoveredRegion) : null;

  return (
    <div className={className}>
      {/* View Toggle */}
      {showCompletionToggle && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setViewMode('projects')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'projects'
                ? 'bg-getfund-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setViewMode('completion')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'completion'
                ? 'bg-getfund-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ongoing Projects
          </button>
        </div>
      )}

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
              viewMode={viewMode}
              completionData={REGIONAL_COMPLETION_DATA}
            />

            {/* Hover Tooltip */}
            {viewMode === 'projects' && hoveredData && (
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

            {viewMode === 'completion' && hoveredCompletionData && (
              <div className="absolute top-6 left-6 bg-gray-900 bg-opacity-95 text-white px-5 py-3 rounded-lg shadow-2xl z-20 pointer-events-none">
                <div className="font-bold text-base mb-1">{hoveredCompletionData.name}</div>
                <div className="text-gray-200 text-sm">
                  {hoveredCompletionData.total.toLocaleString()} ongoing projects
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Completion score: {hoveredCompletionData.completionScore}%
                </div>
                <div className="text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
                  Click to see details
                </div>
              </div>
            )}
          </div>

          {/* Legend - Below Map */}
          {viewMode === 'projects' ? (
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
          ) : (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs text-gray-500 mr-2">Completion Score:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#dc2626' }}></div>
                <span className="text-xs text-gray-700">&lt;40%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-xs text-gray-700">40-60%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#10b981' }}></div>
                <span className="text-xs text-gray-700">&gt;60%</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - White container with title and detail panel */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
            {/* Title inside container */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {viewMode === 'projects' ? 'Regional Impact Distribution' : 'Ongoing Projects by Region'}
              </h3>
              <p className="text-lg text-gray-600">
                {viewMode === 'projects'
                  ? 'Click on any region to view detailed breakdown'
                  : `${REGIONAL_TOTALS.total.toLocaleString()} ongoing projects across 16 regions`
                }
              </p>
            </div>

            {/* Detail Panel Content - Projects View */}
            {viewMode === 'projects' && selectedData && (
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

            {/* Detail Panel Content - Completion View */}
            {viewMode === 'completion' && selectedCompletionData && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedCompletionData.name} Region
                  </h4>
                  <p className="text-gray-500">Ongoing project completion status</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Total Ongoing */}
                  <div className="col-span-2 bg-getfund-primary text-white rounded-xl p-6">
                    <div className="text-4xl font-bold mb-1">{selectedCompletionData.total.toLocaleString()}</div>
                    <div className="text-lg opacity-95">Ongoing Projects</div>
                    <div className="mt-2 text-sm opacity-80">
                      Completion Score: {selectedCompletionData.completionScore}%
                    </div>
                  </div>

                  {/* 70-99% Complete */}
                  <div className="text-white rounded-xl p-5" style={{ backgroundColor: COMPLETION_COLORS.progress70to99 }}>
                    <div className="text-2xl font-bold mb-1">{selectedCompletionData.progress70to99.toLocaleString()}</div>
                    <div className="text-sm opacity-90">70-99% Complete</div>
                    <div className="mt-1 text-xs opacity-75">
                      {Math.round((selectedCompletionData.progress70to99 / selectedCompletionData.total) * 100)}% of total
                    </div>
                  </div>

                  {/* 30-69% Complete */}
                  <div className="text-white rounded-xl p-5" style={{ backgroundColor: COMPLETION_COLORS.progress30to69 }}>
                    <div className="text-2xl font-bold mb-1">{selectedCompletionData.progress30to69.toLocaleString()}</div>
                    <div className="text-sm opacity-90">30-69% Complete</div>
                    <div className="mt-1 text-xs opacity-75">
                      {Math.round((selectedCompletionData.progress30to69 / selectedCompletionData.total) * 100)}% of total
                    </div>
                  </div>

                  {/* <30% Complete */}
                  <div className="col-span-2 text-white rounded-xl p-5" style={{ backgroundColor: COMPLETION_COLORS.belowThreshold }}>
                    <div className="text-2xl font-bold mb-1">{selectedCompletionData.belowThreshold.toLocaleString()}</div>
                    <div className="text-sm opacity-90">&lt;30% Complete</div>
                    <div className="mt-1 text-xs opacity-75">
                      {Math.round((selectedCompletionData.belowThreshold / selectedCompletionData.total) * 100)}% of total
                    </div>
                  </div>
                </div>

                {/* Progress bar visualization */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Completion Distribution</div>
                  <div className="h-6 flex overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(selectedCompletionData.progress70to99 / selectedCompletionData.total) * 100}%`,
                        backgroundColor: COMPLETION_COLORS.progress70to99
                      }}
                    />
                    <div
                      className="h-full"
                      style={{
                        width: `${(selectedCompletionData.progress30to69 / selectedCompletionData.total) * 100}%`,
                        backgroundColor: COMPLETION_COLORS.progress30to69
                      }}
                    />
                    <div
                      className="h-full"
                      style={{
                        width: `${(selectedCompletionData.belowThreshold / selectedCompletionData.total) * 100}%`,
                        backgroundColor: COMPLETION_COLORS.belowThreshold
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
