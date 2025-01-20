"use client";
// internal
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";
import Image from "next/image";
import ErrorMsg from "../common/error-msg";
import { HomeTwoPrdLoader } from "../loader";

// banner item
function BannerItem({ bg, title, description, img }) {
  return (
    <div
      className={`tp-banner-item  tp-banner-height p-relative mb-30 z-index-1 fix`}
    >
      <div
        className="tp-banner-thumb include-bg transition-3"
        style={{
          backgroundColor: `${bg}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "5%",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="tp-slider-content p-relative z-index-1">
                <h3
                  style={{
                    fontSize: "24px",
                    color: "black",
                  }}
                  className="tp-slider-title"
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="tp-slider-thumb text-end">
                <Image
                  width={220}
                  height={220}
                  src={img}
                  alt="slider-img"
                  className="object-contain w-fit"
                />
              </div>
            </div>
          </div>
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
  if (isLoading) {
    content = <HomeTwoPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && featured?.data?.length === 0) {
    content = <ErrorMsg msg="No Featured found!" />;
  }
  if (!isLoading && !isError && featured?.data?.length > 0) {
    const featured_items = featured.data;

    return (
      <section className="tp-banner-area pb-70">
        <div className="container">
          <div className="row">
            {featured_items.map((item, i) => (
              <div key={i} className="col-lg-6">
                <BannerItem
                  bg={item.background}
                  title={item.title}
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
