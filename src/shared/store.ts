import { authApi } from "@/features/auth/api";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import { useDispatch } from "react-redux";
import { postApi } from "@/features/user/feed/api";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>;
