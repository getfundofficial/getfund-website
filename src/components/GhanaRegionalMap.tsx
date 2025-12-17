import { useState } from 'react';
import { MapPin } from 'lucide-react';

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

  const getRegionData = (regionName: string) => {
    return regions.find(r => r.name.toLowerCase() === regionName.toLowerCase());
  };

  const getRegionColor = (total: number) => {
    if (total >= 500) return 'from-green-800 to-green-900 border-green-700';
    if (total >= 200) return 'from-green-600 to-green-700 border-green-500';
    if (total >= 100) return 'from-green-400 to-green-500 border-green-300';
    if (total >= 50) return 'from-green-300 to-green-400 border-green-200';
    return 'from-green-200 to-green-300 border-green-100';
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(selectedRegion === regionName ? null : regionName);
  };

  const selectedData = selectedRegion ? getRegionData(selectedRegion) : null;

  // Organize regions by geographical zones for better visualization
  const regionalZones = {
    'Northern Zone': ['Upper East', 'Upper West', 'North East', 'Savannah', 'Northern'],
    'Middle Belt': ['Bono', 'Bono East', 'Ahafo', 'Oti'],
    'Forest & Coastal Zone': ['Ashanti', 'Eastern', 'Volta', 'Western North', 'Western', 'Central', 'Greater Accra']
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Regional Impact Distribution</h3>
        <p className="text-gray-600">Click on any region to view detailed breakdown</p>
      </div>

      {/* Geographical Zones */}
      <div className="space-y-8">
        {Object.entries(regionalZones).map(([zone, regionNames]) => (
          <div key={zone}>
            <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
              {zone}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {regionNames.map((regionName) => {
                const data = getRegionData(regionName);
                if (!data) return null;

                const colorClass = getRegionColor(data.totalProjects);
                const isSelected = selectedRegion === regionName;

                return (
                  <button
                    key={regionName}
                    onClick={() => handleRegionClick(regionName)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      isSelected
                        ? 'ring-4 ring-getfund-primary shadow-xl scale-105'
                        : 'hover:border-getfund-primary/50'
                    } bg-gradient-to-br ${colorClass}`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex flex-col items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <div className="text-center">
                        <div className="font-semibold text-sm">{regionName}</div>
                        <div className="text-2xl font-bold mt-1">{data.totalProjects}</div>
                        <div className="text-xs opacity-90">projects</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-800 to-green-900 border-2 border-green-700"></div>
            <span className="text-gray-700">500+ projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-600 to-green-700 border-2 border-green-500"></div>
            <span className="text-gray-700">200-499</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-green-500 border-2 border-green-300"></div>
            <span className="text-gray-700">100-199</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-300 to-green-400 border-2 border-green-200"></div>
            <span className="text-gray-700">50-99</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-200 to-green-300 border-2 border-green-100"></div>
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
