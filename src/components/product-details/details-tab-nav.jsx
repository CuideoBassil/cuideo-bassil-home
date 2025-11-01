"use client";
import { useEffect, useRef } from "react";
import ReviewForm from "../forms/review-form";
import ReviewItem from "./review-item";

const DetailsTabNav = ({ product }) => {
  const { _id, description, additionalInformation, reviews } = product || {};
  const activeRef = useRef(null);
  const marker = useRef(null);
  // handleActive
  const handleActive = (e) => {
    if (e.target.classList.contains("active")) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  };
  useEffect(() => {
    if (activeRef.current?.classList.contains("active")) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, []);
  // nav item
  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={(e) => handleActive(e)}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.125rem",
          fontWeight: "600",
          color: active ? "#667eea" : "#4a5568",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.color = "#667eea";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.color = "#4a5568";
          }
        }}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div
            className="nav nav-tabs justify-content-center p-relative tp-product-tab"
            id="navPresentationTab"
            role="tablist"
            style={{
              borderBottom: "2px solid #e2e8f0",
              marginBottom: "2rem",
            }}
          >
            <NavItem
              active={true}
              linkRef={activeRef}
              id="desc"
              title="Description"
            />
            <NavItem id="review" title={`Reviews (${reviews?.length})`} />

            <span
              ref={marker}
              id="productTabMarker"
              className="tp-product-details-tab-line"
              style={{
                height: "3px",
                backgroundColor: "#667eea",
                position: "absolute",
                bottom: "-2px",
                transition: "all 0.3s ease",
              }}
            ></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div
            className="tab-pane fade show active"
            id="nav-desc"
            role="tabpanel"
            aria-labelledby="nav-desc-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div
                    className="tp-product-details-desc-item"
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "2rem",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div
                          className="tp-product-details-desc-content"
                          style={{
                            fontSize: "1rem",
                            lineHeight: "1.8",
                            color: "#4a5568",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* review */}
          <div
            className="tab-pane fade"
            id="nav-review"
            role="tabpanel"
            aria-labelledby="nav-review-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-review-wrapper pt-60">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tp-product-details-review-statics">
                    <div className="tp-product-details-review-list pr-110">
                      <h3
                        className="tp-product-details-review-title"
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#2d3748",
                          marginBottom: "1.5rem",
                          paddingBottom: "0.75rem",
                          borderBottom: "2px solid #667eea",
                        }}
                      >
                        Rating & Latest Reviews
                      </h3>
                      {reviews?.length === 0 && (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "2rem",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "12px",
                            color: "#718096",
                          }}
                        >
                          <p style={{ fontSize: "1.125rem", marginBottom: 0 }}>
                            There are no reviews yet. Be the first to review!
                          </p>
                        </div>
                      )}
                      {reviews?.length > 0 &&
                        [...reviews]
                          .reverse()
                          .slice(0, 6)
                          .map((item, index) => (
                            <ReviewItem key={index} review={item} />
                          ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="tp-product-details-review-form"
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "2rem",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h3
                      className="tp-product-details-review-form-title"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#2d3748",
                        marginBottom: "1rem",
                      }}
                    >
                      Review this product
                    </h3>
                    <p
                      style={{
                        color: "#718096",
                        fontSize: "0.875rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Your email address and phone number will not be published.
                      Required fields are marked *
                    </p>
                    {/* form start */}
                    <ReviewForm product_id={_id} />
                    {/* form end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;
