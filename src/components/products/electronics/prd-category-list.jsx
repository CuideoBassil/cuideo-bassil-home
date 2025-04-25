import { useRouter } from "next/navigation";
// internal
import ErrorMsg from "@/components/common/error-msg";
import CategoryListLoader from "@/components/loader/home/category-list-loader";
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";

const PrdCategoryList = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetProductTypeCategoryQuery("electronics");
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/shop?search=${title.toLowerCase()}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <CategoryListLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <li key={item._id}>
        <a
          onClick={() => handleCategoryRoute(item.parent)}
          className="cursor-pointer"
        >
          {item.parent}
        </a>
      </li>
    ));
  }
  return <ul>{content}</ul>;
};

export default PrdCategoryList;
