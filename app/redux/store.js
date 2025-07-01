import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

import { authApi } from "../services/authApi";
import { branchApi } from "../services/branchApi";
import { reviewApi } from "../services/reviewApi";
import { orderApi } from "../services/orderApi";
import { menuApi } from "../services/menuApi";
import { adminUserApi } from "../services/adminUserApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      orderApi.middleware,
      reviewApi.middleware,
      branchApi.middleware,
      menuApi.middleware,
      adminUserApi.middleware
    ),
});
