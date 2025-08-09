import Banner from "@/components/ui/Banner";
import ListCollection from "@/components/ui/ListCollection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[3000px] bg-[var(--color-bg)] " >
      <Banner />
      <ListCollection />
    </div>
  );
}
