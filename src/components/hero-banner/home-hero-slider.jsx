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
                    <div className="col-xl-5 col-lg-6 col-md-6">
                      <div className="tp-slider-content p-relative z-index-1">
                        <h3 className="tp-slider-title">{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="tp-product-banner-price mb-40">
                          {item.price && (
                            <span className="old-price">${item.price}</span>
                          )}
                          {item.discounted && (
                            <p className="new-price">${item.discounted}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-6 col-md-6">
                      <div className="tp-slider-thumb text-end">
                        <Image
                          width={320}
                          height={320}
                          src={item.img}
                          alt="slider-img"
                          className="object-contain"
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
