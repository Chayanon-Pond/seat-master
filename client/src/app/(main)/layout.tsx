"use client";

import React from "react";
import SidebarUser from "../../components/ui/SidebaeUser";
import { ReserveProvider } from "../../context/reserveContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReserveProvider>
      <div className="flex flex-col lg:flex-row">
        {/* Mobile header/navbar (renders Sidebar's mobile header because Sidebar contains lg:hidden header) */}
        <div className="w-full lg:hidden">
          <SidebarUser />
        </div>
        {/* Desktop fixed sidebar */}
        <div className="fixed lg:block hidden">
          <SidebarUser />
        </div>

        <main className="flex-1 bg-gray-50 min-h-screen lg:ml-[240px]">
          {children}
        </main>
      </div>
    </ReserveProvider>
  );
}
