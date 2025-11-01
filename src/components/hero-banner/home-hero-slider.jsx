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
                        {/* Add a small badge for "NEW" or "HOT DEAL" */}
                        {item.discounted && (
                          <div
                            style={{
                              display: "inline-block",
                              backgroundColor: "#ff6b6b",
                              color: "white",
                              padding: "0.5rem 1.5rem",
                              borderRadius: "50px",
                              fontSize: "0.9rem",
                              fontWeight: "700",
                              marginBottom: "1rem",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                            }}
                          >
                            🔥 Hot Deal
                          </div>
                        )}

                        <h2
                          style={{
                            cursor: "pointer",
                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                            marginBottom: "1rem",
                            fontWeight: "800",
                            lineHeight: "1.1",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
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
                            fontSize: "clamp(1.2rem, 3vw, 2rem)",
                            marginBottom: "24px",
                            lineHeight: "1.4",
                            color: "white",
                            opacity: "0.95",
                          }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />

                        <div
                          className="tp-product-banner-price"
                          style={{ marginBottom: "2rem" }}
                        >
                          {item.price && (
                            <span
                              style={{
                                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                                textDecoration: item.discounted
                                  ? "line-through"
                                  : "none",
                                opacity: item.discounted ? "0.6" : "1",
                                marginRight: "1rem",
                              }}
                              className="old-price"
                            >
                              ${item.price}
                            </span>
                          )}
                          {item.discounted && (
                            <span
                              style={{
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: "900",
                                color: "#ffd700",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                              }}
                              className="new-price"
                            >
                              ${item.discounted}
                            </span>
                          )}
                          {item.discounted && item.price && (
                            <span
                              style={{
                                display: "block",
                                fontSize: "1rem",
                                color: "#ffd700",
                                fontWeight: "600",
                                marginTop: "0.5rem",
                              }}
                            >
                              Save $
                              {(
                                parseFloat(item.price) -
                                parseFloat(item.discounted)
                              ).toFixed(2)}
                              !
                            </span>
                          )}
                        </div>

                        {/* Add CTA Button */}
                        <button
                          onClick={() => {
                            router.push(
                              item.productId
                                ? `/product-details/${item.productId}`
                                : "/shop"
                            );
                          }}
                          style={{
                            backgroundColor: "white",
                            color: item.background || "#333",
                            padding: "1rem 2.5rem",
                            fontSize: "1.1rem",
                            fontWeight: "700",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                              "0 6px 25px rgba(0,0,0,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 20px rgba(0,0,0,0.2)";
                          }}
                        >
                          Shop Now →
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-6">
                      <div
                        className="tp-slider-thumb text-end"
                        style={{
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <Image
                          style={{
                            cursor: "pointer",
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
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
