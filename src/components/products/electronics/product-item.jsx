import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
import { add_cart_product } from "@/redux/features/cartSlice";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { QuickView } from "@/svg";

const ProductItem = ({ product, offer_style = false }) => {
  const {
    _id,
    image,
    category,
    title,
    reviews,
    price,
    discount,
    status,
    offerDate,
  } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
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

  const isDiscountValid =
    discount > 0 &&
    (!offerDate ||
      (offerDate.startDate &&
        offerDate.endDate &&
        dayjs().isAfter(offerDate.startDate) &&
        dayjs().isBefore(offerDate.endDate)));

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

            <div className="tp-product-badge">
              {status === "out-of-stock" && (
                <span className="product-hot">out-stock</span>
              )}
            </div>
          </Link>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {/* {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
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
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )} */}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
              {/* <button
                type="button"
                className={`tp-product-action-btn ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === "out-of-stock"}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button> */}
            </div>
          </div>
        </div>
        {/*  product content */}
        <div className="tp-product-content">
          <div className="tp-product-category">
            <a
              href={`/shop?subCategory=${category?.name
                .toLowerCase()
                .replace("&", "")
                .split(" ")
                .join("-")}`}
            >
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
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
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
          {/* {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerDate?.endDate) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
