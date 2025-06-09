"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import CheckoutBillingArea from "./checkout-billing-area";

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    shippingCost,
    setShippingCost,
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea
                      register={register}
                      errors={errors}
                      setShippingCost={setShippingCost}
                      shippingCost={shippingCost}
                    />
                  </div>
                  <div className="col-lg-5">
                    <div className="tp-checkout-place white-bg">
                      <h3 className="tp-checkout-place-title">Your Order</h3>

                      <div className="tp-order-info-list">
                        <ul>
                          {/*  header */}
                          <li className="tp-order-info-list-header">
                            <h4>Product</h4>
                            <h4>Total</h4>
                          </li>

                          {/*  item list */}
                          {cart_products.map((item) => (
                            <li
                              key={item._id}
                              className="tp-order-info-list-desc"
                            >
                              <p>
                                {item.title}{" "}
                                <span> x {item.orderQuantity}</span>
                              </p>
                              <span>
                                $
                                {item.discount > 0
                                  ? item.discount.toFixed(2)
                                  : item.price.toFixed(2)}
                              </span>
                            </li>
                          ))}

                          {/*  subtotal */}
                          <li className="tp-order-info-list-subtotal">
                            <span>Subtotall</span>
                            <span>${total.toFixed(2)}</span>
                          </li>
                          {/*  shipping */}
                          <li
                            style={{ marginTop: "40px" }}
                            className="tp-order-info-list-shipping"
                          >
                            <span>Shipping</span>
                            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                              <span>{shippingCost.toFixed(2)}</span>
                              {/*fix this to be the delivery cost */}
                            </div>
                          </li>

                          <li className="tp-order-info-list-total">
                            <span>Total</span>
                            <span>
                              ${parseFloat(total + shippingCost).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="tp-checkout-btn-wrapper">
                        <button type="submit" className="tp-checkout-btn w-100">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
