"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import OffCanvas from "@/components/common/off-canvas";
import HeaderSearchForm from "@/components/forms/header-search-form";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import { CategoryMenu, Menu, Phone } from "@/svg";
import logo from "@assets/img/logo/logo.png";
import HeaderCategory from "./header-com/header-category";
import Menus from "./header-com/menus";

const Header = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

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

  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        src={logo}
                        alt="logo"
                        width={200} // Set an appropriate width
                        height={100} // Set an appropriate height
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          height: "auto",
                        }}
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
                  className="col-xl-3 col-lg-3 col-md-6 col-6"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div className="tp-header-contact-icon">
                      <span>
                        <Phone />
                      </span>
                    </div>
                    <div
                      className="tp-header-contact-content"
                      style={{
                        display: isMobile ? "none" : "flex",
                        color: "black",
                      }}
                    >
                      <div>81-342284</div>
                    </div>
                  </a>

                  {/* <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <button
                        onClick={() => setIsCategoryActive(!isCategoryActive)}
                        style={{ backgroundColor: "#0500ff" }}
                        className="tp-category-menu-btn tp-category-menu-toggle"
                      >
                        <span>
                          <CategoryMenu />
                        </span>
                        All Categories
                      </button>
                      <nav className="tp-category-menu-content">
                        <HeaderCategory
                          isCategoryActive={isCategoryActive}
                          setIsCategoryActive={setIsCategoryActive}
                        />{" "}
                        {/* Pass setIsCategoryActive */}
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                        maxWidth: "100%",
                        height: "auto",
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
                  <a
                    href="tel:96181342284"
                    // style={{ marginRight: "30px" }}
                    className="tp-header-contact d-flex align-items-center justify-content-end"
                  >
                    <div className="tp-header-contact-icon">
                      <span>
                        <Phone />
                      </span>
                    </div>

                    <div
                      style={{
                        display: isMobile ? "none" : "flex",
                        color: "black",
                      }}
                      className="tp-header-contact-content"
                    >
                      <div>81-342284</div>
                    </div>
                  </a>
                  {/* <div
                    className="tp-header-action-item "
                    style={{ marginLeft: "10px" }}
                  >
                    <button
                      onClick={() => dispatch(openCartMini())}
                      type="button"
                      className="tp-header-action-btn cartmini-open-btn"
                    >
                      <Cart />
                      <span className="tp-header-action-badge">{quantity}</span>
                    </button>
                  </div> */}
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
      <CartMiniSidebar />
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />
    </>
  );
};

export default Header;
