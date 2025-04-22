"use client";
import { useGetProductQuery } from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "../breadcrumb/product-details-breadcrumb";
import ErrorMsg from "../common/error-msg";
import PrdDetailsLoader from "../loader/prd-details-loader";
import ProductDetailsContent from "./product-details-content";

const ProductDetailsArea = ({ id }) => {
  const { data: product, isLoading, isError } = useGetProductQuery(id);
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <>
        <ProductDetailsBreadcrumb
          pt={product.data.productType.name}
          category={product.data.category.name}
          title={product.data.title}
        />
        <ProductDetailsContent productItem={product.data} />
      </>
    );
  }
  return <>{content}</>;
};

export default ProductDetailsArea;
