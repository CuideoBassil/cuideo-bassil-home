"use client";
import Image from "next/image";
import Link from "next/link";
import { EffectFade, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { HomeTwoPrdLoader } from "@/components/loader";
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";
import banner_img_1 from "@assets/img/banner/banner-slider-1.png";
import banner_img_2 from "@assets/img/banner/banner-slider-2.png";
import banner_img_3 from "@assets/img/banner/banner-slider-3.png";

// banner products
const bannerProducts = [
  {
    id: 1,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: banner_img_1,
  },
  {
    id: 2,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: banner_img_2,
  },
  {
    id: 3,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: banner_img_3,
  },
];

// slider setting
const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: "fade",
  pagination: {
    el: ".tp-product-banner-slider-dot",
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
        <div className="tp-product-banner-area pb-90">
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
                  pauseOnMouseEnter: true,
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
                      <div className="col-xl-6 col-lg-6">
                        <div
                          className="tp-product-banner-content p-relative z-index-1"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span className="tp-product-banner-title">
                            {item.title}
                          </span>
                          <h3 className="tp-product-banner-subtitle">
                            {item.description}
                          </h3>
                          <div className="tp-product-banner-price mb-40">
                            {item.price && (
                              <span className="old-price">${item.price}</span>
                            )}
                            {item.discounted && (
                              <p className="new-price">${item.discounted}</p>
                            )}
                          </div>
                          <div className="tp-product-banner-btn">
                            <Link href="/shop" className="tp-btn tp-btn-2">
                              Shop now
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="tp-product-banner-thumb-wrapper p-relative">
                          <div className="tp-product-banner-thumb text-end p-relative z-index-1">
                            <Image
                              width={400}
                              height={400}
                              src={item.img}
                              alt="banner-slider img"
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
