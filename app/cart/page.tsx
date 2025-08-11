"use client"

import NoProductInCart from "@/components/ui/NoProductInCart";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {

  const router = useRouter()
  const continueBuy = ()=>{
    router.push("/")
  }

  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center py-10 px-4 bg-gray-50">
      <NoProductInCart onClick={continueBuy} />
    </div>
  );
};

export default CartPage;
