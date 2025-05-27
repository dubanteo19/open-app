import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { PageRequest, PageResponse } from "@/types/page";
import { SuggestedOpener, User } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
export const discoveryApi = createApi({
  reducerPath: "discoveryApi",
  tagTypes: ["Discovery"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    followOpener: build.mutation<void, number>({
      query: (openerId) => ({
        url: `openers/${openerId}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["Discovery"],
    }),
    unfollowOpener: build.mutation<void, number>({
      query: (openerId) => ({
        url: `openers/${openerId}/unfollow`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discovery"],
    }),
    getOpenerFollowers: build.query<
      PageResponse<SuggestedOpener>,
      PageRequest & { username: string }
    >({
      query: (body) => ({
        url: `openers/${body.username}/followers`,
        method: "GET",
        params: { ...body },
      }),
      transformResponse: extractData,
      providesTags: ["Discovery"],
    }),
    getOpenerFollowing: build.query<
      PageResponse<SuggestedOpener>,
      PageRequest & { username: string }
    >({
      query: (body) => ({
        url: `openers/${body.username}/following`,
        method: "GET",
        params: { ...body },
      }),
      transformResponse: extractData,
      providesTags: ["Discovery"],
    }),
    getOpeners: build.query<PageResponse<SuggestedOpener>, PageRequest>({
      query: (params) => ({
        url: "discovery",
        params,
        method: "GET",
      }),
      transformResponse: extractData,
      providesTags: ["Discovery"],
    }),
  }),
});
export const {
  useGetOpenersQuery,
  useFollowOpenerMutation,
  useUnfollowOpenerMutation,
  useGetOpenerFollowingQuery,
  useGetOpenerFollowersQuery
} = discoveryApi;
