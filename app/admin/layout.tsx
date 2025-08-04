import AdminHeader from "@/components/layout/AdminHeader";
import "@/styles/global.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
}
