import { apiSlice } from "../api/apiSlice";

export const districtApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllDeliveryDistricts: builder.query({
      query: () => `/api/deliveryDistrict/all`,
      providesTags: ["AllDeliveryDistricts"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetAllDeliveryDistrictsQuery } = districtApi;
