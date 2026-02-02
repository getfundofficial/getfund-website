// GETFund Projects Portfolio Data
// Source: GETFund Projects Portfolio Overview

export interface Programme {
  id: string;
  name: string;
  shortName: string;
  period: string;
  startYear: number;
  endYear: number | null; // null = ongoing
  projectCount: number;
  unit?: string; // e.g., "set" for Model SHS
  color: string;
  description?: string;
}

export interface PeriodGroup {
  period: string;
  startYear: number;
  endYear: number | null;
  programmes: Programme[];
  totalProjects: number;
}

export const PROGRAMMES_DATA: Programme[] = [
  {
    id: 'beip',
    name: 'Basic Education Improvement Programme',
    shortName: 'BEIP',
    period: '2001-2009',
    startYear: 2001,
    endYear: 2009,
    projectCount: 466,
    color: '#059669',
    description: 'Primary and basic school infrastructure development'
  },
  {
    id: 'seip',
    name: 'Secondary Education Improvement Programme',
    shortName: 'SEIP',
    period: '2001-2009',
    startYear: 2001,
    endYear: 2009,
    projectCount: 546,
    color: '#10b981',
    description: 'Secondary school infrastructure development'
  },
  {
    id: 'tertiary-2001',
    name: 'Various Tertiary Projects',
    shortName: 'Tertiary',
    period: '2001-2009',
    startYear: 2001,
    endYear: 2009,
    projectCount: 705,
    color: '#047857',
    description: 'University and polytechnic infrastructure'
  },
  {
    id: 'sut',
    name: 'Schools Under Trees Programme',
    shortName: 'SUT',
    period: '2010-Date',
    startYear: 2010,
    endYear: null,
    projectCount: 5945,
    color: '#dc2626',
    description: 'Replacing schools under trees with permanent structures'
  },
  {
    id: 'emip',
    name: 'Emergency Intervention Programme',
    shortName: 'EmIP',
    period: '2010-Date',
    startYear: 2010,
    endYear: null,
    projectCount: 3985,
    color: '#f59e0b',
    description: 'Emergency educational infrastructure interventions'
  },
  {
    id: 'eblocks',
    name: 'Community SHS Programme',
    shortName: 'E-Blocks',
    period: '2014-Date',
    startYear: 2014,
    endYear: null,
    projectCount: 101,
    color: '#1e3a5f',
    description: 'Community day senior high schools'
  },
  {
    id: 'vblock',
    name: 'Model SHS Programme',
    shortName: 'V-Block',
    period: '2019-Date',
    startYear: 2019,
    endYear: null,
    projectCount: 9,
    unit: 'set',
    color: '#7c3aed',
    description: 'Model senior high school facilities'
  },
  {
    id: 'teip',
    name: 'Tertiary Education Improvement Programme',
    shortName: 'TEIP',
    period: '2022-Date',
    startYear: 2022,
    endYear: null,
    projectCount: 48,
    color: '#0891b2',
    description: 'Modern tertiary education infrastructure'
  }
];

// Group programmes by period
export const PERIOD_GROUPS: PeriodGroup[] = [
  {
    period: '2001-2009',
    startYear: 2001,
    endYear: 2009,
    programmes: PROGRAMMES_DATA.filter(p => p.period === '2001-2009'),
    totalProjects: PROGRAMMES_DATA.filter(p => p.period === '2001-2009').reduce((sum, p) => sum + p.projectCount, 0)
  },
  {
    period: '2010-Date',
    startYear: 2010,
    endYear: null,
    programmes: PROGRAMMES_DATA.filter(p => p.period === '2010-Date'),
    totalProjects: PROGRAMMES_DATA.filter(p => p.period === '2010-Date').reduce((sum, p) => sum + p.projectCount, 0)
  },
  {
    period: '2014-Date',
    startYear: 2014,
    endYear: null,
    programmes: PROGRAMMES_DATA.filter(p => p.period === '2014-Date'),
    totalProjects: PROGRAMMES_DATA.filter(p => p.period === '2014-Date').reduce((sum, p) => sum + p.projectCount, 0)
  },
  {
    period: '2019-Date',
    startYear: 2019,
    endYear: null,
    programmes: PROGRAMMES_DATA.filter(p => p.period === '2019-Date'),
    totalProjects: PROGRAMMES_DATA.filter(p => p.period === '2019-Date').reduce((sum, p) => sum + p.projectCount, 0)
  },
  {
    period: '2022-Date',
    startYear: 2022,
    endYear: null,
    programmes: PROGRAMMES_DATA.filter(p => p.period === '2022-Date'),
    totalProjects: PROGRAMMES_DATA.filter(p => p.period === '2022-Date').reduce((sum, p) => sum + p.projectCount, 0)
  }
];

// Total projects across all programmes
export const TOTAL_PORTFOLIO_PROJECTS = PROGRAMMES_DATA.reduce((sum, p) => sum + p.projectCount, 0);

// Portfolio description
export const PORTFOLIO_DESCRIPTION = 'Current portfolio is a complex one comprising of several programmes spanning over the 24-year period (2001-2025)';
