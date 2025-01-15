import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import Footer from "@/layout/footers/footer";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Shop Page",
};

export default function ShopPage() {
  return (
    <Wrapper>
      {/* <HeaderTwo style_2={true} /> */}
      <ShopBreadcrumb title="Shop Grid" subtitle="Shop Grid" />
      <ShopArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
}
