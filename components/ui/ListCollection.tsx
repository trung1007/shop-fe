import CollectionCard from "./CollectionCard";
import laptopImg from "@/public/images/laptop.webp"

const ListCollection = () => {
  const fakeData = Array.from({ length: 16 }).map((_, index) => ({
    srcImgCollection: {
      src: laptopImg.src, // ảnh nội bộ từ thư mục public
    },
    collectionType: `Collection ${index + 1}`,
  }));

  return (
    <div className="grid grid-cols-8 grid-rows-2 w-full h-[360px] ">
      {fakeData.map((item, index) => (
        <CollectionCard
          key={index}
          srcImgCollection={item.srcImgCollection}
          collectionType={item.collectionType}
        />
      ))}
    </div>
  );
};

export default ListCollection;
