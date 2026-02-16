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
      >
        <div className="tp-footer-top pt-50 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div className="tp-footer-widget footer-col-1 mb-30">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo" style={{ marginBottom: "16px" }}>
                      <Link href="/">
                        <Image
                          style={{
                            objectFit: "contain",
                            maxWidth: "180px",
                            height: "auto",
                          }}
                          src={logo}
                          alt="logo"
                          width={700}
                          height={400}
                        />
                      </Link>
                    </div>
                    <p className="tp-footer-desc" style={{ fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>
                      A home where international brands took hold, delighted by
                      the best quality service in the area.
                    </p>
                    <div className="tp-footer-social">
                      {social_data.map((s) => (
                        <a href={s.link} key={s.id} target="_blank">
                          <i className={s.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-30">
                  <h4 className="tp-footer-widget-title">Quick Links</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <Link href="/shop">Shop</Link>
                      </li>
                      <li>
                        <Link href="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link href="/cart">Shopping Cart</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-30">
                  <h4 className="tp-footer-widget-title">Contact Info</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span>Got Questions? Call us</span>
                      <h4>
                        <a href="tel:96181342284">81-342284</a>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://maps.app.goo.gl/4suRFSc5GmxwDPmW6"
                              target="_blank"
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
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="tp-footer-widget footer-col-4 mb-30">
                  <h4 className="tp-footer-widget-title">Visit Our Store</h4>
                  <div className="tp-footer-widget-content">
                    <p style={{ fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                      Come visit us at our physical store for a hands-on
                      experience with our products.
                    </p>
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--tp-theme-primary)",
                        fontWeight: 600,
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      Get Directions
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
              <div className="row align-items-center">
                <div className="tp-footer-copyright">
                  <p style={{ width: "100%", textAlign: "center", fontSize: "13px" }}>
                    &copy; {new Date().getFullYear()} Cuideo Bassil Home. All Rights Reserved.
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
