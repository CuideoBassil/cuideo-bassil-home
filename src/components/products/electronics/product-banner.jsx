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
        <div className="tp-product-banner-area pb-20">
          <div className="container">
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
                    }}
                  >
                    <div className="row align-items-center">
                      <div className="col-xl-6 col-lg-6 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div
                          className="tp-product-banner-content p-relative z-index-1"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span className="tp-product-banner-title">
                            {item.title}
                          </span>

                          <div
                            className="tp-product-banner-subtitle"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />

                          <div className="tp-product-banner-price mb-6">
                            {item.price && (
                              <span
                                className={
                                  item.discounted ? "old-price" : "new-price"
                                }
                              >
                                ${item.price}
                              </span>
                            )}
                            {item.discounted && (
                              <p className="new-price">${item.discounted}</p>
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
                            >
                              Shop now
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-xl-6 col-lg-6 "
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
                                height: "280px",
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
