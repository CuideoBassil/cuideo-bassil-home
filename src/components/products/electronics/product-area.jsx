"use client";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import { useGetProductWithTypeQuery } from "@/redux/features/productApi";
import { ShapeLine } from "@/svg";
import { useRouter } from "next/navigation";
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
    take: 100,
  });
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

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
    content = shuffleArray(product_items)
      .slice(0, 20)
      .map((prd, i) => (
        <div key={i} className="col-6 col-lg-4 col-xl-3 mt-4">
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
              <h3 className="tp-section-title">
                Products
                <ShapeLine />
              </h3>
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
