import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  const IsLoggedIn = localStorage.getItem("isAuthenticated") ? true : false;

  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div class="bg-[#1A2238] px-2 py-0.5 text-sm rounded rotate-12 absolute border border-white text-white">
        Pagina no encontrada
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-white group active:text-gray-200  focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to={IsLoggedIn ? "/inicio" : "/"}>Ir a inicio</Link>
          </span>
        </a>
      </button>
    </main>
  );
}

export default Error404;
