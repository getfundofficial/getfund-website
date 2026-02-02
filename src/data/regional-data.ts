// Shared regional impact data for GhanaRegionalMap
// Update this file to change figures across all pages (Home, Impact)
// Source: GETFund General Fact Sheet Volume 2, May 2024

export interface RegionData {
  name: string;
  totalProjects: number;
  basicEducation: number;
  secondaryEducation: number;
  tertiaryEducation: number;
  modelSchools: number;
  tvetCenters: number;
}

export const REGIONS_DATA: RegionData[] = [
  { name: 'Ashanti', totalProjects: 748, basicEducation: 451, secondaryEducation: 281, tertiaryEducation: 12, modelSchools: 2, tvetCenters: 2 },
  { name: 'Eastern', totalProjects: 541, basicEducation: 301, secondaryEducation: 230, tertiaryEducation: 8, modelSchools: 1, tvetCenters: 1 },
  { name: 'Northern', totalProjects: 172, basicEducation: 101, secondaryEducation: 66, tertiaryEducation: 5, modelSchools: 0, tvetCenters: 0 },
  { name: 'Greater Accra', totalProjects: 77, basicEducation: 66, secondaryEducation: 1, tertiaryEducation: 0, modelSchools: 10, tvetCenters: 0 },
  { name: 'Upper East', totalProjects: 121, basicEducation: 68, secondaryEducation: 47, tertiaryEducation: 6, modelSchools: 0, tvetCenters: 0 },
  { name: 'Bono', totalProjects: 142, basicEducation: 73, secondaryEducation: 64, tertiaryEducation: 4, modelSchools: 1, tvetCenters: 0 },
  { name: 'Western', totalProjects: 110, basicEducation: 54, secondaryEducation: 55, tertiaryEducation: 1, modelSchools: 0, tvetCenters: 0 },
  { name: 'Ahafo', totalProjects: 102, basicEducation: 62, secondaryEducation: 34, tertiaryEducation: 5, modelSchools: 1, tvetCenters: 0 },
  { name: 'Central', totalProjects: 91, basicEducation: 91, secondaryEducation: 0, tertiaryEducation: 0, modelSchools: 0, tvetCenters: 0 },
  { name: 'Volta', totalProjects: 93, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 5, modelSchools: 0, tvetCenters: 0 },
  { name: 'Oti', totalProjects: 90, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 2, modelSchools: 0, tvetCenters: 0 },
  { name: 'Upper West', totalProjects: 86, basicEducation: 41, secondaryEducation: 41, tertiaryEducation: 4, modelSchools: 0, tvetCenters: 0 },
  { name: 'Bono East', totalProjects: 55, basicEducation: 23, secondaryEducation: 31, tertiaryEducation: 0, modelSchools: 1, tvetCenters: 0 },
  { name: 'Western North', totalProjects: 51, basicEducation: 24, secondaryEducation: 19, tertiaryEducation: 7, modelSchools: 1, tvetCenters: 0 },
  { name: 'North East', totalProjects: 50, basicEducation: 20, secondaryEducation: 27, tertiaryEducation: 2, modelSchools: 1, tvetCenters: 0 },
  { name: 'Savannah', totalProjects: 34, basicEducation: 13, secondaryEducation: 21, tertiaryEducation: 0, modelSchools: 0, tvetCenters: 0 },
];
