import { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { createGhanaProjection, createPathGenerator, getRegionColor, normalizeRegionName, MAP_WIDTH, MAP_HEIGHT } from '../utils/mapUtils';

interface Region {
  name: string;
  totalProjects: number;
}

interface GeoFeature {
  type: string;
  properties: {
    region: string;
    capital: string;
  };
  geometry: any;
}

interface GeoJSON {
  type: string;
  features: GeoFeature[];
}

interface RegionalMapSVGProps {
  regions: Region[];
  onRegionHover: (regionName: string | null) => void;
  onRegionClick: (regionName: string) => void;
  selectedRegion: string | null;
}

export default function RegionalMapSVG({ regions, onRegionHover, onRegionClick, selectedRegion }: RegionalMapSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/data/ghana-regions.geojson')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load GeoJSON');
        return response.json();
      })
      .then(data => {
        console.log('[RegionalMapSVG] GeoJSON loaded:', data.features.length, 'regions');
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('[RegionalMapSVG] Error loading GeoJSON:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Render D3 map
  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = select(svgRef.current);
    const projection = createGhanaProjection(MAP_WIDTH, MAP_HEIGHT);
    const pathGenerator = createPathGenerator(projection);

    // Helper function to find region data
    const findRegionData = (geoRegionName: string) => {
      return regions.find(r => normalizeRegionName(r.name) === normalizeRegionName(geoRegionName));
    };

    // Clear existing paths
    svg.selectAll('path').remove();

    // Render map paths
    svg.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', (d: any) => pathGenerator(d))
      .attr('fill', (d: GeoFeature) => {
        const regionData = findRegionData(d.properties.region);
        return getRegionColor(regionData?.totalProjects);
      })
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5)
      .attr('class', 'region-path')
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .on('mouseenter', function(event, d: GeoFeature) {
        select(this)
          .attr('stroke-width', 2.5)
          .style('filter', 'brightness(0.85)');
        onRegionHover(d.properties.region);
      })
      .on('mouseleave', function() {
        select(this)
          .attr('stroke-width', 1.5)
          .style('filter', 'none');
        onRegionHover(null);
      })
      .on('click', (event, d: GeoFeature) => {
        onRegionClick(d.properties.region);
      });

  }, [geoData, regions, onRegionHover, onRegionClick]);

  // Update selected region styling
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);
    svg.selectAll('path')
      .attr('stroke-width', (d: any) =>
        d.properties.region === selectedRegion ? 3 : 1.5
      )
      .style('filter', (d: any) =>
        d.properties.region === selectedRegion ? 'brightness(0.7)' : 'none'
      );
  }, [selectedRegion]);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <svg
      ref={svgRef}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      className="max-w-full h-auto"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
    />
  );
}
