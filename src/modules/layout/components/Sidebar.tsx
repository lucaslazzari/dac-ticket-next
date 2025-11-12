"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Ticket,
  UserCircle,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "customers", label: "Customers", icon: Users, href: "/customers" },
    { id: "tickets", label: "Tickets", icon: Ticket, href: "/tickets" },
    { id: "users", label: "Users", icon: UserCircle, href: "/users" },
    { id: "logs", label: "Logs", icon: FileText, href: "/logs" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#134C60] text-white transition-all duration-300 flex flex-col shadow-2xl relative`}
      aria-label="Sidebar"
    >
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Recolher sidebar" : "Expandir sidebar"}
        className="absolute -right-3 top-8 bg-[#44C0CF] hover:bg-[#3ab0bf] text-white rounded-full p-1.5 shadow-lg transition-all z-10"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo Area */}
      <div className="p-6 border-b border-[#1d6478]">
        {isOpen ? (
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-11 rounded-lg bg-gradient-to-br from-[#44C0CF] to-[#134C60] flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 rounded-md border-2 border-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                DAC
              </h1>
              <p className="text-xs text-[#44C0CF] font-medium">
                Management System
              </p>
            </div>
          </Link>
        ) : (
          <Link href="/" className="flex justify-center">
            <div className="w-10 h-11 rounded-lg bg-gradient-to-br from-[#44C0CF] to-[#134C60] flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 rounded-md border-2 border-white" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href; // pode trocar para startsWith se desejar match por seção

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? "bg-[#44C0CF] text-white shadow-lg shadow-[#44C0CF]/30"
                  : "hover:bg-[#1d6478] text-gray-300 hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={22}
                className={`${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } transition-colors`}
              />
              {isOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-[#1d6478]">
          <div className="text-xs text-gray-400 text-center">
            © 2025 DAC System
          </div>
        </div>
      )}
    </aside>
  );
}
