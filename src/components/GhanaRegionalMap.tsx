import { useState } from 'react';

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
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getRegionData = (regionName: string) => {
    return regions.find(r => r.name.toLowerCase() === regionName.toLowerCase());
  };

  const getRegionColor = (regionName: string) => {
    const data = getRegionData(regionName);
    if (!data) return '#E5E7EB'; // Gray for no data

    // Color scale based on total projects
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

  // SVG path data for Ghana's 16 regions (simplified coordinates)
  const regionPaths = {
    'Upper East': 'M 420,60 L 480,55 L 490,80 L 485,100 L 460,110 L 430,105 L 415,85 Z',
    'Upper West': 'M 350,70 L 410,65 L 415,85 L 430,105 L 420,130 L 380,125 L 360,110 L 345,90 Z',
    'North East': 'M 485,100 L 510,95 L 530,115 L 525,140 L 500,150 L 480,145 L 470,120 Z',
    'Northern': 'M 360,110 L 420,130 L 460,110 L 480,145 L 470,180 L 430,195 L 390,185 L 370,160 L 355,135 Z',
    'Savannah': 'M 345,135 L 370,160 L 390,185 L 380,210 L 350,220 L 330,200 L 320,170 L 335,145 Z',
    'Bono East': 'M 390,185 L 430,195 L 440,225 L 420,245 L 395,240 L 380,220 Z',
    'Bono': 'M 330,200 L 380,210 L 395,240 L 385,270 L 350,275 L 325,260 L 315,230 Z',
    'Ahafo': 'M 385,240 L 420,245 L 430,270 L 415,290 L 390,285 L 375,265 Z',
    'Oti': 'M 470,180 L 500,185 L 510,215 L 500,245 L 475,250 L 455,235 L 445,210 Z',
    'Volta': 'M 475,250 L 500,245 L 515,270 L 510,310 L 490,330 L 470,320 L 460,290 L 465,265 Z',
    'Eastern': 'M 430,270 L 465,265 L 480,290 L 475,320 L 450,330 L 425,320 L 415,295 Z',
    'Ashanti': 'M 350,275 L 390,285 L 415,290 L 425,320 L 410,345 L 380,350 L 355,340 L 340,315 L 335,290 Z',
    'Western North': 'M 315,260 L 350,275 L 355,300 L 345,325 L 320,330 L 300,315 L 295,285 Z',
    'Western': 'M 295,315 L 320,330 L 330,360 L 320,395 L 285,400 L 265,380 L 270,345 L 280,325 Z',
    'Central': 'M 340,340 L 380,350 L 395,375 L 385,400 L 355,410 L 330,400 L 325,375 L 335,355 Z',
    'Greater Accra': 'M 410,345 L 450,330 L 470,350 L 465,375 L 440,385 L 415,380 L 400,365 Z'
  };

  return (
    <div className={`relative ${className}`}>
      {/* SVG Map */}
      <svg
        viewBox="0 0 600 450"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="600" height="450" fill="#F3F4F6" />

        {/* Regions */}
        {Object.entries(regionPaths).map(([regionName, path]) => (
          <path
            key={regionName}
            d={path}
            fill={hoveredRegion === regionName || selectedRegion === regionName ? getRegionColor(regionName) : getRegionColor(regionName)}
            stroke="#FFFFFF"
            strokeWidth="2"
            className="cursor-pointer transition-all duration-200 hover:opacity-80"
            style={{
              filter: hoveredRegion === regionName || selectedRegion === regionName ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'none'
            }}
            onMouseEnter={() => setHoveredRegion(regionName)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => handleRegionClick(regionName)}
          />
        ))}

        {/* Region Labels */}
        {Object.keys(regionPaths).map((regionName) => {
          const data = getRegionData(regionName);
          // Calculate approximate center for each region (simplified)
          const labelPositions: Record<string, [number, number]> = {
            'Upper East': [455, 85],
            'Upper West': [380, 95],
            'North East': [505, 120],
            'Northern': [415, 155],
            'Savannah': [345, 185],
            'Bono East': [410, 215],
            'Bono': [355, 240],
            'Ahafo': [400, 265],
            'Oti': [475, 215],
            'Volta': [485, 290],
            'Eastern': [445, 300],
            'Ashanti': [375, 315],
            'Western North': [320, 295],
            'Western': [295, 355],
            'Central': [360, 380],
            'Greater Accra': [435, 365]
          };

          const [x, y] = labelPositions[regionName] || [0, 0];

          return (
            <g key={`label-${regionName}`}>
              {data && (
                <>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white pointer-events-none"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {regionName}
                  </text>
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-white pointer-events-none"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {data.totalProjects}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
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
  );
}
