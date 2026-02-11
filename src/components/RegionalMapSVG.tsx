import { useEffect, useRef, useState, useCallback } from 'react';
import { RegionalCompletionData } from '../data/regionalCompletion';

interface Region {
  name: string;
  totalProjects: number;
}

type ViewMode = 'projects' | 'completion';

interface RegionalMapSVGProps {
  regions: Region[];
  onRegionHover: (regionName: string | null) => void;
  onRegionClick: (regionName: string) => void;
  selectedRegion: string | null;
  viewMode?: ViewMode;
  completionData?: RegionalCompletionData[];
}

// Map SVG IDs to region names
const regionIdToName: Record<string, string> = {
  'GHAF': 'Ahafo',
  'GHAH': 'Ashanti',
  'GHBO': 'Bono',
  'GHBE': 'Bono East',
  'GHCP': 'Central',
  'GHEP': 'Eastern',
  'GHAA': 'Greater Accra',
  'GHNP': 'Northern',
  'GHNE': 'North East',
  'GHOT': 'Oti',
  'GHSV': 'Savannah',
  'GHUE': 'Upper East',
  'GHUW': 'Upper West',
  'GHTV': 'Volta',
  'GHWP': 'Western',
  'GHWN': 'Western North',
};

// Get color based on project count (matching the legend)
function getColorByProjectCount(count: number | undefined): string {
  if (count === undefined || count === 0) return '#D1D5DB'; // No data - gray
  if (count >= 500) return '#065F46'; // 500+ - very dark green
  if (count >= 200) return '#047857'; // 200-499 - dark green
  if (count >= 100) return '#10B981'; // 100-199 - medium green
  if (count >= 50) return '#34D399';  // 50-99 - light green
  return '#6EE7B7';                    // 1-49 - very light green
}

// Get color based on completion score
function getColorByCompletionScore(score: number | undefined): string {
  if (score === undefined) return '#D1D5DB'; // No data - gray
  if (score < 40) return '#dc2626';  // Low - red
  if (score < 60) return '#f59e0b';  // Medium - gold
  return '#10b981';                   // High - green
}

export default function RegionalMapSVG({
  regions,
  onRegionHover,
  onRegionClick,
  selectedRegion,
  viewMode = 'projects',
  completionData = []
}: RegionalMapSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Find region data by name
  const findRegionData = useCallback((regionName: string): Region | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return regions.find(r => normalize(r.name) === normalize(regionName));
  }, [regions]);

  // Find completion data by name
  const findCompletionData = useCallback((regionName: string): RegionalCompletionData | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return completionData.find(r => normalize(r.name) === normalize(regionName));
  }, [completionData]);

  // Get base color for a region based on view mode
  const getRegionBaseColor = useCallback((regionName: string): string => {
    if (viewMode === 'completion') {
      const data = findCompletionData(regionName);
      return getColorByCompletionScore(data?.completionScore);
    }
    const regionData = findRegionData(regionName);
    return getColorByProjectCount(regionData?.totalProjects);
  }, [viewMode, findRegionData, findCompletionData]);

  // Inject pulsate animation styles
  useEffect(() => {
    const styleId = 'region-pulsate-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes regionPulsate {
          0%, 100% {
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5)) brightness(0.85);
            transform: scale(1.03);
          }
          50% {
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7)) brightness(1);
            transform: scale(1.06);
          }
        }
        .region-selected {
          animation: regionPulsate 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Load SVG content
  useEffect(() => {
    fetch('/images/gh.svg')
      .then(response => response.text())
      .then(text => {
        setSvgContent(text);
      })
      .catch(err => console.error('Failed to load SVG:', err));
  }, []);

  // Add event listeners to SVG paths
  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    // Remove fixed width/height attributes and set responsive styling
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    const paths = svg.querySelectorAll('path[id^="GH"]');

    paths.forEach((path) => {
      const pathElement = path as SVGPathElement;
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      const baseColor = getRegionBaseColor(regionName);

      // Set base styles with color based on view mode
      pathElement.style.cursor = 'pointer';
      pathElement.style.transition = 'all 0.3s ease';
      pathElement.style.transformOrigin = 'center';
      pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
      pathElement.style.fill = baseColor;

      // Mouse enter - pop out effect
      pathElement.addEventListener('mouseenter', () => {
        setHoveredRegion(regionId);
        if (regionName) {
          onRegionHover(regionName);
        }

        // Apply hover styles - darken the color slightly
        pathElement.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) brightness(0.9)';
        pathElement.style.transform = 'scale(1.02)';

        // Bring to front by appending to parent
        const parent = pathElement.parentNode;
        if (parent) {
          parent.appendChild(pathElement);
        }
      });

      // Mouse leave - reset
      pathElement.addEventListener('mouseleave', () => {
        setHoveredRegion(null);
        onRegionHover(null);

        // Reset styles unless selected
        if (selectedRegion !== regionName) {
          pathElement.style.fill = baseColor;
          pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
          pathElement.style.transform = 'scale(1)';
        }
      });

      // Apply selected state styling with pulsate animation
      if (selectedRegion === regionName) {
        pathElement.classList.add('region-selected');
        // Bring selected region to front
        const parent = pathElement.parentNode;
        if (parent) {
          parent.appendChild(pathElement);
        }
      } else {
        pathElement.classList.remove('region-selected');
      }
    });

    // Cleanup event listeners
    return () => {
      paths.forEach((path) => {
        const pathElement = path as SVGPathElement;
        pathElement.replaceWith(pathElement.cloneNode(true));
      });
    };
  }, [svgContent, selectedRegion, onRegionHover, getRegionBaseColor]);

  // Update region colors when data or view mode changes
  useEffect(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path[id^="GH"]');

    paths.forEach((path) => {
      const pathElement = path as SVGPathElement;
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      const baseColor = getRegionBaseColor(regionName);

      if (selectedRegion === regionName) {
        pathElement.style.fill = baseColor;
        pathElement.classList.add('region-selected');
        // Bring selected region to front
        const parent = pathElement.parentNode;
        if (parent) {
          parent.appendChild(pathElement);
        }
      } else {
        pathElement.classList.remove('region-selected');
        if (hoveredRegion !== regionId) {
          pathElement.style.fill = baseColor;
          pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
          pathElement.style.transform = 'scale(1)';
        }
      }
    });
  }, [selectedRegion, hoveredRegion, getRegionBaseColor, viewMode]);

  return (
    <div className="flex justify-center items-center w-full">
      <div
        ref={containerRef}
        className="relative w-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        onClick={(e) => {
          const target = e.target as Element;
          console.log('[MAP CLICK] tagName:', target.tagName, 'id:', target.id);
          if (target.id?.startsWith('GH')) {
            const name = regionIdToName[target.id];
            console.log('[MAP CLICK] Resolved region:', name);
            if (name) onRegionClick(name);
          }
        }}
      />
    </div>
  );
}
