"use client";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetAllProductTypesQuery } from "@/redux/features/productTypeApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const HeaderCategory = ({ isCategoryActive, setIsCategoryActive }) => {
  const {
    data: productTypes,
    isError,
    isLoading,
  } = useGetAllProductTypesQuery();
  const router = useRouter();
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // handle category route
  const handleCategoryRoute = (title) => {
    setIsCategoryActive(false); // Close the dropdown when a category is selected
    router.push(`/shop?search=${title.toLowerCase()}`);
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
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && productTypes?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && productTypes?.result?.length > 0) {
    const category_items = productTypes.result;
    content = category_items.map((item) => (
      <li className="has-dropdown" key={item._id}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.name)}
        >
          {item.name}
        </a>
      </li>
    ));
  }
  return (
    <ul
      ref={dropdownRef} // Attach the ref to the ul element
      className={`tp-category-menu-content ${isCategoryActive ? "active" : ""}`}
    >
      {content}
    </ul>
  );
};

export default HeaderCategory;
