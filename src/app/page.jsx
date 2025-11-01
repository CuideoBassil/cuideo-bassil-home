import BackToTopCom from "@/components/common/back-to-top";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import Wrapper from "@/layout/wrapper";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components for better initial load performance
const CategoriesList = dynamic(
  () => import("@/components/products/electronics/categories"),
  {
    loading: () => <div style={{ minHeight: "200px" }} />,
  }
);
const ProductArea = dynamic(
  () => import("@/components/products/electronics/product-area"),
  {
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);
const BannerArea = dynamic(() => import("@/components/banner/banner-area"), {
  loading: () => <div style={{ minHeight: "300px" }} />,
});
const TrustBadges = dynamic(() => import("@/components/home/trust-badges"), {
  loading: () => <div style={{ minHeight: "150px" }} />,
});
const ProductBanner = dynamic(
  () => import("@/components/products/electronics/product-banner"),
  {
    loading: () => <div style={{ minHeight: "250px" }} />,
  }
);
const WhatsAppButton = dynamic(() =>
  import("@/components/whatsaap/WhatsAppButton")
);

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
