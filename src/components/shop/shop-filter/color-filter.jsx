"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import ShopColorLoader from "@/components/loader/shop/color-filter-loader";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const ColorFilter = ({ setCurrPage, shop_right = false }) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const color = searchParams.get("color");

  // handle color selection
  const handleColor = (clr) => {
    setCurrPage(1);
    router.push(
      `/${
        shop_right ? "shop-right-sidebar" : "shop"
      }?color=${clr.toLowerCase()}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopColorLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (products?.data?.length > 0) {
    // Filter out "out-of-stock" products
    const product_items = products.data.filter(
      (prd) => prd.status !== "out-of-stock"
    );

    // Deduplicate colors properly
    const uniqueColorsMap = new Map();

    product_items.forEach((product) => {
      if (product.color?.name && product.color?.code) {
        const colorKey = `${product.color.name.toLowerCase()}-${product.color.code.toLowerCase()}`;
        if (!uniqueColorsMap.has(colorKey)) {
          uniqueColorsMap.set(colorKey, {
            name: product.color.name,
            code: product.color.code,
          });
        }
      }
    });

    const uniqueColors = Array.from(uniqueColorsMap.values());

    // Count products per color efficiently
    const colorCounts = product_items.reduce((acc, product) => {
      const colorName = product.color?.name;
      if (colorName) {
        acc[colorName] = (acc[colorName] || 0) + 1;
      }
      return acc;
    }, {});

    // Generate content
    content = uniqueColors.map((item, i) => (
      <li key={i}>
        <div className="tp-shop-widget-checkbox-circle">
          <input
            type="checkbox"
            id={item.name}
            checked={
              color ===
              item.name?.toLowerCase().replace("&", "").split(" ").join("-")
                ? "checked"
                : false
            }
            readOnly
          />
          <label onClick={() => handleColor(item.name)} htmlFor={item.name}>
            {item.name}
          </label>
          <span
            style={{
              backgroundColor: `${item.code}`,
              border: "1px solid grey",
            }}
            className="tp-shop-widget-checkbox-circle-self"
          ></span>
        </div>
        {/* <span className="tp-shop-widget-checkbox-circle-number">
          {colorCounts[item.name] || 0}
        </span> */}
      </li>
    ));
  }

  return (
    <div className="tp-shop-widget mb-10">
      <h3 className="tp-shop-widget-title">Filter by Color</h3>
      <div className="tp-shop-widget-content">
        <div
          className="tp-shop-widget-checkbox-circle-list"
          style={{ height: "auto" }}
        >
          <ul>{content}</ul>
        </div>
      </div>
    </div>
  );
};

export default ColorFilter;
