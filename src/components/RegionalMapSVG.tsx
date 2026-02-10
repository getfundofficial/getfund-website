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
  if (count === undefined || count === 0) return '#D1D5DB';
  if (count >= 500) return '#065F46';
  if (count >= 200) return '#047857';
  if (count >= 100) return '#10B981';
  if (count >= 50) return '#34D399';
  return '#6EE7B7';
}

// Get color based on completion score
function getColorByCompletionScore(score: number | undefined): string {
  if (score === undefined) return '#D1D5DB';
  if (score < 40) return '#dc2626';
  if (score < 60) return '#f59e0b';
  return '#10b981';
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

  // Use refs for callbacks to avoid stale closures and unnecessary effect re-runs
  const onRegionClickRef = useRef(onRegionClick);
  const onRegionHoverRef = useRef(onRegionHover);
  onRegionClickRef.current = onRegionClick;
  onRegionHoverRef.current = onRegionHover;

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

  // Set up event delegation on SVG - runs once when SVG loads
  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    // Remove fixed width/height attributes and set responsive styling
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    // Disable pointer events on label_points circles so they don't block path clicks
    const labelPoints = svg.querySelector('#label_points');
    if (labelPoints) {
      (labelPoints as SVGElement).style.pointerEvents = 'none';
    }

    // Set initial styles on all paths
    const paths = svg.querySelectorAll('path[id^="GH"]');
    paths.forEach((path) => {
      const pathElement = path as SVGPathElement;
      pathElement.style.cursor = 'pointer';
      pathElement.style.transition = 'all 0.3s ease';
      pathElement.style.transformOrigin = 'center';
      pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
    });

    // Helper to find nearest GH path from event target
    const findRegionPath = (target: EventTarget | null): SVGPathElement | null => {
      if (!target || !(target instanceof Element)) return null;
      const path = target.closest('path[id^="GH"]');
      return path as SVGPathElement | null;
    };

    // Event delegation: click handler on SVG
    const handleClick = (e: MouseEvent) => {
      const pathElement = findRegionPath(e.target);
      if (!pathElement) return;
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      if (regionName) {
        onRegionClickRef.current(regionName);
      }
    };

    // Event delegation: mouseover handler on SVG
    const handleMouseOver = (e: MouseEvent) => {
      const pathElement = findRegionPath(e.target);
      if (!pathElement) return;

      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      if (regionName) {
        onRegionHoverRef.current(regionName);
      }

      // Apply hover styles
      pathElement.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) brightness(0.9)';
      pathElement.style.transform = 'scale(1.02)';

      // Bring to front
      const parent = pathElement.parentNode;
      if (parent) {
        parent.appendChild(pathElement);
      }
    };

    // Event delegation: mouseout handler on SVG
    const handleMouseOut = (e: MouseEvent) => {
      const pathElement = findRegionPath(e.target);
      if (!pathElement) return;

      onRegionHoverRef.current(null);

      // Reset styles (selected state styling is handled by the separate effect below)
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];
      pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
      pathElement.style.transform = 'scale(1)';
      // Color will be re-applied by the styling effect
      if (regionName) {
        pathElement.style.fill = getRegionBaseColor(regionName);
      }
    };

    svg.addEventListener('click', handleClick);
    svg.addEventListener('mouseover', handleMouseOver);
    svg.addEventListener('mouseout', handleMouseOut);

    return () => {
      svg.removeEventListener('click', handleClick);
      svg.removeEventListener('mouseover', handleMouseOver);
      svg.removeEventListener('mouseout', handleMouseOut);
    };
  // Only re-run when SVG content loads or color calculation changes
  }, [svgContent, getRegionBaseColor]);

  // Update region colors and selected state styling
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
        pathElement.style.fill = baseColor;
        pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
        pathElement.style.transform = 'scale(1)';
      }
    });
  }, [selectedRegion, getRegionBaseColor, viewMode]);

  return (
    <div className="flex justify-center items-center w-full">
      <div
        ref={containerRef}
        className="relative w-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
