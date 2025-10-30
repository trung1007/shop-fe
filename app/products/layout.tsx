// app/product/layout.tsx (Next.js 13+ App Router)

import React from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)] px-[64px] py-[20px]">
      <main>{children}</main>
    </div>
  );
}
