import Image from "next/image";

type Props = {
    srcImgCollection: {
        src: string;
    };
    collectionType: string;
};

const CollectionCard = ({ srcImgCollection, collectionType }: Props) => {
    return (
        <div className="w-full h-full  flex flex-col justify-center items-center border p-4 border-gray-300">
            <div className="w-full h-[80px] flex justify-center">
                <div className="relative w-[60px] h-[60px] transition-all duration-300 hover:w-[80px] hover:h-[80px]">
                    <Image
                        src={srcImgCollection.src}
                        alt={collectionType}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className=" flex items-center justify-center text-sm font-medium">
                {collectionType}
            </div>
        </div>
    );
};

export default CollectionCard;
