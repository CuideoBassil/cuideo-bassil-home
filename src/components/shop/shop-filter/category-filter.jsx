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
      <li key={group.productType} style={{ marginBottom: "1rem" }}>
        <a
          onClick={() => handleCategoryRoute(group.productType, false)}
          style={{
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "700",
            color: "#212529",
            display: "block",
            padding: "0.5rem 0",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#667eea";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#212529";
          }}
        >
          {group.productType}
        </a>
        <ul
          style={{
            listStyle: "none",
            padding: "0 0 0 1rem",
            margin: "0.5rem 0 0 0",
          }}
        >
          {group.children.map((child, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              <a
                onClick={() => handleCategoryRoute(child.parent, true)}
                style={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  color: "#6c757d",
                  display: "block",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.color = "#667eea";
                  e.currentTarget.style.paddingLeft = "1rem";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6c757d";
                  e.currentTarget.style.paddingLeft = "0.75rem";
                }}
              >
                {child.parent}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ));
  }

  return (
    <div className="tp-shop-widget mb-10">
      <h3
        className="tp-shop-widget-title"
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#212529",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid #667eea",
        }}
      >
        Categories
      </h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-categories">
          <ul style={{ listStyle: "none", padding: 0 }}>{content}</ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
