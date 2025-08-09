import { FaTruck, FaDollarSign, FaTicketAlt, FaSyncAlt, FaThumbsUp } from "react-icons/fa";

const SupportBar = () => {
    const items = [
        {
            icon: <FaTruck className="text-2xl text-gray-700" />,
            title: "GIAO HỎA TỐC",
            desc: "Nội thành TP. HCM trong 4h",
        },
        {
            icon: <FaDollarSign className="text-2xl text-gray-700" />,
            title: "TRẢ GÓP ƯU ĐÃI%",
            desc: "Hỗ trợ vay với lãi suất thấp",
        },
        {
            icon: <FaTicketAlt className="text-2xl text-gray-700" />,
            title: "DEAL HOT BÙNG NỔ",
            desc: "Flash sale giảm giá cực sốc",
        },
        {
            icon: <FaSyncAlt className="text-2xl text-gray-700" />,
            title: "MIỄN PHÍ ĐỔI TRẢ",
            desc: "Trong vòng 30 ngày miễn phí",
        },
        {
            icon: <FaThumbsUp className="text-2xl text-gray-700" />,
            title: "HỖ TRỢ 24/7",
            desc: "Hỗ trợ khách hàng 24/7",
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm flex justify-between px-8 py-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 px-4 border-r last:border-r-0 border-gray-200"
                >
                    {item.icon}
                    <div>
                        <h3 className="font-bold text-sm uppercase">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SupportBar;
