"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import HomeNewArrivalPrdLoader from "@/components/loader/home/home-newArrival-prd-loader";
import { useGetAllProductTypesQuery } from "@/redux/features/productTypeApi";
import { NextArr, PrevArr, ShapeLine } from "@/svg";
import { useEffect } from "react";
import CategoryCard from "./category-card";

// slider setting
const slider_setting = {
  slidesPerView: 5,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: ".tp-arrival-slider-dot",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-arrival-slider-button-next",
    prevEl: ".tp-arrival-slider-button-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const CategoriesList = () => {
  const {
    data: productTypes,
    isError,
    isLoading,
  } = useGetAllProductTypesQuery();

  useEffect(() => {
    console.log("productTypes", productTypes);
  }, [productTypes]);

  let content = null;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && productTypes?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && productTypes?.result?.length > 0) {
    const product_items = productTypes.result;

    content = (
      <Swiper
        {...slider_setting}
        modules={[Navigation, Pagination]}
        className="tp-product-arrival-active swiper-container"
      >
        {productTypes?.result?.map((item) => (
          <SwiperSlide key={item._id}>
            <CategoryCard category={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <>
      <section className="tp-product-arrival-area pb-55">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-5 col-sm-6">
              <div className="tp-section-title-wrapper ">
                <h3 className="tp-section-title">
                  Categories
                  <ShapeLine />
                </h3>
              </div>
            </div>
            <div className="col-xl-7 col-sm-6">
              <div className="tp-product-arrival-more-wrapper d-flex justify-content-end">
                <div className="tp-product-arrival-arrow tp-swiper-arrow  text-end tp-product-arrival-border">
                  <button
                    type="button"
                    className="tp-arrival-slider-button-prev"
                  >
                    <PrevArr />
                  </button>{" "}
                  <button
                    type="button"
                    className="tp-arrival-slider-button-next"
                  >
                    <NextArr />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-product-arrival-slider fix">{content}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesList;
