import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Contact Page",
};

export default function ContactPage() {
  return (
    <Wrapper>
      {/* <HeaderTwo style_2={true} /> */}
      <ContactBreadcrumb />
      <ContactArea />
      <ContactMap />
      {/* <Footer primary_style={true} /> */}
    </Wrapper>
  );
}
