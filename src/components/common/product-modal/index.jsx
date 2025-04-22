import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
// internal
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "calc(100% - 300px)",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector(
    (state) => state.productModal
  );
  const { image, additionalImages, status } = productItem || {};

  const [activeImg, setActiveImg] = useState(image);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(image);
    dispatch(initialOrderQuantity());
    setLoading(false);
  }, [image, dispatch]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item);
    setLoading(true);
  };

  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex">
            <button
              onClick={() => dispatch(handleModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
            {/* product-details-thumb-wrapper start */}
            <DetailsThumbWrapper
              activeImg={activeImg}
              handleImageActive={handleImageActive}
              imageURLs={[image, ...additionalImages]}
              imgWidth={416}
              imgHeight={480}
              loading={loading}
              status={status}
            />
            {/* product-details-thumb-wrapper end */}

            {/* product-details-wrapper start */}
            <DetailsWrapper
              productItem={productItem}
              handleImageActive={handleImageActive}
              activeImg={activeImg}
            />
            {/* product-details-wrapper end */}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductModal;
