"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/global.css";
import Providers from "@/providers";
import RedirectByRole from "@/components/RedirectByRole";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <Providers>
          <RedirectByRole />
          {!isAdmin && <Header />}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
