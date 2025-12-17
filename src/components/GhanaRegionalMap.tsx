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

  // SVG path data for Ghana's 16 regions (accurate geographical boundaries)
  // Ghana is roughly oriented north-south, with coastal regions at the bottom
  const regionPaths = {
    // Northern regions (top of map)
    'Upper East': 'M 380,40 L 450,35 L 470,50 L 475,75 L 460,95 L 440,100 L 410,95 L 390,80 L 375,60 Z',
    'Upper West': 'M 280,50 L 340,45 L 370,60 L 390,80 L 385,110 L 365,125 L 330,130 L 300,115 L 275,85 Z',
    'North East': 'M 460,95 L 475,75 L 495,85 L 510,105 L 515,130 L 505,150 L 485,155 L 465,145 L 455,120 Z',
    'Savannah': 'M 275,85 L 300,115 L 330,130 L 350,145 L 340,175 L 315,190 L 285,185 L 265,160 L 260,120 Z',
    'Northern': 'M 330,130 L 365,125 L 385,110 L 410,95 L 440,100 L 460,95 L 465,145 L 470,170 L 450,200 L 420,210 L 385,205 L 360,195 L 340,175 L 350,145 Z',

    // Middle regions
    'Bono': 'M 260,195 L 285,185 L 315,190 L 340,175 L 360,195 L 365,230 L 350,255 L 320,265 L 290,255 L 270,235 L 255,215 Z',
    'Bono East': 'M 360,195 L 385,205 L 395,230 L 390,255 L 370,270 L 350,265 L 350,255 L 365,230 Z',
    'Ahafo': 'M 320,265 L 350,255 L 365,230 L 370,270 L 365,295 L 345,305 L 320,300 L 310,280 Z',
    'Oti': 'M 470,170 L 485,155 L 505,150 L 520,165 L 525,195 L 520,230 L 505,250 L 480,255 L 460,245 L 450,215 Z',

    // Central-southern regions
    'Ashanti': 'M 320,300 L 345,305 L 365,295 L 390,255 L 395,230 L 420,210 L 435,230 L 445,260 L 430,295 L 405,315 L 375,325 L 345,325 L 325,315 Z',
    'Eastern': 'M 405,315 L 430,295 L 445,260 L 460,245 L 480,255 L 495,275 L 505,305 L 500,340 L 480,360 L 455,365 L 430,355 L 415,335 Z',
    'Volta': 'M 480,255 L 505,250 L 520,230 L 530,245 L 540,275 L 545,315 L 540,355 L 525,385 L 505,395 L 480,390 L 465,370 L 460,340 L 470,310 L 480,285 Z',
    'Western North': 'M 255,270 L 270,235 L 290,255 L 310,280 L 320,300 L 325,315 L 315,340 L 290,350 L 265,340 L 250,315 L 245,290 Z',
    'Western': 'M 245,340 L 265,340 L 290,350 L 305,375 L 310,410 L 305,445 L 285,465 L 255,470 L 230,455 L 220,425 L 225,390 L 235,365 Z',
    'Central': 'M 315,340 L 345,325 L 375,325 L 405,315 L 415,335 L 425,365 L 420,395 L 405,415 L 375,425 L 345,420 L 320,405 L 310,380 L 305,360 Z',
    'Greater Accra': 'M 405,415 L 420,395 L 425,365 L 430,355 L 455,365 L 470,385 L 475,410 L 465,435 L 445,445 L 420,440 L 410,425 Z'
  };

  return (
    <div className={`relative ${className}`}>
      {/* SVG Map */}
      <svg
        viewBox="200 0 400 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect x="200" y="0" width="400" height="500" fill="#F3F4F6" />

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
            'Upper East': [425, 70],
            'Upper West': [320, 90],
            'North East': [490, 120],
            'Savannah': [285, 145],
            'Northern': [400, 155],
            'Bono': [310, 230],
            'Bono East': [370, 230],
            'Ahafo': [340, 285],
            'Oti': [490, 210],
            'Ashanti': [370, 285],
            'Eastern': [445, 330],
            'Volta': [505, 320],
            'Western North': [275, 305],
            'Western': [260, 405],
            'Central': [360, 375],
            'Greater Accra': [440, 405]
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
