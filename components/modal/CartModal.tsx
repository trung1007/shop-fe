import { Divider, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import NoProductInCart from "../ui/NoProductInCart";
interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalProps) => {
  const router = useRouter();

  const onClikCart = () => {
    onClose();
    router.push("/cart");
  };

  return (
    <Drawer
      onClose={onClose}
      open={open}
      width="30%"
      style={{ textAlign: "center" }}
      closable={false}
    >
      <div className="relative flex flex-col  items-center">
        <div className="absolute top-[0px] left-0" onClick={onClose}>
          <IoMdClose size={24} />
        </div>
        <h2 className="text-[32px] font-bold">Giỏ hàng</h2>
        <h4
          className="underline cursor-pointer italic hover:text-[var(--color-primary)]"
          onClick={onClikCart}
        >
          Xem chi tiết {`>`}{" "}
        </h4>
      </div>
      <Divider />
      <div className="flex flex-col items-center h-full">
        <NoProductInCart onClick={onClose} />
      </div>
    </Drawer>
  );
};

export default CartModal;
