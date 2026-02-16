"use client";
// external
import Image from "next/image";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";

import { SliderNextBtn, SliderPrevBtn } from "@/svg";
import shape_1 from "@assets/img/slider/shape/slider-shape-1.png";
import shape_2 from "@assets/img/slider/shape/slider-shape-2.png";
import shape_3 from "@assets/img/slider/shape/slider-shape-3.png";
import shape_4 from "@assets/img/slider/shape/slider-shape-4.png";
import { useRouter } from "next/navigation";
import { HomeTwoPrdLoader } from "../loader";
// slider data

function Shape({ img, num }) {
  return (
    <Image
      className={`tp-slider-shape-${num}`}
      src={img}
      alt="slider-shape"
      priority
    />
  );
}

const HomeHeroSlider = () => {
  const router = useRouter();

  const {
    data: featured,
    isError,
    isLoading,
  } = useGetFeaturedBySectionQuery(1);
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
        <section className="tp-slider-area p-relative z-index-1">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            effect="fade"
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".tp-slider-button-next",
              prevEl: ".tp-slider-button-prev",
            }}
            pagination={{ el: ".tp-slider-dot", clickable: true }}
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            className="tp-slider-active tp-slider-variation swiper-container"
          >
            {featured_items.map((item, i) => (
              <SwiperSlide
                key={i}
                className="tp-slider-item tp-slider-height d-flex align-items-center"
                style={{
                  backgroundColor: item.background || "lightcoral",
                }}
              >
                <div className="tp-slider-shape">
                  <Shape img={shape_1} num="1" />
                  <Shape img={shape_2} num="2" />
                  <Shape img={shape_3} num="3" />
                  <Shape img={shape_4} num="4" />
                </div>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-6 col-md-6">
                      <div className="tp-slider-content p-relative z-index-1">
                        <h2
                          style={{
                            cursor: "pointer",
                            fontSize: "3.5rem",
                            marginBottom: "16px",
                          }}
                          onClick={() => {
                            router.push(
                              item.productId
                                ? `/product-details/${item.productId}`
                                : "/shop"
                            );
                          }}
                          className="tp-slider-title"
                        >
                          {item.title}
                        </h2>

                        <div
                          style={{
                            fontSize: "1.25rem",
                            marginBottom: "20px",
                            lineHeight: "1.5",
                            color: "rgba(255,255,255,0.85)",
                          }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <div className="tp-product-banner-price">
                          {item.price && (
                            <p
                              style={{ fontSize: "1.25rem" }}
                              className="old-price"
                            >
                              ${item.price}
                            </p>
                          )}
                          {item.discounted && (
                            <p
                              style={{ fontSize: "3rem", fontWeight: 800 }}
                              className="new-price"
                            >
                              ${item.discounted}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            router.push(
                              item.productId
                                ? `/product-details/${item.productId}`
                                : "/shop"
                            );
                          }}
                          style={{
                            marginTop: "20px",
                            padding: "14px 36px",
                            background: "#fff",
                            color: "#1A1D21",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "15px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                          }}
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-6">
                      <div className="tp-slider-thumb text-end">
                        <Image
                          style={{
                            cursor: "pointer",
                            objectFit: "contain",
                            width: "100%",
                            height: "auto",
                            maxHeight: "450px",
                          }}
                          onClick={() => {
                            router.push(
                              item.productId
                                ? `/product-details/${item.productId}`
                                : "/shop"
                            );
                          }}
                          width={880}
                          height={800}
                          src={item?.img}
                          alt="slider-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="tp-slider-arrow tp-swiper-arrow">
              <button type="button" className="tp-slider-button-prev">
                <SliderPrevBtn />
              </button>
              <button type="button" className="tp-slider-button-next">
                <SliderNextBtn />
              </button>
            </div>
            <div className="tp-slider-dot tp-swiper-dot"></div>
          </Swiper>
        </section>
      </>
    );
  }
};

export default HomeHeroSlider;
