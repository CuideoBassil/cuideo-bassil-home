import { apiSlice } from "../api/apiSlice";

export const featuredApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFeaturedBySection: builder.query({
      query: (section) => `/api/featured/${section}`,
      providesTags: ["FeaturedBySection"],
    }),
  }),
});

export const { useGetFeaturedBySectionQuery } = featuredApi;
