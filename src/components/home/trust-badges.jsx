"use client";
import {
  FaAward,
  FaCreditCard,
  FaHeadset,
  FaShieldAlt,
  FaTruck,
  FaUndo,
} from "react-icons/fa";

const TrustBadges = () => {
  const badges = [
    // {
    //   icon: <FaShieldAlt size={40} />,
    //   title: "Secure Shopping",
    //   description: "100% Secure Payments",
    //   color: "#10b981",
    // },
    {
      icon: <FaTruck size={40} />,
      title: "Fast Delivery",
      description: "Quick & Reliable Shipping",
      color: "#3b82f6",
    },
    {
      icon: <FaHeadset size={40} />,
      title: "Support",
      description: "Always Here to Help",
      color: "#8b5cf6",
    },
    {
      icon: <FaUndo size={40} />,
      title: "Easy Returns",
      description: "Hassle-Free Returns",
      color: "#f59e0b",
    },
    // {
    //   icon: <FaCreditCard size={40} />,
    //   title: "Flexible Payment",
    //   description: "Multiple Payment Options",
    //   color: "#ec4899",
    // },
    {
      icon: <FaAward size={40} />,
      title: "Quality Assured",
      description: "Premium Products Only",
      color: "#ef4444",
    },
  ];

  return (
    <section
      className="trust-badges-area py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row text-center">
          <div className="col-12 mb-4">
            <h2
              className="section-title mb-2"
              style={{ fontSize: "2rem", fontWeight: "700" }}
            >
              Why Choose Cuideo Bassil Home?
            </h2>
            <p className="text-muted">
              Your trusted partner for home appliances and electronics
            </p>
          </div>
        </div>
        <div className="row g-4">
          {badges.map((badge, index) => (
            <div key={index} className="col-6 col-md-6 col-lg-3">
              <div
                className="trust-badge-item text-center p-3 h-100"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = badge.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  className="badge-icon mb-3"
                  style={{
                    color: badge.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {badge.icon}
                </div>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  {badge.title}
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
