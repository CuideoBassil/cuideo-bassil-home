import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import Wrapper from "@/layout/wrapper";
import dynamic from "next/dynamic";

// Lazy load cart area
const CartArea = dynamic(() => import("@/components/cart-wishlist/cart-area"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

export const metadata = {
  title: "Cuideo Bassil Home - Cart Page",
};

export default function CartPage() {
  return (
    <Wrapper>
      <CommonBreadcrumb title="Shopping Cart" subtitle="Shopping Cart" />
      <CartArea />
    </Wrapper>
  );
}
