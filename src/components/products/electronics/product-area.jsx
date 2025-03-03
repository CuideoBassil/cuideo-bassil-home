"use client";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import { useGetProductWithTypeQuery } from "@/redux/features/productApi";
import { ShapeLine } from "@/svg";
import { useEffect } from "react";
import ProductItem from "./product-item";

const ProductArea = () => {
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useGetProductWithTypeQuery({
    type: ["All"],
    skip: -1,
    take: -1,
  });
  useEffect(() => {
    if (products.data) console.log("ProductArea: ", products.data);
  }, [products]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data.filter(
      (prd) => prd.status !== "out-of-stock"
    );
    content = product_items.map((prd, i) => (
      <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-4">
        <ProductItem product={prd} />
      </div>
    ));
  }
  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
