import React from 'react';
import { ReactComponent as FacebookIcon } from "@/assest/facebook.svg";
import { ReactComponent as WhatsApp } from "@/assest/whatsapp.svg";
import { ReactComponent as Logo } from "@/assest/logo.svg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const CatalogNavbar = () => {
  return (
    <header className="w-full px-6 py-4 bg-[#0f0f0f] flex items-center justify-between shadow-md fixed top-5 left-5 right-[40px] z-50 rounded-3xl bg-opacity-90">
      <div className="flex items-center gap-8">
        <Logo className="h-6" />
        <a href="/" className="text-gray-300 hover:text-white transition">Inicio</a>
        <a href="/productos" className="text-gray-300 hover:text-white transition">Productos</a>
      </div>
      <div className="flex items-center gap-8">
        <a href="https://www.facebook.com/profile.php?id=100090369100184" target="_blank" rel="noreferrer">
          <FacebookIcon className="h-6 text-gray-300 hover:text-white transition" />
        </a>
        <a href="https://wa.me/50576574229" target="_blank" rel="noreferrer">
          <WhatsApp className="h-6 text-gray-300 hover:text-white transition" />
        </a>
        <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition">
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
};

export default CatalogNavbar;