"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      <section
        className="tp-cart-area pb-120"
        style={{ minHeight: "calc(100vh - 500px)", backgroundColor: "white" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div
              className="text-center pt-50"
              style={{
                backgroundColor: "white",
                padding: "4rem 2rem",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: "1.5rem",
                }}
              >
                No Cart Items Found
              </h3>
              <Link
                href="/shop"
                className="tp-cart-checkout-btn mt-20"
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  padding: "1rem 2.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "600",
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
                Continue Shopping
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div
                  className="tp-cart-list mb-25 mr-30"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "2rem",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr style={{ borderBottom: "2px solid #667eea" }}>
                        <th
                          colSpan="2"
                          className="tp-cart-header-product"
                          style={{
                            color: "#2d3748",
                            fontWeight: "700",
                            fontSize: "1rem",
                            padding: "1rem 0.5rem",
                          }}
                        >
                          Product
                        </th>
                        <th
                          className="tp-cart-header-price"
                          style={{
                            color: "#2d3748",
                            fontWeight: "700",
                            fontSize: "1rem",
                            padding: "1rem 0.5rem",
                          }}
                        >
                          Price
                        </th>
                        <th
                          className="tp-cart-header-quantity"
                          style={{
                            color: "#2d3748",
                            fontWeight: "700",
                            fontSize: "1rem",
                            padding: "1rem 0.5rem",
                          }}
                        >
                          Quantity
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart_products.map((item, i) => (
                        <CartItem key={i} product={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8">
                      {/* <div className="tp-cart-coupon">
                        <form action="#">
                          <div className="tp-cart-coupon-input-box">
                            <label>Coupon Code:</label>
                            <div className="tp-cart-coupon-input d-flex align-items-center">
                              <input type="text" placeholder="Enter Coupon Code" />
                              <button type="submit">Apply</button>
                            </div>
                          </div>
                        </form>
                      </div> */}
                    </div>
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update text-md-end mr-30">
                        <button
                          onClick={() => dispatch(clearCart())}
                          type="button"
                          className="tp-cart-update-btn"
                          style={{
                            backgroundColor: "#ff6b6b",
                            color: "white",
                            border: "none",
                            padding: "0.875rem 2rem",
                            borderRadius: "8px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff5252";
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(255, 107, 107, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <CartCheckout />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartArea;
