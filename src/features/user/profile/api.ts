import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { PageRequest, PageResponse } from "@/types/page";
import { Post } from "@/types/post";
import {
  OpenerDetail,
  OpenerUpdateAvatarRequest,
  OpenerUpdateRequest,
} from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
export const openerApi = createApi({
  reducerPath: "openerApi",
  tagTypes: ["Opener"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getOpenerPosts: build.query<
      PageResponse<Post>,
      { page: PageRequest; username?: string }
    >({
      query: ({ page, username }) => ({
        url: `/openers/${username}/posts`,
        params: page,
      }),
      transformResponse: extractData,
    }),
    getProfile: build.query<OpenerDetail, string>({
      query: (username) => `/openers/${username}`,
      transformResponse: extractData,
      providesTags: ["Opener"],
    }),
    getImages: build.query<string[], string>({
      query: (q) => `/images?q=${q}`,
      transformResponse: extractData,
    }),
    updateAvatar: build.mutation<OpenerDetail, OpenerUpdateAvatarRequest>({
      query: (body) => ({
        url: `/openers/${body.openerId}/avatar`,
        method: "PUT",
        body: body.avatarUrl,
      }),
      transformResponse: extractData,
      invalidatesTags: ["Opener"],
    }),
    updateProfile: build.mutation<OpenerDetail, OpenerUpdateRequest>({
      query: (body) => ({
        url: `/openers/${body.openerId}`,
        method: "PUT",
        body: body,
      }),
      transformResponse: extractData,
      invalidatesTags: ["Opener"],
    }),
  }),
});
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useLazyGetImagesQuery,
  useGetOpenerPostsQuery,
} = openerApi;
