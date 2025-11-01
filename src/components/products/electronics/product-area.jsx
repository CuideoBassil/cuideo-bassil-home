"use client";
import ErrorMsg from "@/components/common/error-msg";
import { ProductGridSkeleton } from "@/components/loader/skeletons";
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
  } = useGetProductWithTypeQuery({
    type: ["All"],
    skip: 0,
    take: 100,
  });

  // Memoize the shuffled products to avoid re-shuffling on every render
  const shuffledProducts = useMemo(() => {
    if (!products?.data) return [];

    const availableProducts = products.data.filter(
      (prd) => prd.status !== "out-of-stock"
    );

    // Fisher-Yates shuffle algorithm
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
    content = <ProductGridSkeleton count={8} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && shuffledProducts.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && shuffledProducts.length > 0) {
    content = shuffledProducts.map((prd, i) => (
      <div key={prd._id || i} className="col-6 col-lg-4 col-xl-3 mt-4">
        <ProductItem product={prd} />
      </div>
    ));
  }

  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper ">
              <h3 className="tp-section-title">Products</h3>
            </div>
          </div>
          <div className="col-xl-7 col-sm-6">
            <div className="tp-product-arrival-more-wrapper d-flex justify-content-end">
              <div className="tp-product-arrival-arrow tp-swiper-arrow  text-end tp-product-arrival-border">
                <button
                  type="button"
                  style={{
                    cursor: "pointer",
                    border: "1px solid grey",
                    borderRadius: "15px",
                    width: "100px",
                  }}
                  onClick={() => {
                    router.push("/shop");
                  }}
                >
                  view all
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
