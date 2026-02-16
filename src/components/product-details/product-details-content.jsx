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
    <section className="tp-product-details-area">
      <div
        className="tp-product-details-top pb-115"
        style={{ paddingTop: "40px", background: "#fff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                activeImg={activeImg}
                handleImageActive={handleImageActive}
                imageURLs={[image, ...(additionalImages || [])]}
                imgWidth={1000}
                imgHeight={1000}
                videoId={videoId}
                status={status}
              />
            </div>
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                detailsBottom={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-140" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} />
            </div>
          </div>
        </div>
      </div>

      {/* related products */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <h3 className="tp-section-title-6">You May Also Like</h3>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={_id} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsContent;
