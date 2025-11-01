"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import HeaderSearchForm from "@/components/forms/header-search-form";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import { openCartMini } from "@/redux/features/cartSlice";
import { Cart, CategoryMenu, Menu, Phone } from "@/svg";
import logo from "@assets/img/logo/logo.png";
import HeaderCategory from "./header-com/header-category";
import Menus from "./header-com/menus";

// Lazy load heavy components that are not immediately visible
const CartMiniSidebar = dynamic(() =>
  import("@/components/common/cart-mini-sidebar")
);
const OffCanvas = dynamic(() => import("@/components/common/off-canvas"));

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
          {/* Main navigation bar */}
          <div
            className="tp-header-main tp-header-sticky"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
              borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
            }}
          >
            <div className="container">
              <div
                className="row align-items-center"
                style={{
                  padding: "0.5rem 0",
                }}
              >
                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "50px",
                        }}
                        src={logo}
                        alt="logo"
                        width={700}
                        height={200}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <HeaderSearchForm />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-9 col-6">
                  <div
                    className="tp-header-action d-flex align-items-center justify-content-end"
                    style={{
                      gap: "0.5rem",
                    }}
                  >
                    <a
                      href="tel:96181342284"
                      className="tp-header-contact d-none d-lg-flex align-items-center justify-content-end"
                      style={{
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #e2e8f0",
                        marginRight: "1rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#667eea";
                        e.currentTarget.style.borderColor = "#667eea";
                        e.currentTarget.querySelector(
                          ".tp-header-contact-content"
                        ).style.color = "white";
                        e.currentTarget.querySelector(
                          ".tp-header-contact-icon svg"
                        ).style.fill = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.querySelector(
                          ".tp-header-contact-content"
                        ).style.color = "black";
                        e.currentTarget.querySelector(
                          ".tp-header-contact-icon svg"
                        ).style.fill = "currentColor";
                      }}
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
                          fontWeight: "600",
                          fontSize: "0.95rem",
                          marginLeft: "0.5rem",
                          transition: "color 0.3s ease",
                        }}
                        className="tp-header-contact-content"
                      >
                        <div>81-342284</div>
                      </div>
                    </a>
                    <div className="tp-header-action-item">
                      <button
                        onClick={() => dispatch(openCartMini())}
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                        style={{
                          position: "relative",
                          backgroundColor: "#667eea",
                          color: "white",
                          borderRadius: "8px",
                          padding: "0.55rem",
                          border: "none",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#764ba2";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#667eea";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <Cart />
                        <span
                          className="tp-header-action-badge"
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            backgroundColor: "#ff6b6b",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            border: "2px solid white",
                          }}
                        >
                          {quantity}
                        </span>
                      </button>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button
                        onClick={() => setIsCanvasOpen(true)}
                        type="button"
                        className="tp-header-action-btn tp-offcanvas-open-btn"
                        style={{
                          backgroundColor: "#667eea",
                          color: "white",
                          borderRadius: "8px",
                          padding: "0.55rem",
                          border: "none",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#764ba2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#667eea";
                        }}
                      >
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div
              className="container"
              style={{
                background: "white",
                borderRadius: "16px",
                marginTop: "1rem",
                boxShadow: "0 2px 12px rgba(102, 126, 234, 0.08)",
                border: "1px solid rgba(102, 126, 234, 0.12)",
              }}
            >
              <div className="tp-mega-menu-wrapper p-relative">
                <div
                  className="row align-items-center"
                  style={{ padding: "0.75rem 1rem" }}
                >
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <button
                        onClick={() => setIsCategoryActive(!isCategoryActive)}
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          padding: "0.85rem 1.5rem",
                          fontWeight: "600",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: "0.75rem",
                          width: "100%",
                        }}
                        className="tp-category-menu-btn tp-category-menu-toggle"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 16px rgba(102, 126, 234, 0.35)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(102, 126, 234, 0.25)";
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
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
                  <div className="col-xl-9 col-lg-9">
                    <div className="main-menu menu-style-1">
                      <nav
                        className="tp-main-menu-content"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
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
        style={{
          backgroundColor: "white",
          boxShadow: sticky ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div
              className="row align-items-center"
              style={{ padding: "0.5rem 0" }}
            >
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "50px",
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
                <div
                  className="tp-header-action d-flex align-items-center justify-content-end"
                  style={{
                    gap: "0.5rem",
                  }}
                >
                  <a
                    href="tel:96181342284"
                    className="tp-header-contact d-none d-lg-flex align-items-center justify-content-end"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #e2e8f0",
                      marginRight: "1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#667eea";
                      e.currentTarget.style.borderColor = "#667eea";
                      e.currentTarget.querySelector(
                        ".tp-header-contact-content"
                      ).style.color = "white";
                      e.currentTarget.querySelector(
                        ".tp-header-contact-icon svg"
                      ).style.fill = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.querySelector(
                        ".tp-header-contact-content"
                      ).style.color = "black";
                      e.currentTarget.querySelector(
                        ".tp-header-contact-icon svg"
                      ).style.fill = "currentColor";
                    }}
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
                        fontWeight: "600",
                        fontSize: "0.95rem",
                        marginLeft: "0.5rem",
                        transition: "color 0.3s ease",
                      }}
                      className="tp-header-contact-content"
                    >
                      <div>81-342284</div>
                    </div>
                  </a>
                  <div className="tp-header-action-item">
                    <button
                      onClick={() => dispatch(openCartMini())}
                      type="button"
                      className="tp-header-action-btn cartmini-open-btn"
                      style={{
                        position: "relative",
                        backgroundColor: "#667eea",
                        color: "white",
                        borderRadius: "8px",
                        padding: "0.55rem",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#764ba2";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(102, 126, 234, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#667eea";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Cart />
                      <span
                        className="tp-header-action-badge"
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-5px",
                          backgroundColor: "#ff6b6b",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: "700",
                          border: "2px solid white",
                        }}
                      >
                        {quantity}
                      </span>
                    </button>
                  </div>
                  <div className="tp-header-action-item d-lg-none">
                    <button
                      onClick={() => setIsCanvasOpen(true)}
                      type="button"
                      className="tp-header-action-btn tp-offcanvas-open-btn"
                      style={{
                        backgroundColor: "#667eea",
                        color: "white",
                        borderRadius: "8px",
                        padding: "0.55rem",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#764ba2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#667eea";
                      }}
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
