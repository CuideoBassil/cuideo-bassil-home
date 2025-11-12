"use client";
import { useGetFilteredPaginatedProductsQuery } from "@/redux/features/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ErrorMsg from "../common/error-msg";
import ShopFilterOffCanvas from "../common/shop-filter-offcanvas";
import ShopLoader from "../loader/shop/shop-loader";
import ShopContent from "./shop-content";

const ShopArea = ({ shop_right = false, hidden_sidebar = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchFilter = searchParams.getAll("search");
  const brands = searchParams.getAll("brand");
  const subCategories = searchParams.getAll("subCategory");
  const productTypes = searchParams.getAll("productType");
  const filterColors = searchParams.getAll("color");
  const sortBy = searchParams.get("sortBy");
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 16;

  // Memoize filter parameters to prevent unnecessary API calls
  const filterParams = useMemo(() => {
    const filters = {
      skip: (currPage - 1) * itemsPerPage,
      take: itemsPerPage,
    };

    if (searchFilter.length > 0) {
      filters.search = searchFilter;
    } else if (subCategories.length > 0) {
      filters.category = subCategories;
    } else if (productTypes.length > 0) {
      filters.productType = productTypes;
    }
    if (filterColors.length > 0) filters.color = filterColors;
    if (brands.length > 0) filters.brand = brands;
    if (sortBy) filters.sortBy = sortBy;

    return filters;
  }, [
    currPage,
    searchFilter,
    subCategories,
    productTypes,
    filterColors,
    brands,
    sortBy,
    itemsPerPage,
  ]);

  const {
    data: productsData,
    isError,
    isLoading,
    refetch,
  } = useGetFilteredPaginatedProductsQuery(filterParams);

  // Update URL when filters change
  const updateUrl = (newParams) => {
    setCurrPage(1); // Reset to first page when filters change
    if (newParams.toString() == "sortBy=default") {
      router.push(`/shop`);
    } else {
      router.push(`/shop?${newParams.toString()}`);
    }
  };
  const updateFilterParams = (params, key, values) => {
    // First delete all existing values for this filter
    params.delete(key);

    // Then add the new values
    values.forEach((value) => {
      if (value) {
        // only add if value is not empty
        params.append(key, value);
      }
    });

    return params;
  };

  // Handle sorting changes
  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.value);
    updateUrl(newParams);
  };

  // Handle color filter changes
  const handleColorChange = (colors) => {
    const newParams = new URLSearchParams(searchParams);
    updateFilterParams(newParams, "color", colors);
    updateUrl(newParams);
  };

  // Handle brand filter changes
  const handleBrandChange = (brands) => {
    const newParams = new URLSearchParams(searchParams);
    updateFilterParams(newParams, "brand", brands);
    updateUrl(newParams);
  };

  // Handle subcategory filter changes
  const handleSubCategoryChange = (subCategories) => {
    const newParams = new URLSearchParams(searchParams);

    if (searchFilter.length > 0) {
      newParams.delete("search");
    }
    updateFilterParams(newParams, "subCategory", subCategories);
    updateUrl(newParams);
  };
  // Reset all filters
  const handleResetFilters = () => {
    router.push("/shop");
  };

  // Update page from URL
  useEffect(() => {
    setCurrPage(1);
  }, [searchParams]);

  const otherProps = {
    selectHandleFilter: handleSortChange,
    currPage,
    setCurrPage,
    handleColorChange,
    handleBrandChange,
    handleSubCategoryChange,
    handleResetFilters,
    activeFilters: {
      brands,
      colors: filterColors,
      subCategories,
      sortBy,
    },
  };

  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error fetching products" />
      </div>
    );
  }
  // if (!isLoading && !isError && productsData?.products?.length === 0) {
  //   content = <ErrorMsg msg="No Products found with the current filters!" />;
  // }
  if (!isLoading && !isError) {
    content = (
      <>
        <ShopContent
          all_products={productsData.products}
          products={productsData.products}
          otherProps={otherProps}
          shop_right={shop_right}
          hidden_sidebar={hidden_sidebar}
          totalProducts={productsData?.totalCount}
          itemsPerPage={itemsPerPage}
        />
        <ShopFilterOffCanvas
          all_products={productsData.products}
          otherProps={otherProps}
        />
      </>
    );
  }

  return <>{content}</>;
};

export default ShopArea;
