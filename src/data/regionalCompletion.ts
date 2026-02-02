// GETFund Regional Completion Data
// Source: Ongoing GETFund Sponsored Projects - December 2024
// Distribution by Region & Progress (Level of Completion)

export interface RegionalCompletionData {
  id: number;
  name: string;
  belowThreshold: number; // <30% Completed
  progress30to69: number; // 30-69% Completed
  progress70to99: number; // 70-99% Completed
  total: number;
  // Calculated fields
  completionScore: number; // Weighted completion percentage
}

export interface CategoryCompletionData {
  id: number;
  sector: string;
  belowThreshold: number; // <30% Completed
  progress30to69: number; // 30-69% Completed
  progress70to99: number; // 70-99% Completed
  total: number;
  color: string;
}

// Regional completion data (ongoing projects)
export const REGIONAL_COMPLETION_DATA: RegionalCompletionData[] = [
  { id: 1, name: 'Ahafo', belowThreshold: 49, progress30to69: 18, progress70to99: 18, total: 85, completionScore: 0 },
  { id: 2, name: 'Ashanti', belowThreshold: 260, progress30to69: 152, progress70to99: 219, total: 631, completionScore: 0 },
  { id: 3, name: 'Bono', belowThreshold: 34, progress30to69: 134, progress70to99: 35, total: 203, completionScore: 0 },
  { id: 4, name: 'Bono East', belowThreshold: 12, progress30to69: 35, progress70to99: 30, total: 77, completionScore: 0 },
  { id: 5, name: 'Central', belowThreshold: 166, progress30to69: 181, progress70to99: 149, total: 496, completionScore: 0 },
  { id: 6, name: 'Eastern', belowThreshold: 218, progress30to69: 163, progress70to99: 104, total: 485, completionScore: 0 },
  { id: 7, name: 'Greater Accra', belowThreshold: 109, progress30to69: 107, progress70to99: 89, total: 305, completionScore: 0 },
  { id: 8, name: 'North East', belowThreshold: 18, progress30to69: 15, progress70to99: 22, total: 55, completionScore: 0 },
  { id: 9, name: 'Northern', belowThreshold: 81, progress30to69: 45, progress70to99: 42, total: 168, completionScore: 0 },
  { id: 10, name: 'Oti', belowThreshold: 21, progress30to69: 32, progress70to99: 35, total: 88, completionScore: 0 },
  { id: 11, name: 'Savannah', belowThreshold: 20, progress30to69: 17, progress70to99: 8, total: 45, completionScore: 0 },
  { id: 12, name: 'Upper East', belowThreshold: 57, progress30to69: 88, progress70to99: 59, total: 204, completionScore: 0 },
  { id: 13, name: 'Upper West', belowThreshold: 62, progress30to69: 58, progress70to99: 54, total: 174, completionScore: 0 },
  { id: 14, name: 'Volta', belowThreshold: 55, progress30to69: 130, progress70to99: 95, total: 280, completionScore: 0 },
  { id: 15, name: 'Western', belowThreshold: 39, progress30to69: 90, progress70to99: 55, total: 184, completionScore: 0 },
  { id: 16, name: 'Western North', belowThreshold: 13, progress30to69: 39, progress70to99: 33, total: 85, completionScore: 0 },
].map(region => ({
  ...region,
  // Calculate weighted completion score: (<30% * 0.15) + (30-69% * 0.5) + (70-99% * 0.85)
  completionScore: Math.round(
    ((region.belowThreshold * 0.15 + region.progress30to69 * 0.5 + region.progress70to99 * 0.85) / region.total) * 100
  )
}));

// Category/Sector completion data (ongoing projects by education level)
export const CATEGORY_COMPLETION_DATA: CategoryCompletionData[] = [
  { id: 1, sector: 'Basic', belowThreshold: 807, progress30to69: 636, progress70to99: 443, total: 1886, color: '#059669' },
  { id: 2, sector: 'E-Block', belowThreshold: 31, progress30to69: 22, progress70to99: 11, total: 64, color: '#1e3a5f' },
  { id: 3, sector: 'Model SHS', belowThreshold: 0, progress30to69: 2, progress70to99: 5, total: 7, color: '#7c3aed' },
  { id: 4, sector: 'Secondary', belowThreshold: 278, progress30to69: 533, progress70to99: 494, total: 1305, color: '#10b981' },
  { id: 5, sector: 'Tertiary', belowThreshold: 98, progress30to69: 111, progress70to99: 94, total: 303, color: '#0891b2' },
];

// Totals for ongoing projects
export const REGIONAL_TOTALS = {
  belowThreshold: REGIONAL_COMPLETION_DATA.reduce((sum, r) => sum + r.belowThreshold, 0),
  progress30to69: REGIONAL_COMPLETION_DATA.reduce((sum, r) => sum + r.progress30to69, 0),
  progress70to99: REGIONAL_COMPLETION_DATA.reduce((sum, r) => sum + r.progress70to99, 0),
  total: REGIONAL_COMPLETION_DATA.reduce((sum, r) => sum + r.total, 0),
};

export const CATEGORY_TOTALS = {
  belowThreshold: CATEGORY_COMPLETION_DATA.reduce((sum, c) => sum + c.belowThreshold, 0),
  progress30to69: CATEGORY_COMPLETION_DATA.reduce((sum, c) => sum + c.progress30to69, 0),
  progress70to99: CATEGORY_COMPLETION_DATA.reduce((sum, c) => sum + c.progress70to99, 0),
  total: CATEGORY_COMPLETION_DATA.reduce((sum, c) => sum + c.total, 0),
};

// Color scale for regional map (based on completion score)
export const COMPLETION_SCORE_COLORS = {
  low: '#dc2626',      // Red - Low completion score (< 40%)
  medium: '#f59e0b',   // Gold - Medium completion score (40-60%)
  high: '#10b981',     // Green - High completion score (> 60%)
};

// Get color based on completion score
export const getCompletionColor = (score: number): string => {
  if (score < 40) return COMPLETION_SCORE_COLORS.low;
  if (score < 60) return COMPLETION_SCORE_COLORS.medium;
  return COMPLETION_SCORE_COLORS.high;
};

// Data source info
export const DATA_SOURCE = {
  title: 'Ongoing GETFund Sponsored Projects',
  date: 'December 2024',
  totalOngoing: 3565,
};
