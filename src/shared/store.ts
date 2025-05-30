import { authApi } from "@/features/auth/api";
import authReducer from "@/features/auth/slice";
import chatReducer from "@/features/message/slice";
import settingsReducer from "@/features/common/settings/slice";
import { discoveryApi } from "@/features/discovery/api";
import { chatApi } from "@/features/message/api";
import { commentApi } from "@/features/user/comment/api";
import { postApi } from "@/features/user/feed/api";
import { openerApi } from "@/features/user/profile/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  PERSIST,
  Persistor,
  persistReducer,
  persistStore,
  REGISTER,
} from "redux-persist";
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
  [discoveryApi.reducerPath]: discoveryApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST],
      },
    }).concat(
      authApi.middleware,
      postApi.middleware,
      openerApi.middleware,
      commentApi.middleware,
      discoveryApi.middleware,
      chatApi.middleware,
    ),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
