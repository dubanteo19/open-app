export interface ApiResponse<T> {
  message: string;
  sucess: boolean;
  data: T;
  errrors: string[];
  timestamp: string;
}

