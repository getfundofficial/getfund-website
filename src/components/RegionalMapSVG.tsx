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

function getColorByProjectCount(count: number | undefined): string {
  if (count === undefined || count === 0) return '#D1D5DB';
  if (count >= 500) return '#065F46';
  if (count >= 200) return '#047857';
  if (count >= 100) return '#10B981';
  if (count >= 50) return '#34D399';
  return '#6EE7B7';
}

function getColorByCompletionScore(score: number | undefined): string {
  if (score === undefined) return '#D1D5DB';
  if (score < 40) return '#dc2626';
  if (score < 60) return '#f59e0b';
  return '#10b981';
}

// Helper: find the closest ancestor (or self) matching a GH path
function findRegionPath(target: EventTarget | null): SVGPathElement | null {
  let el = target as Element | null;
  while (el) {
    if (el.tagName === 'path' && el.id && el.id.startsWith('GH')) {
      return el as SVGPathElement;
    }
    el = el.parentElement;
  }
  return null;
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
  const [svgReady, setSvgReady] = useState(false);

  // Store latest callbacks in refs so event handlers always use current versions
  const onRegionClickRef = useRef(onRegionClick);
  const onRegionHoverRef = useRef(onRegionHover);
  onRegionClickRef.current = onRegionClick;
  onRegionHoverRef.current = onRegionHover;

  // Store latest color function in ref for event handlers
  const getRegionBaseColorRef = useRef<(name: string) => string>(() => '#D1D5DB');

  const findRegionData = useCallback((regionName: string): Region | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return regions.find(r => normalize(r.name) === normalize(regionName));
  }, [regions]);

  const findCompletionData = useCallback((regionName: string): RegionalCompletionData | undefined => {
    const normalize = (name: string) => name.trim().toLowerCase();
    return completionData.find(r => normalize(r.name) === normalize(regionName));
  }, [completionData]);

  const getRegionBaseColor = useCallback((regionName: string): string => {
    if (viewMode === 'completion') {
      const data = findCompletionData(regionName);
      return getColorByCompletionScore(data?.completionScore);
    }
    const regionData = findRegionData(regionName);
    return getColorByProjectCount(regionData?.totalProjects);
  }, [viewMode, findRegionData, findCompletionData]);

  // Keep ref in sync
  getRegionBaseColorRef.current = getRegionBaseColor;

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

  // Load SVG and inject into DOM via ref (not dangerouslySetInnerHTML)
  useEffect(() => {
    if (!containerRef.current) return;
    fetch('/images/gh.svg')
      .then(response => response.text())
      .then(text => {
        if (containerRef.current) {
          containerRef.current.innerHTML = text;
          setSvgReady(true);
        }
      })
      .catch(err => console.error('Failed to load SVG:', err));
  }, []);

  // Set up SVG styling and event listeners - runs once after SVG is injected
  useEffect(() => {
    if (!svgReady || !containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    // Make SVG responsive
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    // Disable pointer events on label_points circles
    const labelPoints = svg.querySelector('#label_points');
    if (labelPoints) {
      (labelPoints as SVGElement).style.pointerEvents = 'none';
    }
    const points = svg.querySelector('#points');
    if (points) {
      (points as SVGElement).style.pointerEvents = 'none';
    }

    // Set initial styles on all region paths
    const paths = svg.querySelectorAll('path[id^="GH"]');
    paths.forEach((path) => {
      const p = path as SVGPathElement;
      p.style.cursor = 'pointer';
      p.style.transition = 'all 0.3s ease';
      p.style.transformOrigin = 'center';
      p.style.filter = 'drop-shadow(0 0 0 transparent)';
    });

    // Click handler - uses ref to always get latest callback
    const handleClick = (e: MouseEvent) => {
      const pathEl = findRegionPath(e.target);
      if (!pathEl) return;
      const regionName = regionIdToName[pathEl.id];
      if (regionName) {
        onRegionClickRef.current(regionName);
      }
    };

    // Hover handler
    const handleMouseOver = (e: MouseEvent) => {
      const pathEl = findRegionPath(e.target);
      if (!pathEl) return;
      const regionName = regionIdToName[pathEl.id];
      if (regionName) {
        onRegionHoverRef.current(regionName);
      }
      pathEl.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) brightness(0.9)';
      pathEl.style.transform = 'scale(1.02)';
      const parent = pathEl.parentNode;
      if (parent) parent.appendChild(pathEl);
    };

    // Mouse leave handler
    const handleMouseOut = (e: MouseEvent) => {
      const pathEl = findRegionPath(e.target);
      if (!pathEl) return;
      onRegionHoverRef.current(null);
      const regionName = regionIdToName[pathEl.id];
      pathEl.style.filter = 'drop-shadow(0 0 0 transparent)';
      pathEl.style.transform = 'scale(1)';
      if (regionName) {
        pathEl.style.fill = getRegionBaseColorRef.current(regionName);
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
  // Only runs once when SVG becomes ready
  }, [svgReady]);

  // Update region colors and selected state
  useEffect(() => {
    if (!svgReady || !containerRef.current) return;
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path[id^="GH"]');
    paths.forEach((path) => {
      const p = path as SVGPathElement;
      const regionName = regionIdToName[p.id];
      const baseColor = getRegionBaseColor(regionName);

      if (selectedRegion === regionName) {
        p.style.fill = baseColor;
        p.classList.add('region-selected');
        const parent = p.parentNode;
        if (parent) parent.appendChild(p);
      } else {
        p.classList.remove('region-selected');
        p.style.fill = baseColor;
        p.style.filter = 'drop-shadow(0 0 0 transparent)';
        p.style.transform = 'scale(1)';
      }
    });
  }, [selectedRegion, getRegionBaseColor, viewMode, svgReady]);

  // No dangerouslySetInnerHTML - SVG is injected via ref
  return (
    <div className="flex justify-center items-center w-full">
      <div ref={containerRef} className="relative w-full" />
    </div>
  );
}
