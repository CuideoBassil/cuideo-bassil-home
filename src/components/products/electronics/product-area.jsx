"use client";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import { useGetProductWithTypeQuery } from "@/redux/features/productApi";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ProductItem from "./product-item";

const ProductArea = () => {
  const router = useRouter();
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useGetProductWithTypeQuery({
    type: ["All"],
    skip: 0,
    take: 24,
  });

  // Memoize shuffle function to prevent re-shuffling on every render
  const shuffledProducts = useMemo(() => {
    if (!products?.data?.length) return [];

    const availableProducts = products.data.filter(
      (prd) => prd.status !== "out-of-stock"
    );

    const shuffled = [...availableProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 20);
  }, [products?.data]);

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
  if (!isLoading && !isError && shuffledProducts.length > 0) {
    content = shuffledProducts.map((prd, i) => (
      <div key={prd.id || i} className="col-6 col-lg-4 col-xl-3 mt-4">
        <ProductItem product={prd} />
      </div>
    ));
  }
  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end mb-30">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper">
              <h3 className="tp-section-title">Our Products</h3>
            </div>
          </div>
          <div className="col-xl-7 col-sm-6">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="view-all-btn"
                onClick={() => router.push("/shop")}
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
