import { extractData, providePostTags } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { POST_LIST_TAG, POST_TAG } from "@/shared/constant";
import { CursorPagedRequest, CursorPagedResponse } from "@/types/page";
import { Post, PostCreateRequest, PostUpdateRequest } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
import { PostLike } from "./dto/response/PostLike";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post", "PostLike", "PostBookmark"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getBookmarkedPosts: build.query<
      CursorPagedResponse<Post>,
      CursorPagedRequest
    >({
      query: (request) => ({
        url: `openers/bookmarked-posts`,
        params: { after: request.after ?? undefined },
      }),
      transformResponse: extractData,
      providesTags: ["PostBookmark"],
    }),
    getPostsByAuthor: build.query<
      CursorPagedResponse<Post>,
      CursorPagedRequest<{ username: string }>
    >({
      query: (request) => ({
        url: `openers/${request.args.username}/posts`,
        params: { after: request.after ?? undefined },
      }),
      transformResponse: extractData,
      providesTags: providePostTags,
    }),
    getPosts: build.query<CursorPagedResponse<Post>, CursorPagedRequest>({
      query: (request) => ({
        url: `posts`,
        params: { after: request.after ?? undefined },
      }),
      transformResponse: extractData,
      providesTags: providePostTags,
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
      invalidatesTags: [POST_LIST_TAG],
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
        POST_LIST_TAG,
      ],
    }),
    deletePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "delete",
        url: `/posts/${postId}`,
      }),
      invalidatesTags: (_, __, postId) => [
        { type: POST_TAG, id: postId },
        POST_LIST_TAG,
      ],
    }),
    getPostLikes: build.query<PostLike[], number>({
      query: (postId) => `/posts/${postId}/meta/post-likes`,
      transformResponse: extractData,
      providesTags: ["PostLike"],
    }),
    likePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}/meta/like`,
      }),
      invalidatesTags: (_, __, postId) => [
        { type: POST_TAG, id: postId },
        "PostLike",
      ],
    }),
    unlikePost: build.mutation<void, number>({
      query: (postId) => ({
        method: "DELETE",
        url: `/posts/${postId}/meta/unlike`,
      }),
      invalidatesTags: (_, __, postId) => [
        { type: POST_TAG, id: postId },
        "PostLike",
      ],
    }),
    bookmark: build.mutation<void, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}/meta/bookmark`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId },"PostBookmark"],
    }),
    unbookmark: build.mutation<void, number>({
      query: (postId) => ({
        method: "DELETE",
        url: `/posts/${postId}/meta/unbookmark`,
      }),
      invalidatesTags: (_, __, postId) => [{ type: POST_TAG, id: postId },"PostBookmark"],
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
  useUnbookmarkMutation,
  useGetPostsByAuthorQuery,
  useGetBookmarkedPostsQuery,
  useGetPostLikesQuery,
} = postApi;
