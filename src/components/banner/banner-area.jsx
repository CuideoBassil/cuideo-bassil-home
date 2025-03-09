"use client";
// internal
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";
import Image from "next/image";
import ErrorMsg from "../common/error-msg";
import { HomeTwoPrdLoader } from "../loader";

// banner item
function BannerItem({ bg, title, description, img, discounted, price }) {
  return (
    <div
      className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix"
      style={{
        backgroundColor: `${bg}`,
        padding: "5%",
        borderRadius: "10px",
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="text-center text-md-start">
          <h3
            className="tp-slider-title"
            style={{ fontSize: "22px", color: "black" }}
          >
            {title}
          </h3>
          <p style={{ fontSize: "16px", color: "black" }}>{description}</p>
          <div className="tp-product-banner-price mb-3">
            {price && (
              <span
                className="old-price"
                style={{ color: "black", textDecoration: "line-through" }}
              >
                ${price}
              </span>
            )}
            {discounted && (
              <span
                className="new-price ms-2"
                style={{ color: "red", fontWeight: "bold" }}
              >
                ${discounted}
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          {img && (
            <Image
              width={180}
              height={180}
              src={img}
              alt="slider-img"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const BannerArea = () => {
  const {
    data: featured,
    isError,
    isLoading,
  } = useGetFeaturedBySectionQuery(2);
  let content = null;

  if (isLoading) content = <HomeTwoPrdLoader loading={isLoading} />;
  if (!isLoading && isError) content = <ErrorMsg msg="There was an error" />;
  if (!isLoading && !isError && featured?.data?.length === 0)
    content = <ErrorMsg msg="No Featured found!" />;

  if (!isLoading && !isError && featured?.data?.length > 0) {
    return (
      <section className="tp-banner-area pb-70">
        <div className="container">
          <div className="row">
            {featured.data.map((item, i) => (
              <div key={i} className="col-lg-6 col-md-12 mb-4">
                <BannerItem
                  bg={item.background}
                  title={item.title}
                  price={item.price}
                  discounted={item.discounted}
                  description={item.description}
                  img={item.img}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default BannerArea;
