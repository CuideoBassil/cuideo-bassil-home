import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import WhatsAppButton from "@/components/whatsaap/WhatsAppButton";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Shop Page",
};

export default function ShopPage() {
  return (
    <>
      <Wrapper>
        {/* <HeaderTwo style_2={true} /> */}
        <ShopBreadcrumb title="Explore Best Products" subtitle="Explore" />
        <ShopArea />
        {/* <Footer primary_style={true} /> */}
      </Wrapper>
      <WhatsAppButton />
    </>
  );
}
