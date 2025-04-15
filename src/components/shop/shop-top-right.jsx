import React from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={[
            { value: "default", text: "Default Sorting" },
            { value: "LTH", text: "Low to High" },
            { value: "HTL", text: "High to Low" },
          ]}
          defaultCurrent={0}
          onChange={selectHandleFilter}
          name="Default Sorting"
        />
      </div>
      <div className="tp-shop-top-filter">
        <button
          onClick={() => dispatch(handleFilterSidebarOpen())}
          type="button"
          className="tp-filter-btn"
        >
          <span>
            <Filter />
          </span>{" "}
          Filter
        </button>
      </div>
    </div>
  );
};

export default ShopTopRight;
