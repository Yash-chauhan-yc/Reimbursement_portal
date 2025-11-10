"use client";
import { useState } from "react";
import { LayoutDashboard, Users } from "lucide-react";
import Image from "next/image";

export default function Sidebar({ menuOptions, currentMenu }) {
  const [activeMenu, setActiveMenu] = useState(currentMenu);

  return (
    <aside className="w-16 lg:w-46 bg-white border-r border-gray-200 transition-all duration-300">
      {/* Logo */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center">
          <Image
            src="/images/keenableLogo.jpeg"
            width={30}
            height={30}
            alt="companyLogo"
            className="lg:w-[100px] lg:h-[100px]"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 lg:px-4 space-y-2">
        {menuOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setActiveMenu(option.key)}
            className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg transition-colors ${
              activeMenu === option.key
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            title={option.label}
          >
            {option.icon}
            <span className="font-medium hidden lg:inline">{option.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
