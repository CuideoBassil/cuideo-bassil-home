import { useRouter } from "next/navigation";

const ResetButton = ({ shop_right = false, setPriceValues, maxPrice }) => {
  const router = useRouter();

  const handleReset = () => {
    // setPriceValues([0, maxPrice]);
    router.push(`/${shop_right ? "shop-right-sidebar" : "shop"}`);
  };
  return (
    <div className="tp-shop-widget mb-50">
      <button
        onClick={handleReset}
        className="tp-btn"
        style={{
          width: "100%",
          padding: "0.875rem 1.5rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#764ba2";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(102, 126, 234, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#667eea";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default ResetButton;
