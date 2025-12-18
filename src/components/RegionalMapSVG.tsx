import { useEffect, useRef, useState } from 'react';

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

export default function RegionalMapSVG({
  onRegionHover,
  onRegionClick,
  selectedRegion
}: RegionalMapSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

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

      // Set base styles
      pathElement.style.cursor = 'pointer';
      pathElement.style.transition = 'all 0.3s ease';
      pathElement.style.transformOrigin = 'center';
      pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';

      // Mouse enter - pop out effect
      pathElement.addEventListener('mouseenter', () => {
        setHoveredRegion(regionId);
        if (regionName) {
          onRegionHover(regionName);
        }

        // Apply hover styles
        pathElement.style.fill = '#047857';
        pathElement.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
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
          pathElement.style.fill = '#6f9c76';
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
        pathElement.style.fill = '#065F46';
        pathElement.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))';
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
  }, [svgContent, selectedRegion, onRegionHover, onRegionClick]);

  // Update selected region styling when it changes
  useEffect(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path[id^="GH"]');

    paths.forEach((path) => {
      const pathElement = path as SVGPathElement;
      const regionId = pathElement.id;
      const regionName = regionIdToName[regionId];

      if (selectedRegion === regionName) {
        pathElement.style.fill = '#065F46';
        pathElement.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))';
        pathElement.style.transform = 'scale(1.03)';
      } else if (hoveredRegion !== regionId) {
        pathElement.style.fill = '#6f9c76';
        pathElement.style.filter = 'drop-shadow(0 0 0 transparent)';
        pathElement.style.transform = 'scale(1)';
      }
    });
  }, [selectedRegion, hoveredRegion]);

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
