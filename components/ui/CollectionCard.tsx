import Image from "next/image";

type Props = {
  img: string;
  code: string;
};

const CollectionCard = ({ img, code }: Props) => {
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center  p-4 ">
      <div className="w-full h-[80px] flex justify-center">
        <div className="relative w-[60px] h-[60px] transition-all duration-300 hover:w-[80px] hover:h-[80px]">
          <Image
            src={img}
            alt={code}
            fill
            sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 80px"
            className="object-cover"
          />
        </div>
      </div>
      <div className=" flex items-center justify-center text-sm font-medium">
        {code}
      </div>
    </div>
  );
};

export default CollectionCard;
