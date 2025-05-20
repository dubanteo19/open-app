import { ErrorCode } from "@react-oauth/google";

export interface ApiResponse<T> {
  message: string;
  sucess: boolean;
  data: T;
  errrors: string[];
  errorCode: ErrorCode;
  timestamp: string;
}
export type ApiError = ApiResponse<null>;
