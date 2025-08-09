import Image from "next/image";

interface Props {
  img: string;
  name: string;
}

const CollectionCard = ({ img, name }: Props) => {
  return (
    <div className="flex flex-col items-center cursor-pointer p-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden 
                      transition-transform hover:scale-110">
        <Image
          src={img}
          alt={name}
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
      <p className="mt-2 text-sm text-center">{name}</p>
    </div>
  );
};

export default CollectionCard;
