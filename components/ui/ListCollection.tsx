"use client";
import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import { getPopularSubCategories } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import { useDispatch } from "react-redux";

interface Collection {
  imgUrl: string;
  name: string;
  slug: string;
  rootCategoryKey: string
}

const ListCollection = () => {

  const dispatch = useDispatch()

  const {
    data: subCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "popular-sub"],
    queryFn: async () => {
      const data = await getPopularSubCategories();
      console.log("subCategory", data);

      return data.map((cat: any) => ({
        imgUrl: cat.imgUrl,
        name: cat.subCategoryInfo.name,
        slug: cat.subCategoryInfo.slug,
        rootCategoryKey: cat.categoryName
      }));
    },
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [isLoading, dispatch]);

  return (
    <div className="bg-[white] rounded-lg mt-[60px]">
      <div className="grid grid-cols-8 divide-x divide-y divide-gray-200">
        {subCategories.map((item: Collection, index: any) => (
          <div
            key={index}
            className={`${(index + 1) % 8 === 0 ? "border-r-0" : ""}`}
          >
            <CollectionCard img={item?.imgUrl} name={item?.name} slug={item?.slug} rootCategoryKey={item?.rootCategoryKey} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCollection;
