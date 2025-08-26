import Banner from "@/components/ui/Banner";
import GroupProduct from "@/components/ui/GroupProduct";
import ListCollection from "@/components/ui/ListCollection";
import ListGroupProduct from "@/components/ui/ListGroupProduct";

export default function Home() {
  return (
    <div className=" bg-[var(--color-bg)] pb-[60px] " >
      <Banner />
      <div className="px-[64px]">
        <ListCollection />

      </div>
      <ListGroupProduct />


    </div>
  );
}
