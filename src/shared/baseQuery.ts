import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASE_URL = "http://dbt19.ddns.net:8080/api/v1";
export const LOCAL_IP = "localhost:8080";
export const LOCAL_URL = `http://${LOCAL_IP}/api/v1`;
export const TEST_URL = "http://192.168.102.242:8080/api/v1";
export const baseQuery = fetchBaseQuery({
  baseUrl: LOCAL_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
