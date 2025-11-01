"use client";
import { feature_data } from "./feature-area-2";

const FeatureArea = () => {
  return (
    <section
      className="tp-feature-area tp-feature-border-radius pb-70 mt-2"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row gx-3 gy-3 gy-xl-0">
          {feature_data.map((item, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div
                className="tp-feature-item d-flex align-items-start"
                style={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }}
              >
                <div
                  className="tp-feature-icon mr-15"
                  style={{
                    minWidth: "50px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  }}
                >
                  <span style={{ fontSize: "2.5rem" }}>{item.icon}</span>
                </div>
                <div className="tp-feature-content">
                  <h3
                    className="tp-feature-title"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                      color: "#212529",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.title === "Find Us On" ? (
                    <div style={{ fontSize: "0.9rem" }}>
                      <a
                        href="https://www.instagram.com/cuideobassilhome"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#667eea",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#764ba2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#667eea";
                        }}
                      >
                        Instagram
                      </a>
                      {" • "}
                      <a
                        href="https://www.facebook.com/Cuideobassil"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#667eea",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#764ba2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#667eea";
                        }}
                      >
                        Facebook
                      </a>
                    </div>
                  ) : (
                    <p
                      style={{
                        marginBottom: "0",
                        fontSize: "0.9rem",
                        color: "#6c757d",
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureArea;
