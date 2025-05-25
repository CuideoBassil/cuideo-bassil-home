import { apiSlice } from "../api/apiSlice";

export const pageApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPageByKey: builder.query({
      query: (key) => `/api/page/get/${key}`,
    }),
  }),
});

export const { useGetPageByKeyQuery } = pageApi;
