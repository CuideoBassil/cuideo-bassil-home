"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
// internal
import BackToTopCom from "@/components/common/back-to-top";
import ProductModal from "@/components/common/product-modal";
import Loader from "@/components/loader/loader";
import useAuthCheck from "@/hooks/use-auth-check";
import {
  get_cart_products,
  initialOrderQuantity,
} from "@/redux/features/cartSlice";
import { get_compare_products } from "@/redux/features/compareSlice";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";

const Wrapper = ({ children }) => {
  const { productItem } = useSelector((state) => state.productModal);
  const dispatch = useDispatch();
  const authChecked = useAuthCheck();

  useEffect(() => {
    dispatch(get_cart_products());
    dispatch(get_wishlist_products());
    dispatch(get_compare_products());
    dispatch(initialOrderQuantity());
  }, [dispatch]);

  return !authChecked ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Loader spinner="fade" loading={!authChecked} />
    </div>
  ) : (
    <div id="wrapper">
      {children}
      <BackToTopCom />
      <ToastContainer />
      {/* product modal start */}
      {productItem && <ProductModal />}
      {/* product modal end */}
    </div>
  );
};

export default Wrapper;
