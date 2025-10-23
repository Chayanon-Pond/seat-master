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
      <div className="flex">
        <div className="fixed">
          <SidebarUser />
        </div>
        <main className="flex-1 bg-gray-50 min-h-screen ml-[240px]">
          {children}
        </main>
      </div>
    </ReserveProvider>
  );
}
