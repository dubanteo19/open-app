import { ApiError } from "@/shared/ApiResponse";
import { ErrorCode, errorMessage } from "@/shared/errorCode";
import { toast } from "sonner";
export const handleError = (
  error: unknown,
  callback: (message: string, code: ErrorCode) => void,
) => {
  const err = error as { data: ApiError };
  const code = (err.data.errorCode as ErrorCode) || ErrorCode.UNKNOWN_ERROR;
  const message = errorMessage[code];
  callback(message, code);
};
export const toastError = (error: unknown) => {
  const err = error as { data: ApiError };
  const code = (err.data.errorCode as ErrorCode) || ErrorCode.UNKNOWN_ERROR;
  const message = errorMessage[code];
  toast.error(message);
};
