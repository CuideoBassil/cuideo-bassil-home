"use client";
// internal
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { Search } from "@/svg";

const HeaderSearchForm = () => {
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();

  // selectHandle
  const selectCategoryHandle = (e) => {
    setCategory(e.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tp-header-search-wrapper d-flex align-items-center">
        <div className="tp-header-search-box">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Search..."
          />
        </div>
        {/* <div className="tp-header-search-category">
          <NiceSelect
            options={[
              { value: "Select Category", text: "Select Category" },
              { value: "electronics", text: "electronics" },
              { value: "fashion", text: "fashion" },
              { value: "beauty", text: "beauty" },
              { value: "jewelry", text: "jewelry" },
            ]}
            defaultCurrent={0}
            onChange={selectCategoryHandle}
            name="Select Category"
          />
        </div> */}
        <div className="tp-header-search-btn">
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchForm;
