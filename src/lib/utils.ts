import { ApiResponse } from "@/shared/ApiResponse";
import { POST_LIST_TAG, POST_TAG } from "@/shared/constant";
import { CursorPagedResponse } from "@/types/page";
import { Post } from "@/types/post";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
dayjs.extend(relativeTime);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function uuid() {
  return uuidv4();
}
export const extractData = <T>(response: ApiResponse<T>): T => response.data;
export const providePostTags = (result?: CursorPagedResponse<Post>) =>
  result?.items
    ? [
        ...result.items.map((p) => ({ type: POST_TAG, id: p.id })),
        POST_LIST_TAG,
      ]
    : [POST_LIST_TAG];
export const formatTime = (dateTime: string) => {
  const time = dayjs(dateTime);
  const formatedDateTime =
    dayjs().diff(time, "day") < 1 ? time.fromNow() : time.format("DD/MM/YYYY");
  return formatedDateTime;
};
