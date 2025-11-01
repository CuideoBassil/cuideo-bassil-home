"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
  const { cart_products } = useSelector((state) => state.cart);

  // Memoize calculations to prevent unnecessary recalculations
  const cartInfo = useMemo(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const { price, discount, orderQuantity } = cartItem;
        const discountedPrice = discount > 0 ? discount : price;

        cartTotal.total += discountedPrice * orderQuantity;
        cartTotal.originalTotal += price * orderQuantity;
        cartTotal.quantity += orderQuantity;

        return cartTotal;
      },
      {
        total: 0,
        originalTotal: 0,
        quantity: 0,
      }
    );

    return {
      quantity: cart.quantity,
      total: cart.total,
      originalTotal: cart.originalTotal,
      totalSavings: cart.originalTotal - cart.total,
    };
  }, [cart_products]);

  return cartInfo;
};

export default useCartInfo;
