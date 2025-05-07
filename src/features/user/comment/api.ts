import { baseQuery } from "@/shared/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CommentCreateRequest,
  CommentResponse,
  CommentUpdateRequest,
} from "./dto/comment";
import { PageRequest, PageResponse } from "@/types/page";
import { extractData } from "@/lib/utils";
export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getCommentsByPostId: build.query<
      PageResponse<CommentResponse>,
      { page: PageRequest; postId: number }
    >({
      query: (body) => ({
        method: "get",
        url: `/posts/${body.postId}/comments`,
        params: body.page,
      }),
      transformResponse: extractData,
    }),
    createComment: build.mutation<CommentResponse, CommentCreateRequest>({
      query: (body) => ({
        method: "post",
        url: `/posts/${body.postId}/comments`,
        body: body,
      }),
      transformResponse: extractData,
    }),
    updateComment: build.mutation<string, CommentUpdateRequest>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
export const { useCreateCommentMutation, useGetCommentsByPostIdQuery } =
  commentApi;
