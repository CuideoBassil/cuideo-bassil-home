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
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          {image && (
            <Image src={image} alt="product img" width={70} height={100} />
          )}
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>
          $
          {discount > 0
            ? (discount * orderQuantity).toFixed(2)
            : (price * orderQuantity).toFixed(2)}
        </span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd({ title, id: _id })}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
