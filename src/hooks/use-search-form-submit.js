"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText) {
      let route = `/shop?search=${searchText}`;

      // if (category && category !== "Select Category") {
      //   route += `&productType=${category}`;
      //   setCategory("");
      // }

      router.push(route);
      setSearchText("");
    } else {
      router.push(`/`);
      setSearchText("");
      setCategory("");
    }
  };

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
