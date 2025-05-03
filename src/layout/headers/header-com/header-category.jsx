"use client";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import { useGetAllProductTypesQuery } from "@/redux/features/productTypeApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HeaderCategory = ({ isCategoryActive, setIsCategoryActive }) => {
  const {
    data: productTypes,
    isLoading: isLoadingProductTypes,
    isError: isErrorProductTypes,
  } = useGetAllProductTypesQuery();
  const {
    data: categoriesData,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery();
  const [groupedCategories, setGroupedCategories] = useState({});
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (categoriesData?.result) {
      const grouped = categoriesData.result.reduce((acc, curr) => {
        const { productType, parent, products } = curr;
        const quantity = products.length;

        if (quantity > 0) {
          const categoryDetail = { categoryName: parent, quantity: quantity };
          if (!acc[productType]) {
            acc[productType] = [];
          }
          acc[productType].push(categoryDetail);
        }
        return acc;
      }, {});
      setGroupedCategories(grouped);
    }
  }, [categoriesData]);

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

  const isLoading = isLoadingProductTypes || isLoadingCategories;
  const isError = isErrorProductTypes || isErrorCategories;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = <ErrorMsg msg="There was an error loading categories!" />;
  } else if (!productTypes?.result || productTypes.result.length === 0) {
    content = <ErrorMsg msg="No product types found!" />;
  } else {
    content = productTypes.result.map((productTypeItem, index) => (
      <li className="has-dropdown" key={index}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(productTypeItem.name, true)}
        >
          {productTypeItem.name}
        </a>
        {groupedCategories[productTypeItem.name] &&
          groupedCategories[productTypeItem.name].length > 0 && (
            <ul className="tp-submenu">
              {groupedCategories[productTypeItem.name].map((category, i) => (
                <li
                  key={i}
                  onClick={() => handleCategoryRoute(category.categoryName)}
                >
                  <a className="cursor-pointer">{category.categoryName}</a>
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
