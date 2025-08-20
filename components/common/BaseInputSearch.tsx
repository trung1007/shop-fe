import { FiSearch } from "react-icons/fi";

type BaseInputSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const BaseInputSearch: React.FC<BaseInputSearchProps> = ({
  value,
  onChange,
  placeholder = "Bạn cần tìm gì?",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center rounded-lg px-4 py-2 w-1/3 transition-shadow bg-white shadow ${className}`}
    >
      <FiSearch className="text-gray-500 mr-3 text-2xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-base focus:outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default BaseInputSearch;
