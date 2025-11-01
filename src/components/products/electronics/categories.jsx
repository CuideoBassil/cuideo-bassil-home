"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import HomeNewArrivalPrdLoader from "@/components/loader/home/home-newArrival-prd-loader";
import { useGetAllProductTypesQuery } from "@/redux/features/productTypeApi";
import { NextArr, PrevArr } from "@/svg";
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
      <section
        className="tp-product-arrival-area pb-40"
        style={{ backgroundColor: "#ffffff", paddingTop: "1rem" }}
      >
        <div className="container">
          <div className="row align-items-end mb-4">
            <div className="col-xl-6 col-sm-6">
              <div className="tp-section-title-wrapper">
                {/* <span
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
                  Browse by
                </span> */}
                <h3
                  className="tp-section-title"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "#212529",
                    marginBottom: "0.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  Categories
                </h3>
                <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                  Find exactly what you're looking for
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6">
              <div className="tp-product-arrival-more-wrapper d-flex justify-content-end align-items-center">
                <div
                  className="tp-product-arrival-arrow tp-swiper-arrow text-end"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    type="button"
                    className="tp-arrival-slider-button-prev"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      border: "2px solid #e0e0e0",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#667eea";
                      e.currentTarget.style.backgroundColor = "#667eea";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <PrevArr />
                  </button>
                  <button
                    type="button"
                    className="tp-arrival-slider-button-next"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      border: "2px solid #e0e0e0",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#667eea";
                      e.currentTarget.style.backgroundColor = "#667eea";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
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
