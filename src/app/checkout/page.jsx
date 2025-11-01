import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import Wrapper from "@/layout/wrapper";
import dynamic from "next/dynamic";

// Lazy load checkout area
const CheckoutArea = dynamic(
  () => import("@/components/checkout/checkout-area"),
  {
    loading: () => <div style={{ minHeight: "500px" }} />,
  }
);

export const metadata = {
  title: "Cuideo Bassil Home - Checkout Page",
};

export default function CheckoutPage() {
  return (
    <Wrapper>
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} />
      <CheckoutArea />
    </Wrapper>
  );
}
