import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { CursorPagedRequest, CursorPagedResponse } from "@/types/page";
import { Post, PostCreateRequest, PostUpdateRequest } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
const POST_TAG = "Post" as const;
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
          ? [
              ...result.items.map((p) => ({ type: POST_TAG, id: p.id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostById: build.query<Post, number>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_, __, id) => [{ type: "Post", id }],
      transformResponse: extractData,
    }),
    createPost: build.mutation<void, PostCreateRequest>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    viewPost: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId }],
    }),
    updatePost: build.mutation<void, PostUpdateRequest>({
      query: (body) => ({
        method: "put",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: (_, __, body) => [
        { type: POST_TAG, id: body.postId },
        { type: POST_TAG, id: "LIST" },
      ],
    }),
    deletePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "delete",
        url: `/posts/${postId}`,
      }),
      invalidatesTags: (_, __, postId) => [
        { type: POST_TAG, id: postId },
        { type: POST_TAG, id: "LIST" },
      ],
    }),
    likePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}/meta/like`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId }],
    }),
    unlikePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "DELETE",
        url: `/posts/${postId}/meta/unlike`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId }],
    }),
    bookmark: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}/meta/bookmark`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId }],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useViewPostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkMutation,
} = postApi;
