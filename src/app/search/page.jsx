import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SearchArea from "@/components/search/search-area";
import Wrapper from "@/layout/wrapper";

export const metadata = {
  title: "Cuideo Bassil Home - Search Page",
};

export default function SearchPage() {
  return (
    <Wrapper>
      {/* <HeaderTwo style_2={true} /> */}
      <CommonBreadcrumb title="Search Products" subtitle="Search Products" />
      <SearchArea />
      {/* <Footer primary_style={true} /> */}
    </Wrapper>
  );
}
