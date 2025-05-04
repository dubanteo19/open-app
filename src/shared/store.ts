import { authApi } from "@/features/auth/api";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import postReducer from "@/features/user/feed/slice";
import { useDispatch } from "react-redux";
import { postApi } from "@/features/user/feed/api";
import { openerApi } from "@/features/user/profile/api";
import { commentApi } from "@/features/user/comment/api";
import chatReducer from "@/features/message/dto/slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [openerApi.reducerPath]: openerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      postApi.middleware,
      openerApi.middleware,
      commentApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>;
