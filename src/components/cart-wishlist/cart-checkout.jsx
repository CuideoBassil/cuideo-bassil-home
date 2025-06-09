"use client";
import useCartInfo from "@/hooks/use-cart-info";
import Link from "next/link";
import { useState } from "react";

const CartCheckout = () => {
  const { total } = useCartInfo();
  // handle shipping cost

  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Total</span>
        <span className="tp-cart-checkout-top-price">${total}</span>
      </div>

      <div className="tp-cart-checkout-proceed">
        <Link href="/checkout" className="tp-cart-checkout-btn w-100">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
