
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/global.css";
import Providers from "@/providers";
import RedirectByRole from "@/components/RedirectByRole";
import Loading from "@/components/common/Loading";
import ClientHeader from "@/components/layout/ClientHeader";


export const metadata = {
  title: "T&D Shop",
  description: "fullstack shop with nextjs, tailwindcss, redux-toolkit, and typescript",
  icons: {
    icon: "/logo-shop.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <RedirectByRole />
          <Loading />
          <ClientHeader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
