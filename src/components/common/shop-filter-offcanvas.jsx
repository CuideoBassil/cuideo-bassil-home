import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";
import ColorFilter from "../shop/shop-filter/color-filter";
import ProductBrand from "../shop/shop-filter/product-brand";
import ResetButton from "../shop/shop-filter/reset-button";

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false,
}) => {
  const {
    priceFilterValues,
    setCurrPage,
    handleColorChange,
    handleCategoryChange,
    handleBrandChange,
    handleSubCategoryChange,
    handleStatusChange,
    handleResetFilters,
    activeFilters,
  } = otherProps;

  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const dispatch = useDispatch();

  // max price
  const maxPrice = all_products.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? "offcanvas-opened" : ""
        }`}
      >
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarClose())}
              className="tp-filter-offcanvas-close-btn filter-close-btn"
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
            /> */}
            {/* <StatusFilter
              setCurrPage={setCurrPage}
              handleStatusChange={handleStatusChange}
              activeStatus={activeFilters?.status}
              shop_right={right_side}
            /> */}
            <CategoryFilter
              setCurrPage={setCurrPage}
              handleCategoryChange={handleCategoryChange}
              handleSubCategoryChange={handleSubCategoryChange}
              activeCategories={activeFilters?.categories}
              activeSubCategories={activeFilters?.subCategories}
              shop_right={right_side}
            />
            <ColorFilter
              setCurrPage={setCurrPage}
              handleColorChange={handleColorChange}
              activeFilters={activeFilters}
              shop_right={right_side}
            />
            <ProductBrand
              setCurrPage={setCurrPage}
              handleBrandChange={handleBrandChange}
              activeBrands={activeFilters?.brands}
              shop_right={right_side}
            />
            <ResetButton
              handleResetFilters={handleResetFilters}
              shop_right={right_side}
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default ShopFilterOffCanvas;
