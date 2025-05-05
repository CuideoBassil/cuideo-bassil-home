"use client";
import { useRouter } from "next/navigation";
// internal
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";
import { ArrowRightLong } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { HomeTwoCateLoader } from "../loader";

const FashionCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetProductTypeCategoryQuery("fashion");
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/shop?productType=${title.toLowerCase()}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeTwoCateLoader loading={isLoading} />;
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
      <div key={item._id} className="col-xxl-4 col-lg-6">
        <div className="tp-banner-item-2 p-relative z-index-1 grey-bg-2 mb-20 fix">
          <div
            className="tp-banner-thumb-2 include-bg transition-3"
            style={{ backgroundImage: `url(${item?.img})` }}
          ></div>
          <h3 className="tp-banner-title-2">
            <a
              className="cursor-pointer"
              onClick={() => handleCategoryRoute(item.parent)}
            >
              {item.parent}
            </a>
          </h3>
          <div className="tp-banner-btn-2">
            <a
              onClick={() => handleCategoryRoute(item.parent)}
              className="cursor-pointer tp-btn tp-btn-border tp-btn-border-sm"
            >
              Shop Now <ArrowRightLong />
            </a>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <section className="tp-banner-area mt-20">
        <div className="container-fluid tp-gx-40">
          <div className="row tp-gx-20">{content}</div>
        </div>
      </section>
    </>
  );
};

export default FashionCategory;
