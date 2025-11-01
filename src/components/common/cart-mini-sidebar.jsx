"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import { closeCartMini, remove_product } from "@/redux/features/cartSlice";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";

const CartMiniSidebar = () => {
  const { cart_products, cartMiniOpen } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  // handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };
  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          cartMiniOpen ? "cartmini-opened" : ""
        }`}
        style={{
          background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div
              className="cartmini__top p-relative"
              style={{ padding: "2rem 1rem 1rem" }}
            >
              <div
                className="cartmini__top-title"
                style={{
                  marginBottom: "1rem",
                }}
              >
                <h4
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: 0,
                  }}
                >
                  Shopping cart
                </h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeCartMini())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                  style={{
                    backgroundColor: "white",
                    color: "#667eea",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(90deg)";
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg)";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            {/* <div className="cartmini__shipping">
              <RenderCartProgress />
            </div> */}
            {cart_products.length > 0 && (
              <div
                className="cartmini__widget"
                style={{
                  padding: "0 0.25rem",
                  maxHeight: "calc(100vh - 350px)",
                  overflowY: "auto",
                }}
              >
                {cart_products.map((item, i) => (
                  <div
                    key={i}
                    className="cartmini__widget-item"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "1rem",
                      marginBottom: "1rem",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div
                      className="cartmini__thumb"
                      style={{ borderRadius: "8px", overflow: "hidden" }}
                    >
                      <Link href={`/product-details/${item._id}`}>
                        {item?.image && (
                          <Image
                            src={item?.image}
                            width={70}
                            height={60}
                            alt="product img"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="cartmini__content">
                      <h5
                        className="cartmini__title"
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Link
                          href={`/product-details/${item._id}`}
                          style={{
                            color: "#2d3748",
                            textDecoration: "none",
                            transition: "color 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#667eea";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#2d3748";
                          }}
                        >
                          {item.title}
                        </Link>
                      </h5>
                      <div className="cartmini__price-wrapper">
                        {item.discount > 0 ? (
                          <span
                            className="cartmini__price"
                            style={{
                              color: "#667eea",
                              fontWeight: "700",
                              fontSize: "1.1rem",
                            }}
                          >
                            ${Number(item.discount).toFixed(2)}
                          </span>
                        ) : (
                          <span
                            className="cartmini__price"
                            style={{
                              color: "#667eea",
                              fontWeight: "700",
                              fontSize: "1.1rem",
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                        <span
                          className="cartmini__quantity"
                          style={{
                            color: "#718096",
                            fontSize: "0.9rem",
                          }}
                        >
                          {" "}
                          x{item.orderQuantity}
                        </span>
                      </div>
                    </div>
                    <a
                      onClick={() =>
                        handleRemovePrd({ title: item.title, id: item._id })
                      }
                      className="cartmini__del cursor-pointer"
                      style={{
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff5252";
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff6b6b";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <i className="fa-regular fa-xmark"></i>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {/* if no item in cart */}
            {cart_products.length === 0 && (
              <div
                className="cartmini__empty text-center"
                style={{
                  padding: "3rem 1.5rem",
                  backgroundColor: "white",
                  margin: "0 1.5rem",
                  borderRadius: "12px",
                }}
              >
                {empty_cart_img && (
                  <Image src={empty_cart_img} alt="empty-cart-img" />
                )}
                <p
                  style={{
                    color: "#718096",
                    marginTop: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Your Cart is empty
                </p>
                <Link
                  href="/shop"
                  className="tp-btn"
                  style={{
                    backgroundColor: "#667eea",
                    color: "white",
                    padding: "0.75rem 2rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    display: "inline-block",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#764ba2";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#667eea";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Go to Shop
                </Link>
              </div>
            )}
          </div>
          <div
            className="cartmini__checkout"
            style={{
              backgroundColor: "white",
              margin: "1rem auto",
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "90%",
            }}
          >
            <div
              className="cartmini__checkout-title mb-20"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                paddingBottom: "0.75rem",
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: 0,
                }}
              >
                Subtotal:
              </h4>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#667eea",
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link
                href="/cart"
                onClick={handleCloseCartMini}
                className="tp-btn mb-10 w-100"
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  transition: "all 0.3s ease",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#764ba2";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#667eea";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={handleCloseCartMini}
                className="tp-btn tp-btn-border w-100"
                style={{
                  backgroundColor: "white",
                  color: "#667eea",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  transition: "all 0.3s ease",
                  border: "2px solid #667eea",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#667eea";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#667eea";
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* overlay start */}
      <div
        onClick={handleCloseCartMini}
        className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
