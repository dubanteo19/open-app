import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASE_URL = "http://dbt19.ddns.net:8080/api/v1";
export const PROD_URL = "api.dbt19.store";
export const LOCAL_IP = "localhost:8080";
export const TEST_IP = "192.168.1.59:8080";
export const IP = PROD_URL;
export const URL = `https://${IP}/api/v1`;
export const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
