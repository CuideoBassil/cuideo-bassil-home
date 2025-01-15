"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import OffCanvas from "@/components/common/off-canvas";
import HeaderSearchForm from "@/components/forms/header-search-form";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import { openCartMini } from "@/redux/features/cartSlice";
import { CartTwo, CategoryMenu, Menu, Phone } from "@/svg";
import logo from "@assets/img/logo/logo.png";
import HeaderCategory from "./header-com/header-category";
import HeaderMainRight from "./header-com/header-main-right";
import Menus from "./header-com/menus";

const Header = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          {/* header top start  */}
          {/* <div className="tp-header-top black-bg p-relative z-index-1 d-none d-md-block">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-header-welcome d-flex align-items-center">
                    <span>
                      <ShippingCar />
                    </span>
                    <p>FREE Express Shipping On Orders $570+</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-header-top-right d-flex align-items-center justify-content-end">
                    <HeaderTopRight />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* header main start */}
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-4 col-md-5 col-5">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                        src={logo}
                        alt="logo"
                        width={700}
                        height={400}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <HeaderSearchForm />
                  </div>
                </div>

                <div
                  className="col-xl-4 col-lg-3 col-md-7 col-7"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div className="tp-header-contact d-flex align-items-center justify-content-end">
                    <div className="tp-header-contact-icon">
                      <span>
                        <Phone />
                      </span>
                    </div>
                    <div className="tp-header-contact-content">
                      <h5>Contact Us:</h5>
                      <p>
                        <a href="tel:96181342284">96181342284</a>
                      </p>
                    </div>
                  </div>

                  <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
                </div>
              </div>
            </div>
          </div>

          {/* header bottom start */}
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3">
                    {/* category start */}
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <button
                        onClick={() => setIsCategoryActive(!isCategoryActive)}
                        className="tp-category-menu-btn tp-category-menu-toggle"
                      >
                        <span>
                          <CategoryMenu />
                        </span>
                        All Categories
                      </button>
                      <nav className="tp-category-menu-content">
                        <HeaderCategory
                          categoryType="electronics"
                          isCategoryActive={isCategoryActive}
                        />
                      </nav>
                    </div>
                    {/* category end */}
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  {/* <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-contact d-flex align-items-center justify-content-end">
                      <div className="tp-header-contact-icon">
                        <span>
                          <Phone />
                        </span>
                      </div>
                      <div className="tp-header-contact-content">
                        <h5>Hotline:</h5>
                        <p>
                          <a href="tel:96181342284">96181342284</a>
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sticky header start */}
      <div
        id="header-sticky-2"
        className={`tp-header-sticky-area ${sticky ? "header-sticky-2" : ""}`}
      >
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image
                      style={{
                        objectFit: "contain",
                        width: "270px",
                        height: "100%",
                      }}
                      src={logo}
                      alt="logo"
                      width={700}
                      height={200}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block">
                <div className="tp-header-sticky-menu main-menu menu-style-1 d-none d-lg-block">
                  <nav id="mobile-menu">
                    <Menus />
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                  {/* <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/compare" className="tp-header-action-btn">
                      <Compare />
                    </Link>
                  </div> */}
                  {/* <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/wishlist" className="tp-header-action-btn">
                      <Wishlist />
                      <span className="tp-header-action-badge">{wishlist.length}</span>
                    </Link>
                  </div> */}

                  <div className="tp-header-contact d-flex align-items-center justify-content-end">
                    <div className="tp-header-contact-icon">
                      <span>
                        <Phone />
                      </span>
                    </div>
                    <div className="tp-header-contact-content">
                      <h5>Contact Us:</h5>
                      <p>
                        <a href="tel:96181342284">96181342284</a>
                      </p>
                    </div>
                  </div>
                  <div className="tp-header-action-item">
                    <button
                      onClick={() => dispatch(openCartMini())}
                      type="button"
                      className="tp-header-action-btn cartmini-open-btn"
                    >
                      <CartTwo />
                      <span className="tp-header-action-badge">{quantity}</span>
                    </button>
                  </div>
                  <div className="tp-header-action-item d-lg-none">
                    <button
                      onClick={() => setIsCanvasOpen(true)}
                      type="button"
                      className="tp-header-action-btn tp-offcanvas-open-btn"
                    >
                      <Menu />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sticky header end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />
      {/* off canvas end */}
    </>
  );
};

export default Header;
