"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const CategoryFilter = ({ setCurrPage, shop_right = false }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Grouping logic
  function groupCategoriesByProductType(categories) {
    const grouped = {};

    for (const item of categories) {
      const { productType, parent, products } = item;

      if (!products || products.length === 0) continue;

      if (!grouped[productType]) {
        grouped[productType] = [];
      }

      grouped[productType].push({ parent, count: products.length });
    }

    return (
      Object.entries(grouped)
        // Sort product types alphabetically
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([productType, children]) => ({
          productType,
          // Sort children alphabetically by `parent` name
          children: children.sort((a, b) => a.parent.localeCompare(b.parent)),
        }))
    );
  }

  // handle category route
  const handleCategoryRoute = (title, isChild = true) => {
    setCurrPage(1);
    if (!isChild) {
      router.push(
        `/${
          shop_right ? "shop-right-sidebar" : "shop"
        }?productType=${title.toLowerCase()}`
      );
    } else {
      router.push(
        `/${
          shop_right ? "shop-right-sidebar" : "shop"
        }?subCategory=${title.toLowerCase()}`
      );
    }
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else if (categories?.result?.length > 0) {
    const groupedCategories = groupCategoriesByProductType(categories.result);

    content = groupedCategories.map((group) => (
      <li key={group.productType}>
        <a
          onClick={() => handleCategoryRoute(group.productType, false)}
          style={{ cursor: "pointer" }}
        >
          <strong>{group.productType}</strong>{" "}
        </a>
        <ul>
          {group.children.map((child, index) => (
            <li key={index}>
              <a
                onClick={() => handleCategoryRoute(child.parent, true)}
                style={{ cursor: "pointer" }}
                className={
                  category ===
                  child.parent
                    .toLowerCase()
                    .replace("&", "")
                    .split(" ")
                    .join("-")
                    ? "active"
                    : ""
                }
              >
                {child.parent}
                {/* <span>{child.count}</span> */}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ));
  }

  return (
    <div className="tp-shop-widget mb-10">
      <h3 className="tp-shop-widget-title">Categories</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-categories">
          <ul>{content}</ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
