import Banner from "@/components/ui/Banner";
import GroupProduct from "@/components/ui/GroupProduct";
import ListCollection from "@/components/ui/ListCollection";

export default function Home() {
  return (
    <div className=" bg-[var(--color-bg)] pb-[60px] " >
      <Banner />
      <div className="px-[64px]">
        <ListCollection />

      </div>
      <GroupProduct groupTitle="Tất cả sản phẩm" type="all" slug="" />

      <GroupProduct groupTitle="Đồ công nghệ" type="cong-nghe" />
      <GroupProduct groupTitle="Sản phẩm bán chạy"  />
      <GroupProduct groupTitle="Siêu giảm giá" />
      <GroupProduct groupTitle="Gợi ý hôm nay" />



    </div>
  );
}
