import { useState } from 'react';
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

  // Log incoming data for debugging
  console.log('[GhanaMap] Received regions:', regions.length);
  console.log('[GhanaMap] Region names:', regions.map(r => r.name));

  // Find region data by name - exact match
  const findRegionData = (geoRegionName: string): Region | undefined => {
    return regions.find(r => r.name === geoRegionName);
  };

  // Get color based on project count
  const getColor = (geoRegionName: string): string => {
    const region = findRegionData(geoRegionName);

    if (!region) {
      console.warn(`[GhanaMap] No match for: "${geoRegionName}"`);
      return '#E5E7EB'; // Gray
    }

    const count = region.totalProjects;
    if (count >= 500) return '#166534'; // Dark green
    if (count >= 200) return '#16A34A'; // Medium green
    if (count >= 100) return '#4ADE80'; // Light green
    if (count >= 50) return '#86EFAC'; // Very light green
    return '#BBF7D0'; // Lightest green
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(selectedRegion === regionName ? null : regionName);
  };

  const selectedData = selectedRegion ? findRegionData(selectedRegion) : null;

  return (
    <div className={className}>
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Regional Impact Distribution
        </h3>
        <p className="text-gray-600">
          Click on any region to view detailed breakdown
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-50 rounded-xl shadow-lg p-6" style={{ minHeight: '600px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [-1.0, 7.9],
            scale: 2000
          }}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography="/data/ghana-regions.geojson">
            {({ geographies }: { geographies: GeoFeature[] }) => {
              if (!geographies || geographies.length === 0) {
                console.error('[GhanaMap] Failed to load GeoJSON');
                return null;
              }

              console.log('[GhanaMap] GeoJSON loaded:', geographies.length, 'regions');
              console.log('[GhanaMap] GeoJSON names:', geographies.map(g => g.properties.region));

              return geographies.map((geo) => {
                const regionName = geo.properties.region;
                const isSelected = selectedRegion === regionName;
                const isHovered = hoveredRegion === regionName;
                const fillColor = getColor(regionName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        outline: 'none',
                        filter: 'brightness(0.9)',
                        cursor: 'pointer'
                      },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => setHoveredRegion(regionName)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionName)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>

        {/* Hover Tooltip */}
        {hoveredRegion && !selectedRegion && (
          <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-10 pointer-events-none">
            <div className="font-bold text-sm">{hoveredRegion}</div>
            {findRegionData(hoveredRegion) && (
              <div className="text-gray-300 text-xs mt-1">
                {findRegionData(hoveredRegion)?.totalProjects} projects
              </div>
            )}
            <div className="text-xs text-gray-400 mt-1">Click for details</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#166534' }}></div>
            <span className="text-gray-700 font-medium">500+ projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#16A34A' }}></div>
            <span className="text-gray-700 font-medium">200-499</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#4ADE80' }}></div>
            <span className="text-gray-700 font-medium">100-199</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#86EFAC' }}></div>
            <span className="text-gray-700 font-medium">50-99</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#BBF7D0' }}></div>
            <span className="text-gray-700 font-medium">1-49</span>
          </div>
        </div>
      </div>

      {/* Detail Card */}
      {selectedData && (
        <div className="mt-6 bg-white rounded-xl shadow-xl p-6 border-2 border-getfund-primary">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{selectedData.name} Region</h3>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Total Projects */}
            <div className="bg-gradient-to-br from-getfund-primary to-red-700 text-white rounded-lg p-4">
              <div className="text-3xl font-bold">{selectedData.totalProjects}</div>
              <div className="text-sm opacity-90 mt-1">Total Projects</div>
            </div>

            {/* Basic Education */}
            {selectedData.basicEducation !== undefined && selectedData.basicEducation > 0 && (
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.basicEducation}</div>
                <div className="text-sm opacity-90 mt-1">Basic Education</div>
              </div>
            )}

            {/* Secondary Education */}
            {selectedData.secondaryEducation !== undefined && selectedData.secondaryEducation > 0 && (
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.secondaryEducation}</div>
                <div className="text-sm opacity-90 mt-1">Secondary Education</div>
              </div>
            )}

            {/* Tertiary Education */}
            {selectedData.tertiaryEducation !== undefined && selectedData.tertiaryEducation > 0 && (
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.tertiaryEducation}</div>
                <div className="text-sm opacity-90 mt-1">Tertiary Education</div>
              </div>
            )}

            {/* Model Schools */}
            {selectedData.modelSchools !== undefined && selectedData.modelSchools > 0 && (
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-lg p-4">
                <div className="text-3xl font-bold">{selectedData.modelSchools}</div>
                <div className="text-sm opacity-90 mt-1">Model Schools</div>
              </div>
            )}

            {/* TVET Centers */}
            {selectedData.tvetCenters !== undefined && selectedData.tvetCenters > 0 && (
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg p-4">
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
