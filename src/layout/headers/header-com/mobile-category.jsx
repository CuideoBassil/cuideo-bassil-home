"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";

const MobileCategory = ({
  isCategoryActive,
  categoryType,
  setIsCanvasOpen,
}) => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetAllCategoriesQuery(categoryType);
  const [isActiveSubMenu, setIsActiveSubMenu] = useState("");
  const router = useRouter();
  const [groupedCategories, setGroupedCategories] = useState([]);

  function groupCategoriesByProductType(categories) {
    const grouped = {};

    for (const item of categories) {
      const { productType, parent, products } = item;

      if (!products || products.length === 0) {
        continue;
      }

      if (!grouped[productType]) {
        grouped[productType] = [];
      }
      grouped[productType].push(parent);
    }

    return Object.entries(grouped).map(([productType, children]) => ({
      parent: productType,
      children,
    }));
  }

  useEffect(() => {
    if (categories?.result) {
      setGroupedCategories(groupCategoriesByProductType(categories.result));
    }
  }, [categories]);
  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveSubMenu) {
      setIsActiveSubMenu("");
    } else {
      setIsActiveSubMenu(title);
    }
  };

  // handle category route
  const handleCategoryRoute = (title, isParent = false) => {
    if (isParent) {
      router.push(`/shop?search=${title.toLowerCase()}`);
      setIsCanvasOpen(false);
      return;
    } else {
      router.push(`/shop?subCategory=${title.toLowerCase()}`);
      setIsCanvasOpen(false);
    }
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = groupedCategories;
    content = category_items.map((item) => (
      <li className="has-dropdown" key={item._id}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.parent, true)}
        >
          {item.parent}
          {item.children && (
            <button
              onClick={() => handleOpenSubMenu(item.parent)}
              className="dropdown-toggle-btn"
            >
              <i className="fa-regular fa-angle-right"></i>
            </button>
          )}
        </a>

        {item.children && (
          <ul
            className={`tp-submenu ${
              isActiveSubMenu === item.parent ? "active" : ""
            }`}
          >
            {item.children.map((child, i) => (
              <li key={i} onClick={() => handleCategoryRoute(child, true)}>
                <a className="cursor-pointer">{child}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }
  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default MobileCategory;
