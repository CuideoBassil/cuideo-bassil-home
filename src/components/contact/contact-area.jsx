"use client";
import ContactForm from "../forms/contact-form";

const ContactArea = () => {
  return (
    <section className="tp-contact-area" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <div className="container">
        <div className="row" style={{ gap: "0" }}>
          <div className="col-xl-8 col-lg-7">
            <div
              className="tp-contact-wrapper"
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #ECEEF0",
                padding: "36px 40px",
                marginBottom: "20px",
              }}
            >
              <h3
                className="tp-contact-title"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "6px",
                  color: "#1A1D21",
                }}
              >
                Send Us a Message
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "28px" }}>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="tp-contact-form">
                <ContactForm />
                <p className="ajax-response"></p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #ECEEF0",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(9, 137, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    color: "var(--tp-theme-primary)",
                    fontSize: "18px",
                  }}
                >
                  <i className="fa-solid fa-phone"></i>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1A1D21", marginBottom: "8px" }}>
                  Phone
                </h4>
                <a
                  href="tel:96181342284"
                  style={{
                    fontSize: "15px",
                    color: "#4A4F56",
                    textDecoration: "none",
                  }}
                >
                  81-342284
                </a>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #ECEEF0",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(9, 137, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    color: "var(--tp-theme-primary)",
                    fontSize: "18px",
                  }}
                >
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1A1D21", marginBottom: "8px" }}>
                  Address
                </h4>
                <a
                  href="https://maps.app.goo.gl/4suRFSc5GmxwDPmW6"
                  target="_blank"
                  style={{
                    fontSize: "15px",
                    color: "#4A4F56",
                    textDecoration: "none",
                    lineHeight: "1.6",
                    display: "block",
                  }}
                >
                  Okaibe, sea side road<br />Facing Byblos bank
                </a>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #ECEEF0",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(9, 137, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    color: "var(--tp-theme-primary)",
                    fontSize: "18px",
                  }}
                >
                  <i className="fa-solid fa-share-nodes"></i>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1A1D21", marginBottom: "12px" }}>
                  Follow Us
                </h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href="https://www.facebook.com/Cuideobassil"
                    target="_blank"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: "#F5F6F8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4A4F56",
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/cuideobassilhome"
                    target="_blank"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: "#F5F6F8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4A4F56",
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
