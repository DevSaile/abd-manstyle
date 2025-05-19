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
  
    // Redirect to login page and replace the history stack
    navigate("/", { replace: true });
  
    // Clear the browser's history stack and block back navigation
    setTimeout(() => {
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
      };
      window.addEventListener("popstate", handlePopState);
  
      // Cleanup the event listener when the user navigates away
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, 0);
  };
  
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

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