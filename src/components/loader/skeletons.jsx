"use client";

/**
 * Loading skeleton for product cards
 */
export const ProductSkeleton = () => {
  return (
    <div className="tp-product-item" style={{ height: "100%" }}>
      <div
        className="skeleton-box"
        style={{
          height: "260px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div className="tp-product-content" style={{ padding: "1rem 0" }}>
        <div
          className="skeleton-box"
          style={{
            height: "16px",
            width: "60%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          className="skeleton-box"
          style={{
            height: "20px",
            width: "90%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: "0.1s",
          }}
        />
        <div
          className="skeleton-box"
          style={{
            height: "16px",
            width: "40%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Loading skeleton for product grid
 */
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="row">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-xl-3 col-lg-4 col-sm-6">
          <ProductSkeleton />
        </div>
      ))}
    </div>
  );
};

/**
 * Loading skeleton for cart items
 */
export const CartItemSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      <div
        className="skeleton-box"
        style={{
          width: "70px",
          height: "60px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          className="skeleton-box"
          style={{
            height: "16px",
            width: "80%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          className="skeleton-box"
          style={{
            height: "14px",
            width: "40%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: "0.1s",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Loading skeleton for banner
 */
export const BannerSkeleton = () => {
  return (
    <div
      className="skeleton-box"
      style={{
        height: "300px",
        backgroundColor: "#f0f0f0",
        borderRadius: "12px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * General content skeleton
 */
export const ContentSkeleton = ({ lines = 3, height = "16px" }) => {
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-box"
          style={{
            height,
            width: i === lines - 1 ? "60%" : "100%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};
