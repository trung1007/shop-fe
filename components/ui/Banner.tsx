"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import MainBanner1 from "@/public/images/main-banner.jpg";
import MainBanner2 from "@/public/images/main-banner-2.jpg"; // ảnh khác

import SubBanner1 from "@/public/images/sub-banner-1.jpg";
import SubBanner2 from "@/public/images/sub-banner-2.jpg";
import SubBanner3 from "@/public/images/sub-banner-3.jpg";

const mainBanners = [MainBanner1, MainBanner2];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Tự động đổi banner mỗi 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % mainBanners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative flex gap-4 px-[64px] py-6 transition-all duration-700"
            style={{
                backgroundImage: `url(${mainBanners[currentIndex].src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className=" blur-container absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div className=" main-banner flex-1 overflow-hidden rounded-lg relative aspect-[16/9] z-10">
                <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {mainBanners.map((img, index) => (
                        <div key={index} className="relative flex-shrink-0 w-full h-full group">
                            <Image
                                src={img}
                                alt={`Main Banner ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className=" sub-banner flex flex-col gap-4 w-1/3">
                {[SubBanner1, SubBanner2, SubBanner3].map((img, index) => (
                    <div
                        key={index}
                        className="relative aspect-[16/6] overflow-hidden rounded-lg group"
                    >
                        <Image
                            src={img}
                            alt={`Sub Banner ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
