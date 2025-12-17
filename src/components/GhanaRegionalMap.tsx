import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

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

interface GeoFeature {
  type: string;
  properties: {
    region: string;
    capital: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  rsmKey: string;
}

export default function GhanaRegionalMap({ regions, className = '' }: GhanaRegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionData = (regionName: string) => {
    return regions.find(r => r.name.toLowerCase() === regionName.toLowerCase());
  };

  const getRegionFillColor = (regionName: string) => {
    const data = getRegionData(regionName);
    if (!data) return '#E5E7EB'; // Gray for no data

    const total = data.totalProjects;
    if (total >= 500) return '#166534'; // Dark green
    if (total >= 200) return '#16A34A'; // Medium green
    if (total >= 100) return '#4ADE80'; // Light green
    if (total >= 50) return '#86EFAC'; // Very light green
    return '#BBF7D0'; // Lightest green
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(selectedRegion === regionName ? null : regionName);
  };

  const selectedData = selectedRegion ? getRegionData(selectedRegion) : null;

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Regional Impact Distribution</h3>
        <p className="text-gray-600">Click on any region to view detailed breakdown</p>
      </div>

      {/* SVG Map using react-simple-maps */}
      <div className="relative bg-gray-100 rounded-xl shadow-lg p-4" style={{ minHeight: '600px' }}>
        <ComposableMap
          projectionConfig={{
            rotate: [1.0, -7.9, 0],
            scale: 6000
          }}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography="/data/ghana-regions.geojson">
            {({ geographies }: { geographies: GeoFeature[] }) =>
              geographies.map((geo) => {
                const regionName = geo.properties.region;
                const isSelected = selectedRegion === regionName;
                const isHovered = hoveredRegion === regionName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getRegionFillColor(regionName)}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                    style={{
                      default: {
                        outline: 'none',
                      },
                      hover: {
                        outline: 'none',
                        filter: 'brightness(0.85)',
                        cursor: 'pointer',
                      },
                      pressed: {
                        outline: 'none',
                      },
                    }}
                    onMouseEnter={() => setHoveredRegion(regionName)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionName)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Hover Tooltip */}
        {hoveredRegion && !selectedRegion && (
          <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm pointer-events-none z-10">
            <div className="font-semibold">{hoveredRegion}</div>
            {getRegionData(hoveredRegion) && (
              <div className="text-gray-300 mt-1">
                {getRegionData(hoveredRegion)?.totalProjects} projects
              </div>
            )}
            <div className="text-xs text-gray-400 mt-1">Click for details</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#166534' }}></div>
            <span className="text-gray-700">500+ projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#16A34A' }}></div>
            <span className="text-gray-700">200-499</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4ADE80' }}></div>
            <span className="text-gray-700">100-199</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#86EFAC' }}></div>
            <span className="text-gray-700">50-99</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#BBF7D0' }}></div>
            <span className="text-gray-700">1-49</span>
          </div>
        </div>
      </div>

      {/* Detailed Info Card - Shows on Selection */}
      {selectedData && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border-2 border-getfund-primary animate-scale-in">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{selectedData.name} Region</h3>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close details"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-getfund-primary to-blue-600 text-white rounded-lg p-4">
              <div className="text-3xl font-bold">{selectedData.totalProjects}</div>
              <div className="text-sm opacity-90 mt-1">Total Projects</div>
            </div>

            {selectedData.basicEducation !== undefined && selectedData.basicEducation > 0 && (
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.basicEducation}</div>
                <div className="text-sm opacity-90 mt-1">Basic Education</div>
              </div>
            )}

            {selectedData.secondaryEducation !== undefined && selectedData.secondaryEducation > 0 && (
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.secondaryEducation}</div>
                <div className="text-sm opacity-90 mt-1">Secondary Education</div>
              </div>
            )}

            {selectedData.tertiaryEducation !== undefined && selectedData.tertiaryEducation > 0 && (
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.tertiaryEducation}</div>
                <div className="text-sm opacity-90 mt-1">Tertiary Education</div>
              </div>
            )}

            {selectedData.modelSchools !== undefined && selectedData.modelSchools > 0 && (
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.modelSchools}</div>
                <div className="text-sm opacity-90 mt-1">Model Schools</div>
              </div>
            )}

            {selectedData.tvetCenters !== undefined && selectedData.tvetCenters > 0 && (
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.tvetCenters}</div>
                <div className="text-sm opacity-90 mt-1">TVET Centers</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
