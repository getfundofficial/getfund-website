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

export default function GhanaRegionalMap({ regions, className = '' }: GhanaRegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [geoUrl] = useState('/data/ghana-regions.geojson');

  useEffect(() => {
    console.log('=== GHANA MAP DEBUG ===');
    console.log('Total regions received:', regions.length);
    console.log('Region names:', regions.map(r => r.name).join(', '));
    console.log('GeoJSON URL:', geoUrl);
  }, [regions, geoUrl]);

  const getRegionColor = (regionName: string): string => {
    const region = regions.find(r => r.name === regionName);

    if (!region) {
      console.warn(`No data found for region: ${regionName}`);
      return '#D1D5DB'; // Light gray for no data
    }

    const count = region.totalProjects;

    // Color scale from light to dark green based on project count
    if (count >= 500) return '#065F46'; // Very dark green
    if (count >= 200) return '#047857'; // Dark green
    if (count >= 100) return '#10B981'; // Medium green
    if (count >= 50) return '#34D399'; // Light green
    return '#6EE7B7'; // Very light green
  };

  const handleRegionClick = (regionName: string) => {
    console.log('Region clicked:', regionName);
    setSelectedRegion(prev => prev === regionName ? null : regionName);
  };

  const selectedData = selectedRegion
    ? regions.find(r => r.name === selectedRegion)
    : null;

  return (
    <div className={className}>
      {/* Title Section */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Regional Impact Distribution
        </h3>
        <p className="text-lg text-gray-600">
          Click on any region to view detailed breakdown
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            rotate: [0, 0, 0],
            center: [-1.2, 7.8],
            scale: 3500
          }}
          width={1000}
          height={800}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '800px'
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              if (!geographies || geographies.length === 0) {
                console.error('ERROR: No geographies loaded from GeoJSON');
                return null;
              }

              console.log('GeoJSON loaded successfully!');
              console.log('Number of regions in GeoJSON:', geographies.length);
              console.log('GeoJSON region names:', geographies.map((geo: any) => geo.properties.region).join(', '));

              return geographies.map((geo: any) => {
                const regionName = geo.properties.region;
                const isSelected = selectedRegion === regionName;
                const isHovered = hoveredRegion === regionName;
                const fillColor = getRegionColor(regionName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                    style={{
                      default: {
                        outline: 'none',
                        transition: 'all 0.2s ease-in-out'
                      },
                      hover: {
                        outline: 'none',
                        fill: fillColor,
                        filter: 'brightness(0.85)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      },
                      pressed: {
                        outline: 'none',
                        fill: fillColor,
                        filter: 'brightness(0.7)',
                        transition: 'all 0.2s ease-in-out'
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredRegion(regionName);
                      console.log('Hovering:', regionName);
                    }}
                    onMouseLeave={() => {
                      setHoveredRegion(null);
                    }}
                    onClick={() => handleRegionClick(regionName)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>

        {/* Hover Tooltip */}
        {hoveredRegion && !selectedRegion && (
          <div className="absolute top-6 right-6 bg-gray-900 bg-opacity-95 text-white px-5 py-3 rounded-lg shadow-2xl z-20 pointer-events-none">
            <div className="font-bold text-base mb-1">{hoveredRegion}</div>
            {regions.find(r => r.name === hoveredRegion) && (
              <div className="text-gray-200 text-sm">
                {regions.find(r => r.name === hoveredRegion)?.totalProjects.toLocaleString()} projects
              </div>
            )}
            <div className="text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
              Click to see details
            </div>
          </div>
        )}
      </div>

      {/* Color Legend */}
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

      {/* Selected Region Details Card */}
      {selectedData && (
        <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 border-4 border-getfund-primary animate-fadeIn">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {selectedData.name} Region
              </h3>
              <p className="text-gray-500">Detailed project breakdown</p>
            </div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
              aria-label="Close details"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Total Projects - Always shown */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-4 bg-gradient-to-br from-getfund-primary via-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">{selectedData.totalProjects.toLocaleString()}</div>
              <div className="text-lg opacity-95">Total Projects</div>
            </div>

            {/* Basic Education */}
            {selectedData.basicEducation !== undefined && selectedData.basicEducation > 0 && (
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-1">{selectedData.basicEducation.toLocaleString()}</div>
                <div className="text-sm opacity-90">Basic Education</div>
              </div>
            )}

            {/* Secondary Education */}
            {selectedData.secondaryEducation !== undefined && selectedData.secondaryEducation > 0 && (
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-1">{selectedData.secondaryEducation.toLocaleString()}</div>
                <div className="text-sm opacity-90">Secondary Education</div>
              </div>
            )}

            {/* Tertiary Education */}
            {selectedData.tertiaryEducation !== undefined && selectedData.tertiaryEducation > 0 && (
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-1">{selectedData.tertiaryEducation.toLocaleString()}</div>
                <div className="text-sm opacity-90">Tertiary Education</div>
              </div>
            )}

            {/* Model Schools */}
            {selectedData.modelSchools !== undefined && selectedData.modelSchools > 0 && (
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-1">{selectedData.modelSchools.toLocaleString()}</div>
                <div className="text-sm opacity-90">Model Schools</div>
              </div>
            )}

            {/* TVET Centers */}
            {selectedData.tvetCenters !== undefined && selectedData.tvetCenters > 0 && (
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-1">{selectedData.tvetCenters.toLocaleString()}</div>
                <div className="text-sm opacity-90">TVET Centers</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
