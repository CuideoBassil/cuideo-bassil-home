"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
// internal
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";
import { Close, Minus, Plus } from "@/svg";

const CartItem = ({ product }) => {
  const {
    _id,
    image,
    title,
    price,
    discount,
    orderQuantity = 0,
  } = product || {};

  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  return (
    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
      {/* img */}
      <td className="tp-cart-img" style={{ padding: "1.5rem 0.5rem" }}>
        <Link href={`/product-details/${_id}`}>
          {image && (
            <Image
              src={image}
              alt="product img"
              width={70}
              height={100}
              style={{
                borderRadius: "8px",
                objectFit: "cover",
                border: "2px solid #e2e8f0",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderColor = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            />
          )}
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title" style={{ padding: "1.5rem 0.5rem" }}>
        <Link
          href={`/product-details/${_id}`}
          style={{
            color: "#2d3748",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#667eea";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2d3748";
          }}
        >
          {title}
        </Link>
      </td>
      {/* price */}
      <td className="tp-cart-price" style={{ padding: "1.5rem 0.5rem" }}>
        <span
          style={{
            color: "#667eea",
            fontWeight: "700",
            fontSize: "1.125rem",
          }}
        >
          $
          {discount > 0
            ? (discount * orderQuantity).toFixed(2)
            : (price * orderQuantity).toFixed(2)}
        </span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity" style={{ padding: "1.5rem 0.5rem" }}>
        <div
          className="tp-product-quantity mt-10 mb-10"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#f8f9fa",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "2px solid #e2e8f0",
          }}
        >
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "currentColor";
            }}
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
            style={{
              width: "50px",
              textAlign: "center",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: "600",
              color: "#2d3748",
            }}
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "currentColor";
            }}
          >
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action" style={{ padding: "1.5rem 0.5rem" }}>
        <button
          onClick={() => handleRemovePrd({ title, id: _id })}
          className="tp-cart-action-btn"
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            padding: "0.625rem 1.25rem",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff5252";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(255, 107, 107, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff6b6b";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
