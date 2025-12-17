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

  const getRegionColor = (count: number): string => {
    if (count >= 500) return 'from-emerald-900 to-emerald-800';
    if (count >= 200) return 'from-emerald-700 to-emerald-600';
    if (count >= 100) return 'from-emerald-500 to-emerald-400';
    if (count >= 50) return 'from-emerald-300 to-emerald-200';
    return 'from-emerald-100 to-emerald-50';
  };

  const getTextColor = (count: number): string => {
    if (count >= 200) return 'text-white';
    return 'text-gray-900';
  };

  const selectedData = selectedRegion
    ? regions.find(r => r.name === selectedRegion)
    : null;

  // Sort regions by total projects (descending)
  const sortedRegions = [...regions].sort((a, b) => b.totalProjects - a.totalProjects);

  return (
    <div className={className}>
      {/* Title Section */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Regional Impact Distribution
        </h3>
        <p className="text-lg text-gray-600">
          Click on any region to view detailed breakdown
        </p>
      </div>

      {/* Regional Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {sortedRegions.map((region) => (
          <button
            key={region.name}
            onClick={() => setSelectedRegion(region.name)}
            className={`
              relative overflow-hidden rounded-xl p-5 text-left transition-all duration-300 shadow-md hover:shadow-xl
              bg-gradient-to-br ${getRegionColor(region.totalProjects)}
              ${selectedRegion === region.name ? 'ring-4 ring-getfund-primary scale-105' : 'hover:scale-102'}
              ${getTextColor(region.totalProjects)}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <MapPin className="w-5 h-5 opacity-70" />
              {selectedRegion === region.name && (
                <div className="w-2 h-2 bg-getfund-primary rounded-full animate-pulse"></div>
              )}
            </div>
            <h4 className="font-bold text-lg mb-1">{region.name}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{region.totalProjects.toLocaleString()}</span>
              <span className="text-sm opacity-80">projects</span>
            </div>
            <div className="mt-3 text-xs opacity-75 space-y-1">
              {region.basicEducation && region.basicEducation > 0 && (
                <div>Basic: {region.basicEducation}</div>
              )}
              {region.secondaryEducation && region.secondaryEducation > 0 && (
                <div>Secondary: {region.secondaryEducation}</div>
              )}
              {region.tertiaryEducation && region.tertiaryEducation > 0 && (
                <div>Tertiary: {region.tertiaryEducation}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Color Legend */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-md mb-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
          Project Distribution Scale
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm bg-gradient-to-br from-emerald-900 to-emerald-800"></div>
            <span className="text-sm text-gray-700 font-medium">500+ projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm bg-gradient-to-br from-emerald-700 to-emerald-600"></div>
            <span className="text-sm text-gray-700 font-medium">200-499</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm bg-gradient-to-br from-emerald-500 to-emerald-400"></div>
            <span className="text-sm text-gray-700 font-medium">100-199</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm bg-gradient-to-br from-emerald-300 to-emerald-200"></div>
            <span className="text-sm text-gray-700 font-medium">50-99</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shadow-sm bg-gradient-to-br from-emerald-100 to-emerald-50"></div>
            <span className="text-sm text-gray-700 font-medium">1-49</span>
          </div>
        </div>
      </div>

      {/* Selected Region Details Card */}
      {selectedData && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-getfund-primary animate-fadeIn">
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
