"use client";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { HomeTwoPrdLoader } from "@/components/loader";
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";

// slider setting
const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: "fade",
  pagination: {
    clickable: true,
  },
};

const ProductBanner = () => {
  const {
    data: featured,
    isError,
    isLoading,
  } = useGetFeaturedBySectionQuery(3);
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
      <>
        <div
          className="tp-product-banner-area pb-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="container">
            {/* Section Title */}
            <div className="row mb-4">
              <div className="col-12 text-center">
                <span
                  style={{
                    color: "#667eea",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Exclusive Promotions
                </span>
                <h3
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "#212529",
                    marginBottom: "0.5rem",
                  }}
                >
                  Special Offers
                </h3>
                <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                  Limited time deals you won't want to miss
                </p>
              </div>
            </div>

            <div className="tp-product-banner-slider fix">
              <Swiper
                {...slider_setting}
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                loop={true}
                effect="fade"
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                }}
                className="tp-product-banner-slider-active swiper-container"
              >
                {featured_items.map((item, i) => (
                  <SwiperSlide
                    key={i}
                    className="tp-product-banner-inner theme-bg p-relative z-index-1 fix"
                    style={{
                      backgroundColor: item.background
                        ? `${item.background}`
                        : "lightblue",
                      borderRadius: "15px",
                      overflow: "hidden",
                      padding: "3rem 2rem",
                    }}
                  >
                    <div className="row align-items-center">
                      <div className="col-xl-6 col-lg-6 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div
                          className="tp-product-banner-content p-relative z-index-1"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            className="tp-product-banner-title"
                            style={{
                              fontSize: "clamp(1.8rem, 4vw, 3rem)",
                              fontWeight: "800",
                              lineHeight: "1.2",
                              marginBottom: "1rem",
                            }}
                          >
                            {item.title}
                          </span>

                          <div
                            className="tp-product-banner-subtitle"
                            style={{
                              fontSize: "clamp(1rem, 2vw, 1.3rem)",
                              lineHeight: "1.6",
                              marginBottom: "1.5rem",
                              opacity: "0.9",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />

                          <div className="tp-product-banner-price mb-4">
                            {item.price && (
                              <span
                                className={
                                  item.discounted ? "old-price" : "new-price"
                                }
                                style={{
                                  fontSize: item.discounted
                                    ? "1.5rem"
                                    : "2.5rem",
                                  textDecoration: item.discounted
                                    ? "line-through"
                                    : "none",
                                  opacity: item.discounted ? "0.6" : "1",
                                  marginRight: "1rem",
                                }}
                              >
                                ${item.price}
                              </span>
                            )}
                            {item.discounted && (
                              <p
                                className="new-price"
                                style={{
                                  fontSize: "2.5rem",
                                  fontWeight: "900",
                                  display: "inline",
                                  color: "#ffd700",
                                }}
                              >
                                ${item.discounted}
                              </p>
                            )}
                          </div>

                          <div className="tp-product-banner-btn">
                            <Link
                              href={
                                item.productId
                                  ? `/product-details/${item.productId}`
                                  : "/shop"
                              }
                              className="tp-btn tp-btn-2"
                              style={{
                                padding: "1rem 2.5rem",
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                borderRadius: "50px",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                transition: "all 0.3s ease",
                                display: "inline-block",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-3px)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 20px rgba(0,0,0,0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 15px rgba(0,0,0,0.2)";
                              }}
                            >
                              Shop Now →
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-xl-6 col-lg-6"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="tp-product-banner-thumb-wrapper p-relative">
                          <div className="tp-product-banner-thumb text-end p-relative z-index-1">
                            <Image
                              width={400}
                              height={400}
                              src={item?.img}
                              alt="banner-slider img"
                              style={{
                                width: "100%",
                                height: "350px",
                                objectFit: "contain",
                                filter:
                                  "drop-shadow(0 15px 35px rgba(0,0,0,0.2))",
                                transition: "transform 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="tp-product-banner-slider-dot tp-swiper-dot"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductBanner;
