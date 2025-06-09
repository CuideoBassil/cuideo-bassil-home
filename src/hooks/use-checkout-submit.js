"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Redux & Utils
import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
import { set_shipping } from "@/redux/features/order/orderSlice";
// import { notifyError, notifySuccess } from "@/utils/toast";
import useCartInfo from "./use-cart-info";

const useCheckoutSubmit = () => {
  const [saveOrder, {}] = useSaveOrderMutation();

  const { cart_products } = useSelector((state) => state.cart);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal, originalTotal } = useCartInfo();
  const [shippingCost, setShippingCost] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Set form values from shipping_info
  useEffect(() => {
    const keys = [
      "fullName",
      "phoneNumber",
      "emailAddress",
      "orderNote",
      "city",
      "street",
      "building",
      "floor",
    ];
    keys.forEach((key) => setValue(key, shipping_info[key]));
  }, [shipping_info, setValue]);

  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    const orderInfo = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      orderNote: data.orderNote,
      city: data.city,
      street: data.street,
      building: data.building,
      floor: data.floor,
      status: "pending",
      paymentMethod: "cash on delivery",
      orderProducts: cart_products,
      amount: originalTotal + shippingCost,
      discountedAmount: total + shippingCost,
      deliveryDistrict: data.district,
    };

    const response = await saveOrder(orderInfo);
    if (!response?.error) {
      // Generate WhatsApp message
      const message = `
New Order:

Name: ${orderInfo.fullName}
Phone Number: ${orderInfo.phoneNumber}
Email: ${orderInfo?.emailAddress ? orderInfo.emailAddress : "Not provided"}
Products:\n ${orderInfo.orderProducts
        .map(
          (p, index) =>
            `#${index + 1} SKU: ${p.sku}, Title: ${p.title}, Quantity: ${
              p.orderQuantity
            }`
        )
        .join(",\n")}
Amount: $${orderInfo.amount}
Discounted Amount: $${orderInfo.discountedAmount}
City: ${orderInfo.city}
Street: ${orderInfo.street}
Building: ${orderInfo.building}
Floor: ${orderInfo.floor}
Note: ${orderInfo.orderNote || "None"}

Please check the admin dashboard for more details.
`;
      const encodedMessage = encodeURIComponent(message.trim());
      const whatsappUrl = `https://wa.me/+96181342284?text=${encodedMessage}`;

      // Clear localStorage and redirect
      localStorage.removeItem("cart_products");
      localStorage.removeItem("couponInfo");
      // notifySuccess("Order confirmed!");

      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
    } else {
      // notifyError("Failed to place order.");
      setIsCheckoutSubmit(false);
    }
  };

  return {
    shippingCost,
    setShippingCost,
    total,
    shippingCost,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    submitHandler,
    handleSubmit,
  };
};

export default useCheckoutSubmit;
