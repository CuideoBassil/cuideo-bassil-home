import BannerArea from "@/components/banner/banner-area";
import BackToTopCom from "@/components/common/back-to-top";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import TrustBadges from "@/components/home/trust-badges";
import CategoriesList from "@/components/products/electronics/categories";
import ProductArea from "@/components/products/electronics/product-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import WhatsAppButton from "@/components/whatsaap/WhatsAppButton";
import Wrapper from "@/layout/wrapper";

export default function HomePage() {
  return (
    <>
      <Wrapper>
        {/* Hero Section - Eye-catching first impression */}
        <HomeHeroSlider />

        {/* Trust Signals - Build credibility immediately */}
        <FeatureArea />

        {/* Category Navigation - Help users find what they need */}
        <CategoriesList />

        {/* Main Product Showcase - Core catalog display */}
        <ProductArea />

        {/* Featured Deals - Show promotions early */}
        <BannerArea />

        {/* Trust Badges - Build confidence */}
        <TrustBadges />

        {/* Secondary Banner - Additional promotion opportunity */}
        <ProductBanner />

        {/* Future sections for enhanced UX - Uncomment when ready */}
        {/* <NewArrivals /> - Show latest products */}
        {/* <ElectronicCategory /> - Category-specific highlights */}
        {/* <ProductGadgetArea /> - Tech accessories section */}
        {/* <OfferProducts /> - Special offers section */}
        {/* <ProductSmArea /> - Small product highlights */}
        {/* <BlogArea /> - Content marketing section */}
        {/* <InstagramArea /> - Social proof & engagement */}
        {/* <CtaArea /> - Final conversion push */}
      </Wrapper>

      {/* Fixed UI Elements */}
      <WhatsAppButton />
      <BackToTopCom />
    </>
  );
}
