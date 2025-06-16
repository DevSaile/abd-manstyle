import React, { useEffect, useState } from "react";
import ProductSection from "../../components/public/landing/ProductSection";
import {
  airpods,
  labial,
  parlantes,
  perfume,
  protectoresCam,
  tripode,
} from "../../assest/carrousel/exports";
import Slider from "../../components/public/landing/Slider";
import Navbar from "../../components/public/landing/Navbar";

const LandingPage = () => {
  const Images = [airpods, labial, parlantes, perfume, protectoresCam, tripode];

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  return (
    <>
      <Navbar />

<div className="flex flex-col md:flex-row justify-start gap-10 px-6 py-20 my-30 bg-black w-full">
          <div className="flex flex-col justify-center p-30 flex-1 text-center md:text-start">
            <h1 className="text-4xl font-extrabold leading-tight mb-4 font-[poppins] standar-gradient bg-clip-text text-transparent drop-shadow-lg md:text-5xl" style={{ letterSpacing: "1px" }}>
              Variedades Man's Style
            </h1>
            <p className="text-sm md:text-xl mb-3 md:mb-4 md:text-left font-[poppins] text-gray-200">
              Somos una tienda de variedades, aquí podrás encontrar&nbsp;
              <span className="underline decoration-indigo-400 font-[poppins] underline-offset-4">
                accesorios para celulares, artículos electrónicos, LED's, perfumes, covers personalizados
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

       <input
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl text-base font-semibold minwidth-[300px] max-width-[500px] w-full mt-6 mb-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Buscar productos"
            />

      <section className="px-6 py-16" data-sr>
        <ProductSection />
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto" data-sr>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Variedad en un solo lugar
          </h2>
        </div>
      </section>

      <section className="py-20 px-6" data-sr>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 mt-6">
            Nuestras Sucursales!
          </h1>
          <h2 className="text-3xl font-bold mb-6">
            Sucursal Unidad de Proposito
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.7727987680513!2d-86.18387315030198!3d12.155550041774594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73fc0dc0d95f47%3A0x1988b95898efe0fa!2s5R48%2B5FJ%2C%20Managua%2011042!5e0!3m2!1ses-419!2sni!4v1745190861916!5m2!1ses-419!2sni"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            ></iframe>
          </div>
          <h2 className="text-3xl font-bold mb-6 mt-6">Sucursal Americas 2</h2>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d243.7672932153066!2d-86.18840531741803!3d12.161556183420084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA5JzQxLjYiTiA4NsKwMTEnMTcuOSJX!5e0!3m2!1ses-419!2sni!4v1747719557643!5m2!1ses-419!2sni"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación 2"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;