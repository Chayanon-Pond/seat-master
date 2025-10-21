"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiClock, FiRepeat, FiLogOut } from "react-icons/fi";

type SidebarItemDef = {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
};

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems: SidebarItemDef[] = [
    {
      id: "home",
      name: "Home",
      path: "/admin/dashboard",
      icon: FiHome,
    },
    {
      id: "history",
      name: "History",
      path: "/admin/dashboard/history",
      icon: FiClock,
    },
    {
      id: "recurring",
      name: "Recurring",
      path: "/admin/dashboard/recurring",
      icon: FiRepeat,
    },
  ];

  return (
    <div className="bg-white w-[240px] h-screen shadow-md flex flex-col border-3 border-gray-200 border-b-0 border-t-0">
      <div className="p-6 pb-12 flex flex-col items-center">
        <div className="max-w-screen-xl h-full hidden sm:flex items-center justify-between lg:mx-[120px] mx-6 px-6">
          <Link
            href="/admin/dashboard"
            className=""
            style={{ WebkitBackgroundClip: "text" }}
          >
            Admin
          </Link>
        </div>
      </div>
      <nav className="flex flex-col py-4 flex-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.id}
              passHref
              legacyBehavior={false}
            >
              <div
                className={`flex items-center px-5 py-3 mx-3 my-0.5 rounded-md cursor-pointer transition-colors duration-150 ease-in-out
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 
                    ${isActive ? "text-blue-500" : "text-gray-400"}`}
                />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="mb-100">
        <button className="{`flex items-center px-5 py-3 mx-3 my-0.5 rounded-md cursor-pointer transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-800`}">
          <FiLogOut className="w-5 h-5 mr-3 text-gray-400" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
