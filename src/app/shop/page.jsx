import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import Wrapper from "@/layout/wrapper";
import dynamic from "next/dynamic";

// Lazy load shop area and WhatsApp button
const ShopArea = dynamic(() => import("@/components/shop/shop-area"), {
  loading: () => <div style={{ minHeight: "600px" }} />,
});
const WhatsAppButton = dynamic(() =>
  import("@/components/whatsaap/WhatsAppButton")
);

export const metadata = {
  title: "Cuideo Bassil Home - Shop Page",
};

export default function ShopPage() {
  return (
    <>
      <Wrapper>
        <ShopBreadcrumb title="Explore Best Products" subtitle="Explore" />
        <ShopArea />
      </Wrapper>
      <WhatsAppButton />
    </>
  );
}
