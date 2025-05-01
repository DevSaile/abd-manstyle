import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve the current user's name from localStorage
  const currentUser = JSON.parse(localStorage.getItem("usuario"))?.Nombre || "Usuario";

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("isAuthenticated");

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition"
        >
          {currentUser}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;