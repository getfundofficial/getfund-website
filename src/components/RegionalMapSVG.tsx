import { useEffect, useRef, useState, useCallback } from 'react';

interface Region {
  name: string;
  totalProjects: number;
}

interface RegionalMapSVGProps {
  regions: Region[];
  onRegionHover: (regionName: string | null) => void;
  onRegionClick: (regionName: string) => void;
  selectedRegion: string | null;
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

export default function RegionalMapSVG({
  regions,
  onRegionHover,
  onRegionClick,
  selectedRegion
}: RegionalMapSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Find region data by name
  const findRegionData = useCallback((regionName: string): Region | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return regions.find(r => normalize(r.name) === normalize(regionName));
  }, [regions]);

  // Get base color for a region based on its project count
  const getRegionBaseColor = useCallback((regionName: string): string => {
    const regionData = findRegionData(regionName);
    return getColorByProjectCount(regionData?.totalProjects);
  }, [findRegionData]);

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

    // Set SVG styling
    svg.style.width = '100%';
    svg.style.maxWidth = '500px';
    svg.style.height = 'auto';

    const paths = svg.querySelectorAll('path[id^="GH"]');

    paths.forEach((path) => {
      const pathElement = path as SVGPathElement;
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      const baseColor = getRegionBaseColor(regionName);

      // Set base styles with color based on project count
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

      // Click handler
      pathElement.addEventListener('click', () => {
        if (regionName) {
          onRegionClick(regionName);
        }
      });

      // Apply selected state styling
      if (selectedRegion === regionName) {
        pathElement.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) brightness(0.85)';
        pathElement.style.transform = 'scale(1.03)';
      }
    });

    // Cleanup event listeners
    return () => {
      paths.forEach((path) => {
        const pathElement = path as SVGPathElement;
        pathElement.replaceWith(pathElement.cloneNode(true));
      });
    };
  }, [svgContent, selectedRegion, onRegionHover, onRegionClick, getRegionBaseColor]);

  // Update region colors when data changes
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
        pathElement.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) brightness(0.85)';
        pathElement.style.transform = 'scale(1.03)';
      } else if (hoveredRegion !== regionId) {
        pathElement.style.fill = baseColor;
        pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
        pathElement.style.transform = 'scale(1)';
      }
    });
  }, [selectedRegion, hoveredRegion, getRegionBaseColor]);

  return (
    <div className="flex justify-center items-center w-full">
      <div
        ref={containerRef}
        className="relative"
        style={{ width: '100%', maxWidth: '500px' }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
