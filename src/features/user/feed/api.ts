import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { Post, PostCreateRequset, PostUpdateRequset } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
import { PageRequest, PageResponse } from "@/types/page";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getPosts: build.query<PageResponse<Post>, PageRequest>({
      query: (page) => ({
        url: `posts`,
        params: page,
      }),
      transformResponse: extractData,
      providesTags: ["Post"],
    }),
    getPostById: build.query<Post, number>({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Post"],
      transformResponse: extractData,
    }),
    getOpenerPosts: build.query<
      PageResponse<Post>,
      { page: PageRequest; username?: string }
    >({
      query: ({ page, username }) => ({
        url: `/openers/${username}/posts`,
        params: page,
      }),
      providesTags: ["Post"],
      transformResponse: extractData,
    }),
    createPost: build.mutation<string, PostCreateRequset>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<string, PostUpdateRequset>({
      query: (body) => ({
        method: "put",
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
  useGetOpenerPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} = postApi;
