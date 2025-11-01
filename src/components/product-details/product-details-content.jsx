"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import RelatedProducts from "./related-products";

const ProductDetailsContent = ({ productItem }) => {
  const { _id, image, additionalImages, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(image);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(image);
  }, [image]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item);
  };
  return (
    <section
      className="tp-product-details-area"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="tp-product-details-top pb-115"
        style={{ paddingTop: "3rem" }}
      >
        <div className="container">
          <div
            className="row"
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="col-xl-7 col-lg-6">
              {/* product-details-thumb-wrapper start */}
              <DetailsThumbWrapper
                activeImg={activeImg}
                handleImageActive={handleImageActive}
                imageURLs={[image, ...additionalImages]}
                imgWidth={1000}
                imgHeight={1000}
                videoId={videoId}
                status={status}
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-5 col-lg-6">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                detailsBottom={true}
              />
              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div
            className="row"
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} />
            </div>
          </div>
        </div>
      </div>
      {/* product details description */}

      {/* related products start */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div
              className="tp-section-title-wrapper-6 text-center mb-40"
              style={{
                position: "relative",
                paddingBottom: "1rem",
              }}
            >
              <h3
                className="tp-section-title-6"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: "0.5rem",
                }}
              >
                Related Products
              </h3>
              <div
                style={{
                  width: "80px",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  margin: "0 auto",
                  borderRadius: "2px",
                }}
              ></div>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={_id} />
          </div>
        </div>
      </section>
      {/* related products end */}
    </section>
  );
};

export default ProductDetailsContent;
