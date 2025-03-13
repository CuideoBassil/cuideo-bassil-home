import BannerArea from "@/components/banner/banner-area";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import ProductArea from "@/components/products/electronics/product-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import WhatsAppButton from "@/components/whatsaap/WhatsAppButton";
import Wrapper from "@/layout/wrapper";

export default function HomePage() {
  return (
    <>
      <Wrapper>
        {/* <ComingSoon /> */}
        <HomeHeroSlider />
        <FeatureArea />
        <NewArrivals />
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
