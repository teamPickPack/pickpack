import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import session from "redux-persist/lib/storage/session";
import userSlice from "./userSlice";
import compareSlice from "./compareSlice";

// reducer 추가하는 부분
const reducers = combineReducers({ user: userSlice.reducer, compare: compareSlice.reducer });

// storage에 올려서 사용할 것 추가하는 부분
const persistConfig = {
  key: "root",
  storage: session,
  whiteList: ["user", "compare"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
