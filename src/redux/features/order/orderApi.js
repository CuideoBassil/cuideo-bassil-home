import { apiSlice } from "@/redux/api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    saveOrder: builder.mutation({
      query: (data) => ({
        url: "/api/order/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserOrders"],
    }),
  }),
});

export const { useSaveOrderMutation } = orderApi;
