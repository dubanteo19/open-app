import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import {
  CursorPagedRequest,
  CursorPagedResponse,
  PageRequest,
  PageResponse,
} from "@/types/page";
import { Post, PostCreateRequset, PostUpdateRequset } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getPosts: build.query<CursorPagedResponse<Post>, CursorPagedRequest>({
      query: (page) => ({
        url: `posts`,
        params: { after: page.after ?? undefined },
      }),
      transformResponse: extractData,
      providesTags: (result) =>
        result?.items
          ? result.items.map((p) => ({ type: "Post" as const, id: p.id }))
          : [],
    }),
    getPostById: build.query<Post, number>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_, __, id) => [{ type: "Post", id }],
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
    createPost: build.mutation<void, PostCreateRequset>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
    viewPost: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}`,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<void, PostUpdateRequset>({
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
  useViewPostMutation
} = postApi;
