import BannerArea from "@/components/banner/banner-area";
import ElectronicCategory from "@/components/categories/electronic-category";
import ComingSoon from "@/components/coming-soon/coming-soon";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import ProductArea from "@/components/products/electronics/product-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import Wrapper from "@/layout/wrapper";

export default function HomePage() {
  return (
    <Wrapper>
      {/* <ComingSoon /> */}
      {/* <Header /> */}
      <HomeHeroSlider />
      {/* <ElectronicCategory /> */}
      <FeatureArea />
      <ProductArea />
      <BannerArea />
      {/* <OfferProducts /> */}
      {/* <ProductGadgetArea /> */}
      <NewArrivals />
      <ProductBanner />
      {/* <ProductSmArea /> */}
      {/* <BlogArea/> */}
      {/* <InstagramArea /> */}
      {/* <CtaArea /> */}
      {/* <Footer /> */}
    </Wrapper>
  );
}
