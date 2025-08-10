// components/Footer.tsx
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white  pt-8 pb-4 text-sm">
            <div className="w-full  px-[64px] grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cột 1 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/images/logo-shop.png" alt="Logo" width={60} height={60} />
                        <span className="text-xl font-bold text-[var(--color-primary)]">T&D</span>
                        <span className="text-xl font-bold">SHOP</span>
                    </div>
                    <p className="mb-2">Chuyên cung cấp các thiết bị điện máy, điện tử, Gaming Gear</p>
                    <p className="mb-2">Mã số thuế: 12345678910</p>
                    <p className="flex items-center gap-2 mb-1 ">
                        <FaMapMarkerAlt className="text-[var(--color-primary)]" />
                        <span className="white-space-nowrap"><b>245 Mai Dịch</b>, Quận Cầu Giấy, Hà Nội</span>
                    </p>
                    <p className="flex items-center gap-2 mb-1">
                        <FaPhoneAlt className="text-[var(--color-primary)]" />
                        <span className="text-[var(--color-primary)] font-bold">0775313999</span>
                    </p>
                    <p className="flex items-center gap-2 mb-1">
                        <FaEnvelope className="text-[var(--color-primary)]" />
                        <span>trungthanhcao.2003@gmail.com</span>
                    </p>
                    <div className="mt-3 flex gap-3 text-2xl">
                        <FaFacebook className="text-blue-600 cursor-pointer" />
                        <FaYoutube className="text-red-600 cursor-pointer" />
                        <FaTiktok className="cursor-pointer" />
                        <FaInstagram className="text-pink-500 cursor-pointer" />
                    </div>
                </div>

                {/* Cột 2 */}
                <div>
                    <h3 className="font-bold mb-3">Hỗ trợ khách hàng</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Hệ thống cửa hàng</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Câu hỏi thường gặp</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Kiểm tra đơn hàng</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Liên hệ</li>
                    </ul>
                </div>

                {/* Cột 3 */}
                <div>
                    <h3 className="font-bold mb-3">Chính sách</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Chính sách bảo hành</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Chính sách đổi trả</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Chính sách bảo mật</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Chính sách trả góp</li>
                    </ul>
                    <h3 className="font-bold mt-4 mb-2">Tổng đài hỗ trợ</h3>
                    <ul className="space-y-1">
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Gọi mua hàng: 0775313999 (8h-20h)</li>
                        <li className="cursor-pointer hover:text-[var(--color-muted)]">Gọi bảo hành: 0336885256 (8h-20h)</li>
                    </ul>
                </div>

                {/* Cột 4 */}
                <div>
                    <h3 className="font-bold mb-3">Đăng ký nhận ưu đãi</h3>
                    <p className="mb-3">
                        Bạn muốn nhận khuyến mãi đặc biệt? Đăng kí tham gia ngay cộng đồng hơn 68.000+ người theo dõi của chúng tôi để cập nhật khuyến mãi ngay lập tức
                    </p>
                    <div className="flex mb-4">
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="border rounded-l px-3 py-2 flex-1"
                        />
                        <button className="bg-[var(--color-primary)] text-white px-4 rounded-r">
                            Đăng ký
                        </button>
                    </div>
                    <h3 className="font-bold mb-2">Phương thức thanh toán</h3>
                    <div className="flex gap-3 text-4xl">
                        <FaCcVisa className="text-blue-600" />
                        <FaCcMastercard className="text-red-600" />
                        {/* <Image src="/images/momo.png" alt="MoMo" width={40} height={25} />
                        <Image src="/images/zalopay.png" alt="ZaloPay" width={60} height={25} /> */}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t mt-6 pt-3 text-center text-gray-500 text-xs">
                © Bản quyền thuộc về <span className="font-bold">EGANY</span> | Cung cấp bởi <span className="font-bold">Sapo</span>
            </div>
        </footer>
    );
};

export default Footer;
