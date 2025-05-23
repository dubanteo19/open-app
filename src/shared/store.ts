import { authApi } from "@/features/auth/api";
import authReducer from "@/features/auth/slice";
import openerMetaReducer from "@/features/user/metadata/slice";
import settingsReducer from "@/features/common/settings/slice";
import chatReducer from "@/features/message/dto/slice";
import { commentApi } from "@/features/user/comment/api";
import { postApi } from "@/features/user/feed/api";
import { openerMetaApi } from "@/features/user/metadata/api";
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
  openerMeta: openerMetaReducer,
  settings: settingsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [openerApi.reducerPath]: openerApi.reducer,
  [openerMetaApi.reducerPath]: openerMetaApi.reducer,
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
      openerMetaApi.middleware,
      commentApi.middleware,
    ),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
