import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const PROD_URL = "api.dbt19.store";
export const LOCAL_IP = "localhost:8080";
export const TEST_IP = "172.16.17.173:8080";
export const IP = TEST_IP;
export const URL = `http://${IP}/api/v1`;
export const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
