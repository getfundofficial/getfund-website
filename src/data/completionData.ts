// GETFund Project Completion Data
// Source: Progress Completion Up To Date - Grand Summary

export interface SectorCompletion {
  id: string;
  sector: string;
  shortName: string;
  completed: number;
  progress70to99: number;
  progress30to69: number;
  belowThreshold: number; // <30%
  total: number;
  completionRate: number; // percentage
  color: string;
  parentId?: string; // For sub-sectors (e.g., E-Block and Model SHS under Secondary)
  isSubSector?: boolean;
}

export interface CompletionTotals {
  completed: number;
  progress70to99: number;
  progress30to69: number;
  belowThreshold: number;
  total: number;
  uncompleted: number;
}

// Completion status colors - Professional blue palette aligned with GETFund branding
export const COMPLETION_COLORS = {
  completed: '#1e3a5f',      // Navy blue (GETFund primary) - 100% complete
  progress70to99: '#3b82f6', // Medium blue - 70-99%
  progress30to69: '#06b6d4', // Cyan/teal - 30-69%
  belowThreshold: '#94a3b8', // Slate gray - <30%
};

export const COMPLETION_LABELS = {
  completed: 'Completed',
  progress70to99: '70-99%',
  progress30to69: '30-69%',
  belowThreshold: '<30%',
};

export const SECTOR_COMPLETION_DATA: SectorCompletion[] = [
  {
    id: 'basic',
    sector: 'Basic Education',
    shortName: 'Basic',
    completed: 5198,
    progress70to99: 396,
    progress30to69: 592,
    belowThreshold: 450,
    total: 6636,
    completionRate: Math.round((5198 / 6636) * 100),
    color: '#059669'
  },
  {
    id: 'secondary',
    sector: 'Secondary Education',
    shortName: 'Secondary',
    completed: 2886,
    progress70to99: 530,
    progress30to69: 270,
    belowThreshold: 327,
    total: 4013,
    completionRate: Math.round((2886 / 4013) * 100),
    color: '#10b981'
  },
  {
    id: 'eblock',
    sector: 'Community SHS (E-Block)',
    shortName: 'E-Block',
    completed: 36,
    progress70to99: 20,
    progress30to69: 18,
    belowThreshold: 27,
    total: 101,
    completionRate: Math.round((36 / 101) * 100),
    color: '#1e3a5f',
    parentId: 'secondary',
    isSubSector: true
  },
  {
    id: 'modelshs',
    sector: 'Model SHS',
    shortName: 'Model SHS',
    completed: 1,
    progress70to99: 5,
    progress30to69: 3,
    belowThreshold: 0,
    total: 9,
    completionRate: Math.round((1 / 9) * 100),
    color: '#7c3aed',
    parentId: 'secondary',
    isSubSector: true
  },
  {
    id: 'tertiary',
    sector: 'Tertiary Education',
    shortName: 'Tertiary',
    completed: 416,
    progress70to99: 104,
    progress30to69: 59,
    belowThreshold: 150,
    total: 729,
    completionRate: Math.round((416 / 729) * 100),
    color: '#0891b2'
  }
];

// Calculate totals
export const COMPLETION_TOTALS: CompletionTotals = {
  completed: SECTOR_COMPLETION_DATA.reduce((sum, s) => sum + s.completed, 0),
  progress70to99: SECTOR_COMPLETION_DATA.reduce((sum, s) => sum + s.progress70to99, 0),
  progress30to69: SECTOR_COMPLETION_DATA.reduce((sum, s) => sum + s.progress30to69, 0),
  belowThreshold: SECTOR_COMPLETION_DATA.reduce((sum, s) => sum + s.belowThreshold, 0),
  total: SECTOR_COMPLETION_DATA.reduce((sum, s) => sum + s.total, 0),
  uncompleted: 2935, // From source: "Less than 2,935"
};

// Overall completion rate
export const OVERALL_COMPLETION_RATE = Math.round((COMPLETION_TOTALS.completed / COMPLETION_TOTALS.total) * 100);

// Donut chart data format
export const DONUT_CHART_DATA = [
  { label: 'Completed', value: COMPLETION_TOTALS.completed, color: COMPLETION_COLORS.completed },
  { label: '70-99%', value: COMPLETION_TOTALS.progress70to99, color: COMPLETION_COLORS.progress70to99 },
  { label: '30-69%', value: COMPLETION_TOTALS.progress30to69, color: COMPLETION_COLORS.progress30to69 },
  { label: '<30%', value: COMPLETION_TOTALS.belowThreshold, color: COMPLETION_COLORS.belowThreshold },
];
