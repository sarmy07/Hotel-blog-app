import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "./features/blogs/blogsApi";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { commentApi } from "./features/comments/commentApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogsApi.middleware,
      authApi.middleware,
      commentApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
