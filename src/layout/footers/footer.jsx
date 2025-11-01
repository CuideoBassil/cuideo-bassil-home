"use client";
import Image from "next/image";
import Link from "next/link";
// internal
import social_data from "@/data/social-data";
import { Location } from "@/svg";
import logo from "@assets/img/logo/logo.png";

const Footer = ({
  style_2 = false,
  style_3 = false,
  primary_style = false,
}) => {
  return (
    <footer>
      <div
        className={`tp-footer-area ${
          primary_style
            ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6"
            : ""
        } ${
          style_2
            ? "tp-footer-style-2"
            : style_3
            ? "tp-footer-style-2 tp-footer-style-3"
            : ""
        }`}
        data-bg-color={`${style_2 ? "footer-bg-white" : "footer-bg-grey"}`}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />

        <div
          className="tp-footer-top pt-25"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-20">
                  <div className="tp-footer-widget-content">
                    <div
                      className="tp-footer-logo"
                      style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "12px",
                        marginBottom: "1.5rem",
                        display: "inline-block",
                      }}
                    >
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
                    <p
                      className="tp-footer-desc"
                      style={{
                        color: "white",
                        fontSize: "0.95rem",
                        lineHeight: "1.7",
                        marginBottom: "1.5rem",
                        opacity: 0.9,
                      }}
                    >
                      A home where international brands took hold, delighted by
                      the best quality service in the area.
                    </p>
                    <div
                      className="tp-footer-social"
                      style={{ display: "flex", gap: "1rem" }}
                    >
                      {social_data.map((s) => (
                        <a
                          href={s.link}
                          key={s.id}
                          target="_blank"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.color = "#667eea";
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255, 255, 255, 0.2)";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <i className={s.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                {/* <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">My Account</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="#">Track Orders</a>
                      </li>
                      <li>
                        <a href="#">Shipping</a>
                      </li>
                      <li>
                        <a href="#">Wishlist</a>
                      </li>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="#">Order History</a>
                      </li>
                      <li>
                        <a href="#">Returns</a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                {/* <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Information</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="#">Our Story</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Latest News</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-20">
                  <h4
                    className="tp-footer-widget-title"
                    style={{
                      color: "white",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      marginBottom: "1.5rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Talk To Us
                  </h4>
                  <div className="tp-footer-widget-content">
                    <div
                      className="tp-footer-talk mb-20"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        padding: "1.25rem",
                        borderRadius: "12px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "0.875rem",
                          display: "block",
                          marginBottom: "0.5rem",
                          opacity: 0.9,
                        }}
                      >
                        Got Questions? Call us
                      </span>
                      <h4>
                        <a
                          href="tel:96181342284"
                          style={{
                            color: "white",
                            textDecoration: "none",
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.8";
                            e.currentTarget.style.textDecoration = "underline";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                            e.currentTarget.style.textDecoration = "none";
                          }}
                        >
                          81-342284
                        </a>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div
                          className="tp-footer-contact-icon"
                          style={{
                            marginRight: "1rem",
                            color: "white",
                          }}
                        >
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://maps.app.goo.gl/4suRFSc5GmxwDPmW6"
                              target="_blank"
                              style={{
                                color: "white",
                                textDecoration: "none",
                                lineHeight: "1.7",
                                fontSize: "0.95rem",
                                opacity: 0.9,
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "1";
                                e.currentTarget.style.textDecoration =
                                  "underline";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "0.9";
                                e.currentTarget.style.textDecoration = "none";
                              }}
                            >
                              Okaibe, sea side road <br /> Facing Byblos bank
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tp-footer-bottom"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="container">
            <div
              className="tp-footer-bottom-wrapper"
              style={{ paddingBottom: "10px", paddingTop: "20px" }}
            >
              <div className="row align-items-center">
                <div className="tp-footer-copyright">
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      fontSize: "0.95rem",
                      opacity: 0.9,
                      margin: 0,
                    }}
                  >
                    © {new Date().getFullYear()} All Rights Reserved | Cuideo
                    Bassil Home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
