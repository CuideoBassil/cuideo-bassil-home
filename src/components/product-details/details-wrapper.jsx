"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    sku,
    image,
    color,
    title,
    additionalImages,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  const isDiscountValid = discount > 0;
  const discountPercent =
    isDiscountValid && price > 0
      ? Math.round(((price - discount) / price) * 100)
      : 0;

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{category?.name}</span>
      </div>
      <h3 className="tp-product-details-title">{title}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-details-reviews">
            <span>
              ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
            </span>
          </div>
        </div>
        {status === "out-of-stock" && (
          <span
            style={{
              marginLeft: 12,
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 6,
              background: "#FEF2F2",
              color: "#DC2626",
              marginBottom: 10,
            }}
          >
            Out of Stock
          </span>
        )}
        {status !== "out-of-stock" && (
          <span
            style={{
              marginLeft: 12,
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 6,
              background: "#F0FDF4",
              color: "#16A34A",
              marginBottom: 10,
            }}
          >
            In Stock
          </span>
        )}
      </div>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {isDiscountValid ? (
          <>
            <span className="tp-product-details-price old-price">${price}</span>
            <span className="tp-product-details-price new-price">
              {" "}
              ${Number(discount).toFixed(2)}
            </span>
            {discountPercent > 0 && (
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "#FFF1F2",
                  color: "#FF4757",
                }}
              >
                Save {discountPercent}%
              </span>
            )}
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            ${price?.toFixed(2)}
          </span>
        )}
      </div>

      {/* variations */}
      {additionalImages && additionalImages.length > 0 && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">
              Color : {color?.name}
            </h4>
            <div className="tp-product-details-variation-list">
              {additionalImages.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item === activeImg ? "active" : ""
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Quantity</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <ProductQuantity />
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tags={tags} />
      )}
    </div>
  );
};

export default DetailsWrapper;
