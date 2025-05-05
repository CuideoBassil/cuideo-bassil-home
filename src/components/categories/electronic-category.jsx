"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// internal
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "../common/error-msg";
import HomeCateLoader from "../loader/home/home-cate-loader";

const ElectronicCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetProductTypeCategoryQuery("electronics");
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/shop?productType=${title.toLowerCase()}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <div className="col" key={item._id}>
        <div
          className="tp-product-category-item text-center mb-40 "
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="tp-product-category-thumb fix"
            style={{ borderRadius: "50%", width: "180px", height: "180px" }}
          >
            <a
              className="cursor-pointer"
              onClick={() => handleCategoryRoute(item.parent)}
            >
              {item?.img && (
                <Image
                  src={item?.img}
                  alt="product-category"
                  width={180}
                  height={180}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </a>
          </div>
          <div className="tp-product-category-content">
            <h3 className="tp-product-category-title">
              <a
                className="cursor-pointer"
                onClick={() => handleCategoryRoute(item.parent)}
              >
                {item.parent}
              </a>
            </h3>
            <p>{item.products.length} Product</p>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;
