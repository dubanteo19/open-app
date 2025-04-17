import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuerry";
import { PageRequest, PageResponse } from "@/types/page";
import { Post, PostCreateRequset } from "@/types/post";
import { createApi } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getPosts: build.query<PageResponse<Post>, PageRequest>({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
      transformResponse: extractData,
    }),
    createPost: build.mutation<string, PostCreateRequset>({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body: body,
      }),
    }),
  }),
});
export const { useGetPostsQuery } = postApi;
