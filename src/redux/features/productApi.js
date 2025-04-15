import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/api/product/all`,
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `/api/product/${type}?${query}`,
      providesTags: ["ProductType"],
    }),
    getProductWithType: builder.query({
      query: ({ type, skip = -1, take = -1 }) =>
        `/api/product/with/${type}?skip=${skip}&take=${take}`,
      providesTags: ["ProductWithType"],
    }),
    getOfferProducts: builder.query({
      query: (type) => `/api/product/offer?type=${type}`,
      providesTags: ["OfferProducts"],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `/api/product/popular/${type}`,
      providesTags: ["PopularProducts"],
    }),
    getTopRatedProducts: builder.query({
      query: () => `/api/product/top-rated`,
      providesTags: ["TopRatedProducts"],
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    getFilteredPaginatedProducts: builder.query({
      query: ({
        skip = 0,
        take = 12,
        color,
        category,
        brand,
        subCategory,
        sortBy,
      }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("take", take);
        if (color) params.append("color", color);
        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (subCategory) params.append("subCategory", subCategory);
        if (sortBy && sortBy !== "default") params.append("sortBy", sortBy);

        return `/api/product/filtered/paginated?${params.toString()}`;
      },
      providesTags: ["FilteredPaginatedProducts"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useGetProductWithTypeQuery,
  useGetProductsWithFilterQuery,
  useGetFilteredPaginatedProductsQuery,
} = productApi;
