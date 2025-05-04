"use client";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HeaderCategory = ({ isCategoryActive, setIsCategoryActive }) => {
  const { data: categories, isError, isLoading } = useGetAllCategoriesQuery();

  const [groupedCategories, setGroupedCategories] = useState({});
  const router = useRouter();
  const dropdownRef = useRef(null);

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

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort productType keys alphabetically
      .map(([productType, children]) => ({
        parent: productType,
        children: children.sort((a, b) => a.localeCompare(b)), // Sort children alphabetically
      }));
  }

  useEffect(() => {
    if (categories?.result) {
      setGroupedCategories(groupCategoriesByProductType(categories.result));
    }
  }, [categories]);

  // handle category route
  const handleCategoryRoute = (title, isParent = false) => {
    setIsCategoryActive(false);
    if (isParent) {
      router.push(`/shop?search=${title.toLowerCase()}`);
      return;
    } else {
      router.push(`/shop?subCategory=${title.toLowerCase()}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setIsCategoryActive]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = <ErrorMsg msg="There was an error loading categories!" />;
  } else if (!categories?.result || categories.result.length === 0) {
    content = <ErrorMsg msg="No product types found!" />;
  } else {
    content = groupedCategories.map((item, index) => (
      <li className="has-dropdown" key={index}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.name, true)}
        >
          {item.parent}
        </a>
        {item.children.length > 0 && (
          <ul className="tp-submenu">
            {item.children.map((category, i) => (
              <li key={i} onClick={() => handleCategoryRoute(category, false)}>
                <a className="cursor-pointer">{category}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }

  return (
    <ul
      ref={dropdownRef}
      className={`tp-category-menu-content ${isCategoryActive ? "active" : ""}`}
    >
      {content}
    </ul>
  );
};

export default HeaderCategory;
