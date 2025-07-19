import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/global.css"
import ReactQueryProvider from "@/context/react-query-provider";
import { ToastContainer } from "react-toastify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider >
          <Header />
          {children}
          <Footer />

        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
