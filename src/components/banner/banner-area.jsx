"use client";
// internal
import { useGetFeaturedBySectionQuery } from "@/redux/features/featuredApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ErrorMsg from "../common/error-msg";
import { HomeTwoPrdLoader } from "../loader";

const BannerArea = () => {
  const router = useRouter();

  // banner item
  function BannerItem({ id, bg, title, description, img, discounted, price }) {
    return (
      <div
        className="tp-banner-item h-full flex flex-col justify-between p-relative mb-25 z-index-1 fix"
        style={{
          height: "100%",
          alignItems: "center",
          backgroundColor: bg,
          borderRadius: "15px",
          cursor: "pointer",
          padding: "2rem",
          transition: "all 0.3s ease",
          border: "2px solid transparent",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={() => {
          router.push(id ? `/product-details/${id}` : "/shop");
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
          }}
        />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 w-100">
          <div
            className="text-center text-md-start"
            style={{ flex: 1, zIndex: 1 }}
          >
            <h3
              className="tp-slider-title"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "black",
                fontWeight: "800",
                marginBottom: "1rem",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h3>

            <div
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                color: "#333",
                marginBottom: "1.5rem",
                lineHeight: "1.5",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="tp-product-banner-price mb-3">
              {price && (
                <span
                  className="old-price"
                  style={{
                    color: "#6c757d",
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    textDecoration: discounted ? "line-through" : "none",
                    fontWeight: "500",
                  }}
                >
                  ${price}
                </span>
              )}
              {discounted && (
                <span
                  className="new-price ms-3"
                  style={{
                    color: "#ff6b6b",
                    fontWeight: "900",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  }}
                >
                  ${discounted}
                </span>
              )}
            </div>
            <button
              style={{
                backgroundColor: "#212529",
                color: "white",
                padding: "0.8rem 2rem",
                border: "none",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#667eea";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#212529";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              View Details →
            </button>
          </div>
          <div className="text-center" style={{ flex: 1, zIndex: 1 }}>
            {img && (
              <Image
                width={480}
                height={480}
                src={img}
                alt="banner-product"
                className="img-fluid"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05) rotate(2deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  const {
    data: featured,
    isError,
    isLoading,
  } = useGetFeaturedBySectionQuery(2);
  let content = null;

  if (isLoading) content = <HomeTwoPrdLoader loading={isLoading} />;
  if (!isLoading && isError) content = <ErrorMsg msg="There was an error" />;
  if (!isLoading && !isError && featured?.data?.length === 0)
    content = <ErrorMsg msg="No Featured found!" />;

  if (!isLoading && !isError && featured?.data?.length > 0) {
    return (
      <section
        className="tp-banner-area pb-50"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="container">
          {/* Section Title */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              <span
                style={{
                  color: "#667eea",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Limited Time Offers
              </span>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#212529",
                  marginBottom: "0.5rem",
                }}
              >
                Featured Deals
              </h3>
              <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                Don't miss out on these amazing offers!
              </p>
            </div>
          </div>

          <div className="row">
            {featured.data.map((item, i) => (
              <div
                key={i}
                style={{ padding: "10px" }}
                className="col-lg-6 col-md-12"
              >
                <BannerItem
                  bg={item.background}
                  title={item.title}
                  price={item.price}
                  discounted={item.discounted}
                  description={item.description}
                  img={item?.img}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default BannerArea;
