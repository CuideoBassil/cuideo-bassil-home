import { add_cart_product } from "@/redux/features/cartSlice";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { Cart } from "@/svg";
import { QuickView } from "@/svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal

const ProductItem = ({ product }) => {
  const { _id, image, category, title, reviews, price, discount, status } =
    product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const isDiscountValid = discount > 0;

  return (
    <>
      <div className=" tp-product-item transition-3" style={{ height: "100%" }}>
        <div
          style={{ height: "260px" }}
          className="tp-product-thumb p-relative fix"
        >
          <Link href={`/product-details/${_id}`}>
            <Image
              src={image}
              width="300"
              height="300"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              alt="product"
            />
          </Link>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart className="text-gray-700 w-5 h-5" />{" "}
                  <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart className="text-gray-700 w-5 h-5" />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
            </div>
          </div>
        </div>
        {/*  product content */}
        <div className="tp-product-content">
          <div className="tp-product-category">
            <a href={`/shop?subCategory=${category?.name.toLowerCase()}`}>
              {category?.name}
            </a>
          </div>
          <h3 className="tp-product-title">
            <Link href={`/product-details/${_id}`}>
              {title.slice(0, 50)}
              {title.length > 50 && "..."}
            </Link>
          </h3>
          <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            {!isMobile && (
              <div className="tp-product-rating-text">
                <span>
                  ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
                </span>
              </div>
            )}
          </div>
          <div className="tp-product-price-wrapper">
            {isDiscountValid ? (
              <>
                <span className="tp-product-price old-price">${price}</span>
                <span className="tp-product-price new-price">
                  {" "}
                  ${Number(discount).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">
                ${parseFloat(price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
