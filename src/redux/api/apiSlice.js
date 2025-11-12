import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const userInfo = Cookies.get("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === "development") {
          console.error("Error parsing user info:", error);
        }
      }
      return headers;
    },
  }),
  // Reduce memory by keeping cached data for shorter time
  keepUnusedDataFor: 30, // 30 seconds instead of default 60
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30s
  refetchOnReconnect: true,
  refetchOnFocus: false, // Don't refetch on window focus to reduce requests
  endpoints: (builder) => ({}),
  tagTypes: [
    "Products",
    "Coupon",
    "Product",
    "RelatedProducts",
    "UserOrder",
    "UserOrders",
    "ProductType",
    "ProductWithType",
    "PopularProducts",
    "TopRatedProducts",
    "FeaturedBySection",
    "PageByKey",
    "AllProductTypes",
    "FilteredPaginatedProducts",
    "AllCategory",
    "Orders",
    "AllDeliveryDistricts",
  ],
});
