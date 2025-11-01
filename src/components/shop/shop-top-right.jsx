import { useDispatch } from "react-redux";
// internal
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end gap-3">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={[
            { value: "default", text: "Default Sorting" },
            { value: "LTH", text: "Low to High" },
            { value: "HTL", text: "High to Low" },
          ]}
          defaultCurrent={0}
          onChange={selectHandleFilter}
          name="Default Sorting"
        />
      </div>
      <div className="tp-shop-top-filter">
        <button
          onClick={() => dispatch(handleFilterSidebarOpen())}
          type="button"
          className="tp-filter-btn"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.95rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
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
          <span>
            <Filter />
          </span>
          Filter
        </button>
      </div>
    </div>
  );
};

export default ShopTopRight;
