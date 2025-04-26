"use client";
// internal
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ErrorMsg from "../common/error-msg";
import { HomeTwoPrdLoader } from "../loader";

const BannerArea = () => {
  const router = useRouter();

  // banner item
  function BannerItem({ id, bg, title, description, img, discounted, price }) {
    return (
      <div
        className="tp-banner-item h-full flex flex-col justify-between p-relative mb-25 z-index-1 fix"
        style={{
          height: "100%",
          alignItems: "center",
          backgroundColor: bg,
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          router.push(id ? `/product-details/${id}` : "/shop");
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="text-center text-md-start">
            <h3
              className="tp-slider-title"
              style={{ fontSize: "28px", color: "black" }}
            >
              {title}
            </h3>
            <p style={{ fontSize: "22px", color: "black" }}>{description}</p>
            <div className="tp-product-banner-price mb-3">
              {price && (
                <span
                  className="old-price"
                  style={{
                    color: "black",
                    fontSize: "22px",
                    textDecoration: discounted ? "line-through" : "none",
                  }}
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
                width={480}
                height={480}
                src={img}
                alt="slider-img"
                className="img-fluid"
                style={{
                  width: "300px",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
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
      <section className="tp-banner-area pb-50">
        <div className="container">
          <div className="row">
            {featured.data.map((item, i) => (
              <div
                key={i}
                style={{ padding: "10px" }}
                className="col-lg-6 col-md-12  "
              >
                <BannerItem
                  bg={item.background}
                  title={item.title}
                  price={item.price}
                  discounted={item.discounted}
                  description={item.description}
                  img={item?.img}
                  id={item.id}
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
