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
        className="tp-banner-item p-relative z-index-1 fix"
        style={{
          height: "100%",
          backgroundColor: bg,
          cursor: "pointer",
        }}
        onClick={() => {
          router.push(id ? `/product-details/${id}` : "/shop");
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="text-center text-md-start" style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#000000",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>

            <div
              style={{
                fontSize: "15px",
                color: "#000000",
                lineHeight: "1.5",
                marginBottom: "12px",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="tp-product-banner-price mb-3">
              {price && (
                <span
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    textDecoration: discounted ? "line-through" : "none",
                  }}
                >
                  ${price}
                </span>
              )}
              {discounted && (
                <span
                  className="ms-2"
                  style={{
                    color: "#FF4757",
                    fontWeight: 700,
                    fontSize: "22px",
                  }}
                >
                  ${discounted}
                </span>
              )}
            </div>
          </div>
          <div
            className="text-center"
            style={{ flex: "0 0 auto", maxWidth: "240px" }}
          >
            {img && (
              <Image
                width={480}
                height={480}
                src={img}
                alt="banner-img"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "auto",
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
