export interface CursorPagedRequest {
  after: number | null;
}
export interface PageRequest {
  size: number;
  page: number;
}

export interface CursorPagedResponse<T> {
  items: T[];
  nextCursor: number | null;
  hasMore: boolean;
}
export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
