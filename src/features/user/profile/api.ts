import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuerry";
import { OpenerDetail, OpenerUpdateRequest } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
export const openerApi = createApi({
  reducerPath: "openerApi",
  tagTypes: ["Opener"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
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
  useUpdateProfileMutation,
} = openerApi;
