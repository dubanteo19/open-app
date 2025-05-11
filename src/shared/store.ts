import { authApi } from "@/features/auth/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import { useDispatch } from "react-redux";
import { postApi } from "@/features/user/feed/api";
import { openerApi } from "@/features/user/profile/api";
import { commentApi } from "@/features/user/comment/api";
import chatReducer from "@/features/message/dto/slice";
import settingsReducer from "@/features/common/settings/slice";
import { persistStore, persistReducer, Persistor, REGISTER, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  settings: settingsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [openerApi.reducerPath]: openerApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER,PERSIST],
      },
    }).concat(
      authApi.middleware,
      postApi.middleware,
      openerApi.middleware,
      commentApi.middleware,
    ),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
