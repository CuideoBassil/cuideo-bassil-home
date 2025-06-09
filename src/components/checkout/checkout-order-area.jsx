"use client";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";

const CheckoutOrderArea = ({ checkoutData }) => {
  const { cartTotal = 0 } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  return (
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
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
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
              <span>$10.00</span>
            </div>
          </li>

          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>${parseFloat(cartTotal + 10).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button type="submit" className="tp-checkout-btn w-100">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
