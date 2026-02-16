import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// internal
import MobileCategory from "@/layout/headers/header-com/mobile-category";
import social_data from "@/data/social-data";
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/logo.png";
import HeaderSearchForm from "../forms/header-search-form";
import MobileMenus from "./mobile-menus";

const OffCanvas = ({
  isOffCanvasOpen,
  setIsCanvasOpen,
  categoryType = "all",
}) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  return (
    <>
      <div
        className={`offcanvas__area offcanvas__radius ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
      >
        <div className="offcanvas__wrapper" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="offcanvas__close">
            <button
              onClick={() => setIsCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <CloseTwo />
            </button>
          </div>
          <div className="offcanvas__content" style={{ flex: 1 }}>
            <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/" onClick={() => setIsCanvasOpen(false)}>
                  <Image
                    src={logo}
                    alt="logo"
                    width={200}
                    height={100}
                    style={{
                      objectFit: "contain",
                      maxWidth: "160px",
                      height: "auto",
                    }}
                  />
                </Link>
              </div>
            </div>
            <div className="mb-20">
              <HeaderSearchForm setIsCanvasOpen={setIsCanvasOpen} />
            </div>
            <div className="offcanvas__category pb-20">
              <button
                onClick={() => setIsCategoryActive(!isCategoryActive)}
                className="tp-offcanvas-category-toggle"
              >
                <i className="fa-solid fa-bars"></i>
                All Categories
              </button>
              <div className="tp-category-mobile-menu">
                <nav
                  className={`tp-category-menu-content ${
                    isCategoryActive ? "active" : ""
                  }`}
                >
                  <MobileCategory
                    categoryType={categoryType}
                    isCategoryActive={isCategoryActive}
                    setIsCategoryActive={setIsCategoryActive}
                    setIsCanvasOpen={setIsCanvasOpen}
                  />
                </nav>
              </div>
            </div>
            <div className="tp-main-menu-mobile fix d-lg-none mb-30">
              <MobileMenus setIsCanvasOpen={setIsCanvasOpen} />
            </div>
          </div>
          <div className="offcanvas__bottom-contact" style={{ padding: "20px 24px", borderTop: "1px solid #ECEEF0" }}>
            <a
              href="tel:96181342284"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#1A1D21",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <i className="fa-solid fa-phone" style={{ color: "var(--tp-theme-primary)" }}></i>
              81-342284
            </a>
            <div style={{ display: "flex", gap: "12px" }}>
              {social_data.map((s) => (
                <a
                  href={s.link}
                  key={s.id}
                  target="_blank"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#F5F6F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4A4F56",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default OffCanvas;
