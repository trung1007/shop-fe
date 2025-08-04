import CollectionCard from "./CollectionCard";
import laptopImg from "@/public/images/laptop.webp"

const ListCollection = () => {
  const fakeData = Array.from({ length: 16 }).map((_, index) => ({
    srcImgCollection: {
      src: "https://firebasestorage.googleapis.com/v0/b/music-app-2c0fc.appspot.com/o/T%26D-Shop%2Fcategory%2Fban-phim-e-dra-ek398.jpg?alt=media&token=13ed4008-f2d8-44c4-a599-dc5270b990e8", 
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
