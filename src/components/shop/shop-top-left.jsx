const ShopTopLeft = ({ total, showing = 9 }) => {
  return (
    <>
      <div className="tp-shop-top-left d-flex align-items-center">
        <div
          className="tp-shop-top-result"
          style={{
            padding: "0.75rem 1.25rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: "#495057",
              fontWeight: "500",
            }}
          >
            Showing <strong style={{ color: "#667eea" }}>1–{showing}</strong> of{" "}
            <strong style={{ color: "#667eea" }}>{total}</strong> results
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopTopLeft;
