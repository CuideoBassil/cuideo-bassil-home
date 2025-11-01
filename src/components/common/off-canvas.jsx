import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// internal
import MobileCategory from "@/layout/headers/header-com/mobile-category";
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
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive);
    setIsCurrencyActive(false);
  };
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive);
    setIsLanguageActive(false);
  };

  return (
    <>
      <div
        className={`offcanvas__area offcanvas__radius ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
        style={{
          background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="offcanvas__wrapper">
          <div
            className="offcanvas__close"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setIsCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#667eea",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.95)";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <CloseTwo />
            </button>
          </div>
          <div
            className="offcanvas__content"
            style={{
              padding: "1rem",
              paddingTop: "3.5rem",
            }}
          >
            {/* Logo */}
            <div className="offcanvas__top mb-3">
              <div
                className="offcanvas__logo logo"
                style={{
                  backgroundColor: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  display: "inline-block",
                }}
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    width={300}
                    height={110}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div
              className="mb-3"
              style={{
                backgroundColor: "white",
                padding: "0",
                borderRadius: "10px",
              }}
            >
              <HeaderSearchForm setIsCanvasOpen={setIsCanvasOpen} />
            </div>

            {/* All Categories Button */}
            <div className="mb-3">
              <button
                onClick={() => setIsCategoryActive(!isCategoryActive)}
                style={{
                  backgroundColor: "white",
                  color: "#667eea",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.85rem 1rem",
                  width: "100%",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="tp-offcanvas-category-toggle"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <i
                    className="fa-solid fa-bars"
                    style={{ fontSize: "1rem" }}
                  ></i>
                  <span>All Categories</span>
                </div>
              </button>

              {/* Category Dropdown */}
              {isCategoryActive && (
                <div className="tp-category-mobile-menu">
                  <nav
                    className="tp-category-menu-content active"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      marginTop: "0.5rem",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <MobileCategory
                      categoryType={categoryType}
                      isCategoryActive={isCategoryActive}
                      setIsCategoryActive={setIsCategoryActive}
                      setIsCanvasOpen={setIsCanvasOpen}
                    />
                  </nav>
                </div>
              )}
            </div>

            {/* Main Menu */}
            <div
              className="tp-main-menu-mobile fix d-lg-none"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "0.75rem 0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MobileMenus setIsCanvasOpen={setIsCanvasOpen} />
            </div>

            {/* <div className="offcanvas__contact align-items-center d-none">
              <div className="offcanvas__contact-icon mr-20">
                <span>
                  <Image src={contact_img} alt="contact_img" />
                </span>
              </div>
              <div className="offcanvas__contact-content">
                <h3 className="offcanvas__contact-title">
                  <a href="tel:098-852-987">004524865</a>
                </h3>
              </div>
            </div> */}
            {/* <div className="offcanvas__btn">
              <Link href="/contact" className="tp-btn-2 tp-btn-border-2">
                Contact Us
              </Link>
            </div> */}
          </div>
          {/* <div className="offcanvas__bottom">
            <div className="offcanvas__footer d-flex align-items-center justify-content-between">
              <div className="offcanvas__currency-wrapper currency">
                <span
                  onClick={handleCurrencyActive}
                  className="offcanvas__currency-selected-currency tp-currency-toggle"
                  id="tp-offcanvas-currency-toggle"
                >
                  Currency : USD
                </span>
                <ul
                  className={`offcanvas__currency-list tp-currency-list ${
                    isCurrencyActive ? "tp-currency-list-open" : ""
                  }`}
                >
                  <li>USD</li>
                  <li>ERU</li>
                  <li>BDT </li>
                  <li>INR</li>
                </ul>
              </div>
              <div className="offcanvas__select language">
                <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                  <div className="offcanvas__lang-img mr-15">
                    <Image src={language_img} alt="language-flag" />
                  </div>
                  <div className="offcanvas__lang-wrapper">
                    <span
                      onClick={handleLanguageActive}
                      className="offcanvas__lang-selected-lang tp-lang-toggle"
                      id="tp-offcanvas-lang-toggle"
                    >
                      English
                    </span>
                    <ul
                      className={`offcanvas__lang-list tp-lang-list ${
                        isLanguageActive ? "tp-lang-list-open" : ""
                      }`}
                    >
                      <li>Spanish</li>
                      <li>Portugese</li>
                      <li>American</li>
                      <li>Canada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* body overlay start */}
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;
