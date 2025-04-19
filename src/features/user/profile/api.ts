import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuerry";
import { PageRequest, PageResponse } from "@/types/page";
import { Post } from "@/types/post";
import { OpenerDetail, OpenerUpdateRequest } from "@/types/user";
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
      query: ({ page, username }) =>
        `/openers/${username}/posts?page=${page.page}&size=${page.size}`,
      transformResponse: extractData,
    }),
    getProfile: build.query<OpenerDetail, string>({
      query: (username) => `/openers/${username}`,
      transformResponse: extractData,
      providesTags: ["Opener"],
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
  useGetOpenerPostsQuery,
  useUpdateProfileMutation,
} = openerApi;
