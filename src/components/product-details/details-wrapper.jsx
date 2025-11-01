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

  return (
    <div className="tp-product-details-wrapper" style={{ padding: "1rem" }}>
      <div
        className="tp-product-details-category"
        style={{
          display: "inline-block",
          backgroundColor: "#f0f4ff",
          color: "#667eea",
          padding: "0.375rem 1rem",
          borderRadius: "20px",
          fontSize: "0.875rem",
          fontWeight: "600",
          marginBottom: "1rem",
        }}
      >
        <span>{category?.name}</span>
      </div>
      <h3
        className="tp-product-details-title"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: "700",
          color: "#2d3748",
          marginBottom: "1rem",
          lineHeight: "1.3",
        }}
      >
        {title}
      </h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        {/* <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div> */}
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
      </div>
      {/* <p>
        {textMore
          ? description
          : description
          ? `${description.slice(0, 100)}${
              description.length > 100 ? "..." : ""
            }`
          : "No description available"}
        {description?.length > 100 && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setTextMore(!textMore)}
          >
            {textMore ? " See less" : " See more"}
          </span>
        )}
      </p> */}

      {/* price */}
      <div
        className="tp-product-details-price-wrapper mb-20"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "2px solid #e2e8f0",
        }}
      >
        {discount > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              className="tp-product-details-price old-price"
              style={{
                fontSize: "1.25rem",
                textDecoration: "line-through",
                color: "#a0aec0",
              }}
            >
              ${price}
            </span>
            <span
              className="tp-product-details-price new-price"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#667eea",
              }}
            >
              ${Number(discount).toFixed(2)}
            </span>
            <span
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              {Math.round(((price - discount) / price) * 100)}% OFF
            </span>
          </div>
        ) : (
          <span
            className="tp-product-details-price new-price"
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#667eea",
            }}
          >
            ${price?.toFixed(2)}
          </span>
        )}
      </div>

      {/* variations */}
      {/* {imageURLs.some((item) => item?.color && item?.color?.name) && ( */}
      <div
        className="tp-product-details-variation"
        style={{ marginBottom: "1.5rem" }}
      >
        <div className="tp-product-details-variation-item">
          <h4
            className="tp-product-details-variation-title"
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#4a5568",
              marginBottom: "0.75rem",
            }}
          >
            Color : <span style={{ color: "#667eea" }}>{color?.name}</span>
          </h4>
          <div
            className="tp-product-details-variation-list"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {additionalImages?.map((item, i) => (
              <button
                onClick={() => handleImageActive(item)}
                key={i}
                type="button"
                className={`color tp-color-variation-btn ${
                  item === activeImg ? "active" : ""
                }`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  border:
                    item === activeImg
                      ? "3px solid #667eea"
                      : "2px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    item === activeImg
                      ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (item !== activeImg) {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (item !== activeImg) {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
      {/* )} */}

      {/* if ProductDetailsCountdown true start */}
      {/* {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )} */}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <h3
          className="tp-product-details-action-title"
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#4a5568",
            marginBottom: "0.75rem",
          }}
        >
          Quantity
        </h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <ProductQuantity />
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
              style={{
                backgroundColor:
                  status === "out-of-stock" ? "#cbd5e0" : "#667eea",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: status === "out-of-stock" ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (status !== "out-of-stock") {
                  e.currentTarget.style.backgroundColor = "#764ba2";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (status !== "out-of-stock") {
                  e.currentTarget.style.backgroundColor = "#667eea";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {status === "out-of-stock" ? "Out of Stock" : "Add To Cart"}
            </button>
          </div>
        </div>
        {/* <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            Buy Now
          </button>
        </Link> */}
      </div>
      {/* product-details-action-sm start */}
      <div className="tp-product-details-action-sm">
        {/* <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompareProduct(productItem.data)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          Compare
        </button> */}
        {/* <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlistProduct(productItem.data)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          Add Wishlist
        </button> */}
        {/* <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Ask a question
        </button> */}
      </div>
      {/* product-details-action-sm end */}

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tags={tags} />
      )}
    </div>
  );
};

export default DetailsWrapper;
