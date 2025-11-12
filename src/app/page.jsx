import BannerArea from "@/components/banner/banner-area";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import CategoriesList from "@/components/products/electronics/categories";
import ProductArea from "@/components/products/electronics/product-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import WhatsAppButton from "@/components/whatsaap/WhatsAppButton";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Premium Home Appliances & Electronics",
  description:
    "Shop the latest home appliances and electronics. Browse our wide selection of quality products with competitive prices and fast delivery.",
  openGraph: {
    title: "Cuideo Bassil Home - Premium Home Appliances & Electronics",
    description:
      "Shop the latest home appliances and electronics with competitive prices.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Wrapper>
        {/* <ComingSoon /> */}
        <HomeHeroSlider />
        <FeatureArea />
        {/* <NewArrivals /> */}
        <CategoriesList />
        <BannerArea />
        <ProductArea />
        <ProductBanner />
        {/* <ElectronicCategory /> */}
        {/* <ProductGadgetArea /> */}
        {/* <OfferProducts /> */}
        {/* <ProductSmArea /> */}
        {/* <BlogArea/> */}
        {/* <InstagramArea /> */}
        {/* <CtaArea /> */}
      </Wrapper>
      <WhatsAppButton />
    </>
  );
}
