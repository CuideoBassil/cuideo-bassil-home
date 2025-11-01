import { mobile_menu } from "@/data/menu-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MobileMenus = (setIsCanvasOpen) => {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveMenu) {
      setIsActiveMenu("");
    } else {
      setIsActiveMenu(title);
    }
  };
  return (
    <>
      <nav className="tp-main-menu-content">
        {mobile_menu.map((menu, i) => (
          <ul key={i} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menu.homes ? (
              <li
                className={`has-dropdown has-mega-menu ${
                  isActiveMenu === menu.title ? "dropdown-opened" : ""
                }`}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <a
                  className={`${isActiveMenu === menu.title ? "expanded" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Home
                  <button
                    onClick={() => handleOpenSubMenu(menu.title)}
                    className={`dropdown-toggle-btn ${
                      isActiveMenu === menu.title ? "dropdown-opened" : ""
                    }`}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#667eea",
                      cursor: "pointer",
                      padding: "0.25rem",
                      transition: "transform 0.3s ease",
                      transform:
                        isActiveMenu === menu.title
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </a>
                <div
                  className={`home-menu tp-submenu tp-mega-menu ${
                    isActiveMenu === menu.title ? "active" : ""
                  }`}
                >
                  <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-5">
                    {menu?.home_pages?.map((home, i) => (
                      <div key={i} className="col">
                        <div className="home-menu-item">
                          <Link href={home.link}>
                            <div className="home-menu-thumb p-relative fix">
                              {home?.img && (
                                <Image src={home?.img} alt="home img" />
                              )}
                            </div>
                            <div className="home-menu-content">
                              <h5 className="home-menu-title">{home.title}</h5>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ) : menu?.sub_menu ? (
              <li
                key={menu.id}
                className={`has-dropdown ${
                  isActiveMenu === menu.title ? "dropdown-opened" : ""
                }`}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <a
                  className={`${isActiveMenu === menu.title ? "expanded" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {menu.title}
                  <button
                    onClick={() => handleOpenSubMenu(menu.title)}
                    className={`dropdown-toggle-btn ${
                      isActiveMenu === menu.title ? "dropdown-opened" : ""
                    }`}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#667eea",
                      cursor: "pointer",
                      padding: "0.25rem",
                      transition: "transform 0.3s ease",
                      transform:
                        isActiveMenu === menu.title
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </a>
                <ul
                  className={`tp-submenu ${
                    isActiveMenu === menu.title ? "active" : ""
                  }`}
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {menu?.sub_menus?.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        borderBottom:
                          i !== menu.sub_menus.length - 1
                            ? "1px solid #e9ecef"
                            : "none",
                      }}
                    >
                      <Link
                        href={b.link}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem 0.75rem 2rem",
                          color: "#555",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li
                key={menu.id}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Link
                  href={menu.link}
                  onClick={() => {
                    setIsCanvasOpen(false);
                  }}
                  style={{
                    display: "block",
                    padding: "0.85rem 1rem",
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {menu.title}
                </Link>
              </li>
            )}
          </ul>
        ))}
      </nav>
    </>
  );
};

export default MobileMenus;
