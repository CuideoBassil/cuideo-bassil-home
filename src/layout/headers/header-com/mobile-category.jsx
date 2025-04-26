"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
// internal
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import { useGetAllProductTypesQuery } from "@/redux/features/productTypeApi";

const MobileCategory = ({
  isCategoryActive,
  setIsCategoryActive,
  categoryType,
  setIsCanvasOpen,
}) => {
  const {
    data: productTypes,
    isError,
    isLoading,
  } = useGetAllProductTypesQuery();
  const [isActiveSubMenu, setIsActiveSubMenu] = useState("");
  const router = useRouter();

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveSubMenu) {
      setIsActiveSubMenu("");
    } else {
      setIsActiveSubMenu(title);
    }
  };

  // handle category route
  const handleCategoryRoute = (title, route) => {
    if (route === "parent") {
      router.push(`/shop?search=${title.toLowerCase()}`);
      setIsCategoryActive(!isCategoryActive);
      setIsCanvasOpen(false);
    } else {
      router.push(`/shop?search=${title.toLowerCase()}`);
      setIsCategoryActive(!isCategoryActive);
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
  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default MobileCategory;
