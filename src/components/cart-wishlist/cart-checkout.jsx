"use client";
import useCartInfo from "@/hooks/use-cart-info";
import Link from "next/link";

const CartCheckout = () => {
  const { total } = useCartInfo();
  // handle shipping cost

  return (
    <div
      className="tp-cart-checkout-wrapper"
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: "20px",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#2d3748",
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid #667eea",
        }}
      >
        Order Summary
      </h3>
      <div
        className="tp-cart-checkout-top d-flex align-items-center justify-content-between"
        style={{
          padding: "1.25rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          border: "2px solid #e2e8f0",
        }}
      >
        <span
          className="tp-cart-checkout-top-title"
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#4a5568",
          }}
        >
          Total
        </span>
        <span
          className="tp-cart-checkout-top-price"
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#667eea",
          }}
        >
          ${total}
        </span>
      </div>

      <div className="tp-cart-checkout-proceed">
        <Link
          href="/checkout"
          className="tp-cart-checkout-btn w-100"
          style={{
            backgroundColor: "#667eea",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            textDecoration: "none",
            display: "block",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.05rem",
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
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
