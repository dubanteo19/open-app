import { baseQuery } from "@/shared/baseQuerry";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest } from "./dto/request";
import { LoginResponse, UserResponse } from "./dto/response";

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
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        method: "POST",
        url: "/auth/login",
        body,
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = authApi;
