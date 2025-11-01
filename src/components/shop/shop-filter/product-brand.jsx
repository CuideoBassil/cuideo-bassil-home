import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import ShopBrandLoader from "@/components/loader/shop/shop-brand-loader";
import { useGetActiveBrandsQuery } from "@/redux/features/brandApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const ProductBrand = ({ setCurrPage, shop_right = false }) => {
  const { data: brands, isError, isLoading } = useGetActiveBrandsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  // handle brand route
  const handleBrandRoute = (brand) => {
    setCurrPage(1);
    router.push(
      `/${
        shop_right ? "shop-right-sidebar" : "shop"
      }?brand=${brand.toLowerCase()}`
    );
    dispatch(handleFilterSidebarClose());
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopBrandLoader loading={isLoading} />;
  } else if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!isLoading && !isError && brands?.result?.length === 0) {
    content = <ErrorMsg msg="No Brands found!" />;
  } else if (!isLoading && !isError && brands?.result?.length > 0) {
    const all_brands = brands.result;
    const sortedBrands = all_brands
      .slice()
      .sort((a, b) => b.products.length - a.products.length);
    const brand_items = sortedBrands.slice(0, 6);

    content = brand_items.map((b) => (
      <div
        key={b?._id}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          padding: "1rem",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          backgroundColor: "white",
          transition: "all 0.3s ease",
          flex: "0 0 calc(50% - 0.5rem)",
          marginBottom: "1rem",
        }}
        onClick={() => handleBrandRoute(b.name)}
        className="tp-shop-widget-brand-item"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(102, 126, 234, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
          <Image src={b?.logo} alt="brand" width={70} height={50} />
        </div>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#4a5568",
            textAlign: "center",
          }}
        >
          {b?.name}
        </span>
      </div>
    ));
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3
          className="tp-shop-widget-title"
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #667eea",
            color: "#2d3748",
          }}
        >
          Popular Brands
        </h3>
        <div className="tp-shop-widget-content ">
          <div
            className="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap"
            style={{ gap: "1rem" }}
          >
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBrand;
