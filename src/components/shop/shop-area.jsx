"use client";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";
import ShopFilterOffCanvas from "../common/shop-filter-offcanvas";
import ShopLoader from "../loader/shop/shop-loader";
import ShopContent from "./shop-content";

const ShopArea = ({ shop_right = false, hidden_sidebar = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const subCategories = searchParams.getAll("subCategory");
  const filterColors = searchParams.getAll("color");
  const status = searchParams.get("status");
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  // handleChanges for price range
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter for sorting
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props to pass down
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
      setPriceValue,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    // products
    let _products = products.data.filter(
      (prd) => prd.status !== "out-of-stock"
    );
    let product_items = _products;

    // select short filtering (sorting)
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = _products;
      } else if (selectValue === "Low to High") {
        product_items = _products
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = _products
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = _products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = _products.filter((p) => p.discount > 0);
      } else {
        product_items = _products;
      }
    }

    // status filter
    if (status) {
      if (status === "on-sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (status === "in-stock") {
        product_items = product_items.filter((p) => p.status === "in-stock");
      }
    }

    // category filter (cumulative)
    if (categories && categories.length > 0) {
      product_items = product_items.filter((p) =>
        categories.some(
          (cat) =>
            p.productType.name
              .toLowerCase()
              .replace("&", "")
              .split(" ")
              .join("-") === cat
        )
      );
    }

    // subCategory filter (cumulative)
    if (subCategories && subCategories.length > 0) {
      product_items = product_items.filter((p) =>
        subCategories.some(
          (subCat) =>
            p.category.name
              .toLowerCase()
              .replace("&", "")
              .split(" ")
              .join("-") === subCat
        )
      );
    }

    // color filter (cumulative)
    if (filterColors && filterColors.length > 0) {
      product_items = product_items.filter((product) =>
        filterColors.some(
          (color) => product?.color?.name?.toLowerCase() === color
        )
      );
    }

    // brand filter (cumulative)
    if (brands && brands.length > 0) {
      product_items = product_items.filter((p) =>
        brands.some(
          (br) =>
            p.brand.name.toLowerCase().split(" ").join("-").replace("&", "") ===
            br
        )
      );
    }

    // price range filter
    if (minPrice && maxPrice) {
      product_items = product_items.filter(
        (p) =>
          Number(p.price) >= Number(minPrice) &&
          Number(p.price) <= Number(maxPrice)
      );
    }

    content = (
      <>
        <ShopContent
          all_products={products.data}
          products={product_items}
          otherProps={otherProps}
          shop_right={shop_right}
          hidden_sidebar={hidden_sidebar}
        />

        <ShopFilterOffCanvas
          all_products={products.data}
          otherProps={otherProps}
        />
      </>
    );
  }

  return <>{content}</>;
};

export default ShopArea;
