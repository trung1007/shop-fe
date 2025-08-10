import Banner from "@/components/ui/Banner";
import GroupProduct from "@/components/ui/GroupProduct";
import ListCollection from "@/components/ui/ListCollection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-[var(--color-bg)] pb-[60px] " >
      <Banner />
      <div className="px-[64px]">
        <ListCollection />

      </div>
      <GroupProduct groupTitle="Gợi ý hôm nay" />
      <GroupProduct groupTitle="Sản phẩm bán chạy" />
      <GroupProduct groupTitle="Siêu giảm giá" />
      <GroupProduct groupTitle="Gợi ý hôm nay" />


    </div>
  );
}
