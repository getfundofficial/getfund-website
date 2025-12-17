import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { scaleThreshold } from 'd3-scale';

// Ghana's approximate geographic center
const GHANA_CENTER: [number, number] = [-1.2, 7.8];

// Map dimensions
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 800;

/**
 * Creates a Mercator projection centered on Ghana
 */
export function createGhanaProjection(width: number = MAP_WIDTH, height: number = MAP_HEIGHT): GeoProjection {
  return geoMercator()
    .center(GHANA_CENTER)
    .scale(4000)
    .translate([width / 2, height / 2]);
}

/**
 * Creates a path generator for the given projection
 */
export function createPathGenerator(projection: GeoProjection) {
  return geoPath().projection(projection);
}

/**
 * Color scale for project counts (choropleth visualization)
 */
export function createColorScale() {
  return scaleThreshold<number, string>()
    .domain([50, 100, 200, 500])
    .range([
      '#6EE7B7', // 1-49 projects (very light green)
      '#34D399', // 50-99 projects (light green)
      '#10B981', // 100-199 projects (medium green)
      '#047857', // 200-499 projects (dark green)
      '#065F46'  // 500+ projects (very dark green)
    ]);
}

/**
 * Normalizes region names for matching (trim + lowercase)
 */
export function normalizeRegionName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Gets color for a region based on project count
 */
export function getRegionColor(projectCount: number | undefined): string {
  if (projectCount === undefined) {
    return '#D1D5DB'; // Gray for no data
  }
  return createColorScale()(projectCount);
}
