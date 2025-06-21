import React, { useState } from "react";
import { Menu } from "lucide-react";

const Header = ({ isSidebarOpen, setIsSidebarOpen, title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("usuario"))?.Nombre || "Usuario";


  return (
    <header
      className="bg-transparent flex items-center px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300"
      style={{
        minHeight: "64px",
      }}
    >
      {/* Sidebar Toggle Button */}
        <button
          className="mr-4 p-2 rounded-full text-slate-900 transition-colors duration-300 hover:text-white hover:bg-blue-600"
          onClick={() => setIsSidebarOpen((open) => !open)}
          aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
          style={{
            transitionDelay: "10ms",
          }}
        >
          <Menu size={28} />
        </button>
        <h1 className="text-2xl font-semibold text-black flex-1">{title}</h1>
        {/* User Dropdown */}
      <div className="relative">
        <h3
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition"
        >
          Bienvenido {currentUser}
        </h3>
      </div>
    </header>
  );
};

export default Header;