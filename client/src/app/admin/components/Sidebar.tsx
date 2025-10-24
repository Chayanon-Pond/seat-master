"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemDef = { id: string; name: string; path: string; icon: string };

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarItems: SidebarItemDef[] = [
    { id: "home", name: "Home", path: "/admin/dashboard", icon: "/home.svg" },
    {
      id: "history",
      name: "History",
      path: "/admin/dashboard/historys",
      icon: "/inbox.svg",
    },
    {
      id: "switch-to-user",
      name: "Switch to user",
      path: "/my-concerts",
      icon: "/refresh-ccw.svg",
    },
  ];

  return (
    <>
      {/* Mobile header (visible on sm only) */}
      <header className="w-full bg-white border-b border-gray-200 md:hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="text-[28px] font-semibold text-black"
          >
            Admin
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-1"
          >
            <img src="/hamburger.svg" alt="menu" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Sidebar: visible on md and lg (md narrower, lg original width) */}
      <aside className="hidden md:flex bg-white md:w-[200px] lg:w-[240px] h-screen flex-col shadow-md">
        <div className="px-6 pt-6">
          <Link
            href="/admin/dashboard"
            className="text-[40px] font-semibold text-black"
          >
            Admin
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {sidebarItems.map((it) => {
            const isActive = pathname === it.path;
            return (
              <Link href={it.path} key={it.id}>
                <div
                  className={`flex items-center px-5 py-3 mx-3 my-0.5 rounded-md cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-sidebar-hover)] text-gray-800"
                      : "text-gray-600 hover:bg-[var(--color-sidebar-hover)]"
                  }`}
                >
                  <img src={it.icon} alt={it.name} className="w-5 h-5 mr-3" />
                  <span>{it.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button className="flex items-center w-full text-gray-600 hover:bg-[var(--color-sidebar-hover)] px-4 py-2 rounded cursor-pointer">
            <img src="/log-out.svg" alt="Log out" className="w-5 h-5 mr-3" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile full-screen overlay (menu stacked vertically, sm only) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-0 flex">
            <div className="w-full bg-white overflow-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <Link
                  href="/admin/dashboard"
                  className="text-[28px] font-semibold text-black"
                >
                  Admin
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-1"
                >
                  <img src="/hamburger.svg" alt="close" className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 p-6 pl-2">
                {sidebarItems.map((it) => (
                  <Link href={it.path} key={it.id}>
                    <div
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 px-2 py-3 rounded cursor-pointer text-gray-600 hover:bg-[var(--color-sidebar-hover)]"
                    >
                      <img src={it.icon} alt={it.name} className="w-6 h-6" />
                      <span className="text-[16px]">{it.name}</span>
                    </div>
                  </Link>
                ))}

                <div className="pt-4 mt-4">
                  <button
                    className="flex items-center gap-4 text-gray-600 hover:bg-[var(--color-sidebar-hover)] px-2 py-3 rounded w-full ml-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    <img src="/log-out.svg" alt="Log out" className="w-6 h-6" />
                    <span>Log out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
