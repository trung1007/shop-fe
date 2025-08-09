"use client";
import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import { getListCategories } from "@/services/productService";

const ListCollection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListCategories();

        // Fake thêm dữ liệu bằng cách nhân bản
        const fakeData = Array(4)
          .fill(data)
          .flat();

        setCategories(fakeData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[white] rounded-lg mx-[64px] mt-[60px]">
      <div className="grid grid-cols-8 divide-x divide-y divide-gray-200">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`
        ${((index + 1) % 8 === 0) ? "border-r-0" : ""}
      `}
          >
            <CollectionCard img={item?.img} name={item?.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCollection;
