export interface Filter {
  page: number;
  pageSize: number;
  filterOn: string;
  filterQuery: string;
  sortBy: string;
  isAccending: boolean;
}
