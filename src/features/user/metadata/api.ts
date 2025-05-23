import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { postApi } from "../feed/api";
export const openerMetaApi = createApi({
  reducerPath: "openerMetaApi",
  tagTypes: ["Metadata", "Post"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getLikedPostIds: build.query<number[], void>({
      query: () => `openers/liked-postIds`,
      transformResponse: extractData,
      providesTags: ["Metadata"],
    }),
    likePost: build.mutation<number, number>({
      query: (postId) => ({
        method: "POST",
        url: `/posts/${postId}/meta/like`,
      }),
      transformResponse: extractData,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(postApi.util.invalidateTags([{ type: "Post", id }]));
        } catch (error) {
          console.log("login failed", error);
        }
      },
      invalidatesTags: ["Metadata"],
    }),
    unlike: build.mutation<number, number>({
      query: (postId) => ({
        method: "DELETE",
        url: `/posts/${postId}/meta/unlike`,
      }),
      invalidatesTags: ["Metadata"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(postApi.util.invalidateTags([{ type: "Post", id }]));
        } catch (error) {
          console.log("login failed", error);
        }
      },
      transformResponse: extractData,
    }),
  }),
});
export const {
  useGetLikedPostIdsQuery,
  useUnlikeMutation,
  useLikePostMutation,
} = openerMetaApi;
