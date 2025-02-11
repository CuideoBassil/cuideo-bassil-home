import { apiSlice } from "../api/apiSlice";

export const productTypeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProductTypes: builder.query({
      query: () => `/api/productType/all`,
      providesTags: ["AllProductTypes"],
    }),
  }),
});

export const { useGetAllProductTypesQuery } = productTypeApi;
