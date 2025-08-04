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
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <div className="grid grid-cols-4 divide-x divide-gray-300 border border-gray-300 ">
      {categories.map((item, index) => (
        <CollectionCard
          key={index}
          img={item?.img}
          code={item?.code}
        />
      ))}
    </div>
  );
};

export default ListCollection;
