import { ApiResponse } from "@/shared/ApiRespnse";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function uuid() {
  return uuidv4();
}
export const extractData = <T>(response: ApiResponse<T>): T => response.data;
