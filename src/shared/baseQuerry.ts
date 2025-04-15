import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:8080/api/v1/";
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
