"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0); // Total discounted price
  const [originalTotal, setOriginalTotal] = useState(0); // Total without discount
  const { cart_products } = useSelector((state) => state.cart);

  useEffect(() => {
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

    setQuantity(cart.quantity);
    setTotal(cart.total);
    setOriginalTotal(cart.originalTotal);
  }, [cart_products]);

  return {
    quantity,
    total, // Discounted total
    originalTotal, // Total without discount
    totalSavings: originalTotal - total,
    setTotal,
  };
};

export default useCartInfo;
