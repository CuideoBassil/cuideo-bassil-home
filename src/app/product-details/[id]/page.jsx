import ProductDetailsArea from "@/components/product-details/product-details-area";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Product Details Page",
};

export default function ProductDetailsPage({ params }) {
  const id = params?.id;
  return <Wrapper>{id ? <ProductDetailsArea id={id} /> : <></>}</Wrapper>;
}
