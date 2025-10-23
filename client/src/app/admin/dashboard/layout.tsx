"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import { ConcertProvider } from "../context/concertContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConcertProvider>
      <div className="flex flex-col lg:flex-row">
        {/* Mobile header/navbar (renders Sidebar's mobile header because Sidebar contains lg:hidden header) */}
        <div className="w-full lg:hidden">
          <Sidebar />
        </div>

        {/* Desktop fixed sidebar */}
        <div className="fixed lg:block hidden">
          <Sidebar />
        </div>

        <main className="flex-1 bg-gray-50 min-h-screen lg:ml-[240px]">
          {children}
        </main>
      </div>
    </ConcertProvider>
  );
}
