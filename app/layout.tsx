import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/global.css"
import Providers from "@/providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
