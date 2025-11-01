import useResponsive from "@/hooks/use-responsive";
import { add_cart_product } from "@/redux/features/cartSlice";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { Cart, QuickView } from "@/svg";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal

const ProductItem = ({ product }) => {
  const { _id, image, category, title, reviews, price, discount, status } =
    product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();

  // Memoize rating calculation
  const ratingVal = useMemo(() => {
    if (reviews && reviews.length > 0) {
      return (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      );
    }
    return 0;
  }, [reviews]);

  // Memoize handlers
  const handleAddProduct = useCallback(() => {
    dispatch(add_cart_product(product));
  }, [dispatch, product]);

  const handleQuickView = useCallback(() => {
    dispatch(handleProductModal(product));
  }, [dispatch, product]);

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
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                  onClick={handleAddProduct}
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
                onClick={handleQuickView}
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
