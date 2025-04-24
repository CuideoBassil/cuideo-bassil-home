import ProductDetailsArea from "@/components/product-details/product-details-area";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Product Details Page",
};

export default function ProductDetailsPage({ params }) {
  return (
    <Wrapper>
      {params ?? id ? <ProductDetailsArea id={params?.id} /> : <></>}
    </Wrapper>
  );
}
