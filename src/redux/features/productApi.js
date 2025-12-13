import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/api/product/all`,
      providesTags: ["Products"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `/api/product/${type}?${query}`,
      providesTags: (result, error, arg) => [
        { type: "ProductType", id: arg.type },
      ],
      keepUnusedDataFor: 300,
    }),
    getProductWithType: builder.query({
      query: ({ type, skip = -1, take = -1 }) =>
        `/api/product/with/${type}?skip=${skip}&take=${take}`,
      providesTags: (result, error, arg) => [
        { type: "ProductWithType", id: `${arg.type}-${arg.skip}-${arg.take}` },
      ],
      keepUnusedDataFor: 300,
    }),
    getOfferProducts: builder.query({
      query: (type) => `/api/product/offer?type=${type}`,
      providesTags: (result, error, arg) => [
        { type: "OfferProducts", id: arg },
      ],
      keepUnusedDataFor: 600, // 10 minutes cache
    }),
    getPopularProductByType: builder.query({
      query: (type) => `/api/product/popular/${type}`,
      providesTags: (result, error, arg) => [
        { type: "PopularProducts", id: arg },
      ],
      keepUnusedDataFor: 300,
    }),
    getTopRatedProducts: builder.query({
      query: () => `/api/product/top-rated`,
      providesTags: ["TopRatedProducts"],
      keepUnusedDataFor: 1800, // 30 minutes cache
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
      keepUnusedDataFor: 300,
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
      keepUnusedDataFor: 300,
    }),
    getFilteredPaginatedProducts: builder.query({
      query: ({
        skip = 0,
        take = 12,
        search,
        color,
        category,
        brand,
        productType,
        sortBy,
      }) => {
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("take", take);
        params.append("status", "in-stock");
        if (productType) params.append("productType", productType);
        if (search) params.append("search", search);
        if (color) params.append("color", color);
        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (sortBy && sortBy !== "default") params.append("sortBy", sortBy);

        return `/api/product/filtered/paginated?${params.toString()}`;
      },
      providesTags: (result, error, arg) => [
        { type: "FilteredPaginatedProducts", id: JSON.stringify(arg) },
      ],
      keepUnusedDataFor: 120, // 2 minutes cache
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
