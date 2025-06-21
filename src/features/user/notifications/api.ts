import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { Notification } from "@/types/notification";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setUnreadNotificationCount } from "../meta/slice";
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  tagTypes: ["Notification"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    markAsRead: build.mutation<void, number>({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "post",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAsReadAll: build.mutation<void,void >({
      query: () => ({
        url: `notifications`,
        method: "post",
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotification: build.query<Notification[], void>({
      query: () => "notifications",
      transformResponse: extractData,
      providesTags: ["Notification"],
    }),
    getUnreadNotification: build.query<Notification[], void>({
      query: () => "notifications/unread",
      transformResponse: extractData,
      providesTags: ["Notification"],
    }),
    getUnreadNotificationCount: build.query<number, void>({
      query: () => "notifications/unread-count",
      transformResponse: extractData,
      providesTags: ["Notification"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUnreadNotificationCount(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useGetNotificationQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAsReadMutation,
  useGetUnreadNotificationQuery,
  useMarkAsReadAllMutation
} = notificationApi;
