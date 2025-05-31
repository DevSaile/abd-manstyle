import React, { useEffect, useState} from "react";
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
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },[searchTerm, products]);

  return (
    <>
            <Navbar />

      {/* Main */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black via-black/80 to-transparent" />
      <main className="min-h-screen flex flex-col justify-start items-center px-6 md:px-20 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 w-full max-w-7xl">
          <div
            className=" md:flex md:flex-col md:justify-center md:h-full"
            data-sr
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6 md:text-left font-[poppins] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg"
              style={{ letterSpacing: "1px" }}
            >
              Variedades Man's Style <br />
            </h1>
            <p className="text-lg md:text-xl mb-3 md:mb-4 md:text-left font-[poppins] text-gray-200">
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
            <input
              href="#"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl text-base font-semibold
              "
              placeholder="Buscar productos"
            />
          </div>
          <div
            className="bg-transparent border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-center"
            data-sr
          >
            <Slider images={Images} />
          </div>
        </div>
      </main>

      {/* Secciones */}
      <section className="px-6 bg-[#141414]" data-sr>
        <ProductSection />
      </section>

      <section className="py-20 px-6 bg-[#1c1c1c]">
        <div className="max-w-6xl mx-auto" data-sr>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Variedad en un solo lugar
          </h2>
          {/* Carrusel de iconos */}
          <div className="w-full flex justify-center mb-12">
            <div className="relative w-full max-w-full overflow-hidden">
       
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8"></div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#141414]" data-sr>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 mt-6z">
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
