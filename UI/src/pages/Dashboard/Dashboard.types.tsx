export interface DashboardProps {
  sessionId: string;
}

export interface DashboardState {
  isFilterOpen: boolean;
  selectedFilters: SelectedFilters;
  isMapOpen: boolean;
  kpiDetailReport: string;
  mapData: FranchiseMapData[]
}

export interface SelectedFilters {
  [index: string]: FilterOption;
}

export interface FilterOption {
  label: string;
  value: string;
  selected: boolean;
}

export interface ReportParams {
  [index:string]: string[];
}

export interface FranchiseMapData {
  system_id: string;
  region_id: string;
  center_lat: number;
  center_lon: number;
  name: string;
  percent_stations_in_need: number;
}