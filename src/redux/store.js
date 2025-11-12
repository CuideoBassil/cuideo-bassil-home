import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cartSlice";
import compareSlice from "./features/compareSlice";
import couponSlice from "./features/coupon/couponSlice";
import orderSlice from "./features/order/orderSlice";
import productModalSlice from "./features/productModalSlice";
import shopFilterSlice from "./features/shop-filter-slice";
import wishlistSlice from "./features/wishlist-slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    productModal: productModalSlice,
    shopFilter: shopFilterSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    compare: compareSlice,
    coupon: couponSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optimize for production
      serializableCheck:
        process.env.NODE_ENV === "development"
          ? {
              ignoredActions: ["persist/PERSIST"],
            }
          : false,
      immutableCheck: process.env.NODE_ENV === "development",
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export default store;
