import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuerry";
import { PageRequest, PageResponse } from "@/types/page";
import { Post, PostCreateRequset } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getPosts: build.query<PageResponse<Post>, PageRequest>({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
      transformResponse: extractData,
      providesTags: ["Post"],
    }),

    createPost: build.mutation<string, PostCreateRequset>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "delete",
        url: `/posts/${postId}`,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
