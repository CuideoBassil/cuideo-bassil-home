"use client";
import ServerPagination from "@/ui/ServerPagination";
import { useEffect, useState } from "react";
import ProductItem from "../products/electronics/product-item";
import CategoryFilter from "./shop-filter/category-filter";
import ColorFilter from "./shop-filter/color-filter";
import ProductBrand from "./shop-filter/product-brand";
import ResetButton from "./shop-filter/reset-button";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";

const ShopContent = ({
  all_products,
  products,
  otherProps,
  shop_right,
  hidden_sidebar,
  totalProducts,
  itemsPerPage,
}) => {
  const { priceFilterValues, selectHandleFilter, currPage, setCurrPage } =
    otherProps;
  const { setPriceValue } = priceFilterValues || {};
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxPrice = all_products.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);

  return (
    <section className="tp-shop-area pb-120">
      <div className="container">
        <div className="row">
          {!shop_right && !hidden_sidebar && !isMobile && (
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                {/* <PriceFilter
                  priceFilterValues={priceFilterValues}
                  maxPrice={maxPrice}
                /> */}
                {/* <StatusFilter setCurrPage={setCurrPage} /> */}
                <CategoryFilter setCurrPage={setCurrPage} />
                <ColorFilter setCurrPage={setCurrPage} />
                <ProductBrand setCurrPage={setCurrPage} />
                <ResetButton
                  setPriceValues={setPriceValue}
                  maxPrice={maxPrice}
                />
              </div>
            </div>
          )}

          <div
            className={`${
              hidden_sidebar ? "col-xl-12 col-lg-12" : "col-xl-9 col-lg-8"
            }`}
          >
            <div className="tp-shop-main-wrapper">
              <div className="tp-shop-top mb-45">
                <div className="row">
                  <div className="col-xl-6">
                    <ShopTopLeft
                      showing={products.length}
                      total={totalProducts}
                    />
                  </div>
                  <div className="col-xl-6">
                    <ShopTopRight selectHandleFilter={selectHandleFilter} />
                  </div>
                </div>
              </div>

              {products.length > 0 && (
                <div className="tp-shop-items-wrapper tp-shop-item-primary">
                  <div className="tab-content" id="productTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="grid-tab-pane"
                      role="tabpanel"
                      aria-labelledby="grid-tab"
                      tabIndex="0"
                    >
                      <div className="row">
                        {products.length === 0 && <h2>No products found</h2>}
                        {products.map((item, i) => (
                          <div
                            key={i}
                            className="col-6 col-lg-4 col-xl-3 mt-20"
                          >
                            <ProductItem product={item} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {products.length > 0 && (
                <div className="tp-shop-pagination mt-20">
                  <div className="tp-pagination">
                    <ServerPagination
                      items={Array(totalProducts).fill(0)}
                      countOfPage={itemsPerPage}
                      currPage={currPage}
                      setCurrPage={setCurrPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {shop_right && (
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                {/* <PriceFilter
                  priceFilterValues={priceFilterValues}
                  maxPrice={maxPrice}
                /> */}
                {/* <StatusFilter setCurrPage={setCurrPage} /> */}
                <CategoryFilter setCurrPage={setCurrPage} />
                <ColorFilter setCurrPage={setCurrPage} />
                <ProductBrand setCurrPage={setCurrPage} />
                <ResetButton
                  setPriceValues={setPriceValue}
                  maxPrice={maxPrice}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopContent;
