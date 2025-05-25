import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GoogleLoginRequest,
  LoginRequest,
  RegisterRequest,
} from "./dto/request";
import { LoginResponse, UserResponse } from "./dto/response";
import { setUser } from "./slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    register: build.mutation<UserResponse, RegisterRequest>({
      query: (body) => ({
        method: "POST",
        url: "/auth/register",
        body,
      }),
    }),
    googleLogin: build.mutation<LoginResponse, GoogleLoginRequest>({
      query: ({ idToken }) => ({
        method: "POST",
        url: "/auth/google",
        body: { token: idToken },
      }),
      transformResponse: extractData,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          dispatch(setUser(data.user));
        } catch (error) {
          console.log("login failed", error);
        }
      },
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        method: "POST",
        url: "/auth/login",
        body,
      }),
      transformResponse: extractData,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          dispatch(setUser(data.user));
        } catch (error) {
          console.log("login failed", error);
        }
      },
    }),
    authMe: build.query<UserResponse, void>({
      query: () => "/auth/me",
      transformResponse: extractData,
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useAuthMeQuery,
  useGoogleLoginMutation,
} = authApi;
