export interface MetaI {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}

export interface NbaApiResponseI<T> {
  data: T;
  meta: MetaI;
}
