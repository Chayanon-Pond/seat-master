"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemDef = {
  id: string;
  name: string;
  path: string;
  icon: string | React.ElementType;
};

export default function SidebarUser() {
  const pathname = usePathname();

  const sidebarItems: SidebarItemDef[] = [
    {
      id: "switch-to-user",
      name: "Switch to Admin",
      path: "/admin/dashboard",
      icon: "/refresh-ccw.svg",
    },
  ];

  return (
    <div className="bg-white w-[240px] h-screen shadow-md flex flex-col border-3 border-gray-200 border-b-0 border-t-0">
      <div className="pt-15 pr-14 pb-2 flex flex-col items-center">
        <div className="max-w-screen-xl h-full hidden sm:flex items-center justify-between lg:mx-[120px] mx-6 px-6">
          <Link
            href="/admin/dashboard"
            className="text-[40px] font-semibold text-black w-full text-right"
            style={{ WebkitBackgroundClip: "text" }}
          >
            User
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
                        ? "bg-[var(--color-sidebar-hover)] text-gray-800 font-normal"
                        : "text-gray-600 hover:bg-[var(--color-sidebar-hover)] hover:text-gray-800"
                    }`}
              >
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className={`w-5 h-5 mr-3 object-contain ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  />
                ) : (
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-gray-700" : "text-gray-400"
                    }`}
                  />
                )}
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="mb-10">
        <button className="flex items-center px-5 py-3 mx-3 my-0.5 rounded-md cursor-pointer transition-colors duration-150 ease-in-out text-gray-600 hover:bg-[var(--color-sidebar-hover)] hover:text-gray-800">
          <img
            src="/log-out.svg"
            alt="Log out"
            className="w-5 h-5 mr-3 object-contain opacity-70"
          />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
