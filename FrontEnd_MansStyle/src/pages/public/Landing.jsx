import React, { useEffect, useState } from "react";
import ProductSection from "@/components/public/landing/ProductSection";
import {
  airpods,
  labial,
  parlantes,
  perfume,
  protectoresCam,
  tripode,
} from "@/assest/carrousel/exports";
import Slider from "@/components/public/landing/Slider";
import Navbar from "@/components/public/landing/Navbar";
import LocationSection from "@/components/public/landing/LocationSection";

const LandingPage = () => {
  const Images = [airpods, labial, parlantes, perfume, protectoresCam, tripode];

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-start gap-10 px-6 pt-20 my-30 bg-black w-full">
        <div className="flex flex-col justify-center p-30 flex-1 text-center md:text-start">
          <h1
            className="text-4xl font-extrabold leading-tight mb-4 font-[poppins] standar-gradient bg-clip-text text-transparent drop-shadow-lg md:text-5xl"
            style={{ letterSpacing: "1px" }}
          >
            Variedades Man's Style
          </h1>
          <p className="text-sm md:text-xl mb-3 md:mb-4 md:text-left font-[poppins] text-gray-200">
            Somos una tienda de variedades, aquí podrás encontrar&nbsp;
            <span className="underline decoration-indigo-400 font-[poppins] underline-offset-4">
              accesorios para celulares, artículos electrónicos, LED's,
              perfumes, covers personalizados
            </span>
            &nbsp;y más.
          </p>
          <p className="text-lg md:text-xl mb-6 md:mb-8 md:text-left font-[poppins] text-gray-300">
            <span className="font-semibold">
              Contamos con dos sucursales en Managua.
            </span>{" "}
            ¡Visítenos!
          </p>
        </div>
        <div className="bg-transparent border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-center flex-1">
          <Slider images={Images} />
        </div>
      </div>

      <section className="pb-16 pt-2 px-5">
        <ProductSection />
      </section>

      {/* Styled "Variedad en un solo lugar" Section */}
      <section className="flex flex-col md:flex-row items-center py-16 px-4 mt-8 bg-[#23272f] rounded-xl shadow-lg max-w-7xl mx-auto text-align">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 ">
          <div className="w-80 h-80 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            {/* Reemplaza la URL por la foto real de tu local si la tienes */}
            <img
              src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=400&q=80"
              alt="Foto del local"
              className="object-cover w-full h-full scale-110"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center min-h-72">
          <h2 className=" text-4xl md:text-5xl font-bold mb-8 text-[#a78bfa] font-[poppins]">
            Variedad en un solo lugar
          </h2>
          <p className="text-lg md:text-xl text-gray-200 font-[Montserrat] px-10">
            La sección de productos está actualizada en tiempo real. ¡Todo se
            encuentra disponible! Abajo podrá ver las ubicaciones y la dirección
            de nuestras dos sucursales.
          </p>
        </div>
      </section>

      {/* Styled Sucursales Section */}
      <LocationSection></LocationSection>
      {/* Footer */}
      <footer className="mt-12 bg-[#23272f] text-gray-400 py-8 rounded-t-xl shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-[#a78bfa]">Man's Style</span> &copy;{" "}
            {new Date().getFullYear()}
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#2563eb] transition">
              Facebook
            </a>
            <a href="#" className="hover:text-[#2563eb] transition">
              Instagram
            </a>
            <a href="#" className="hover:text-[#2563eb] transition">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
