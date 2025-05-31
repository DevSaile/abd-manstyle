import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "animate.css";
import { ReactComponent as Ilustracion } from "../../assest/ilustracion.svg";
import { ReactComponent as Airpods } from "../../assest/airpods.svg";
import { ReactComponent as Perfume } from "../../assest/perfume.svg";
import { ReactComponent as Shirt } from "../../assest/mens.svg";
import ExampleCard from "../../components/public/landing/ExampleCard";
import airpods from "../../assest/carrousel/airpods.webp";
import labial from "../../assest/carrousel/labial.webp";
import parlantes from "../../assest/carrousel/parlantes.webp";
import perfume from "../../assest/carrousel/perfume.webp";
import protectoresCam from "../../assest/carrousel/protectores_cam.webp";
import tripode from "../../assest/carrousel/tripode.webp";
import Slider from "../../components/public/landing/Slider";
const LandingPage = () => {
  const Images = [airpods, labial, parlantes, perfume, protectoresCam, tripode];

  useEffect(() => {
    ScrollReveal().reveal("[data-sr]", {
      distance: "60px",
      duration: 1000,
      easing: "ease-in-out",
      origin: "bottom",
      interval: 200,
    });
  }, []);

  return (
    <>
      {/* Main */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black via-black/80 to-transparent" />
     <main className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20  ">
  <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 w-full max-w-7xl">
   
    <div
      className="animate__animated animate__fadeInRight md:flex md:flex-col md:justify-center md:h-full "
      data-sr
    >
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6 md:text-left">
        Variedades Man's Style <br />
      </h1>
      <p className="text-gray-300 text-lg mb-6 md:text-left">
        Somos una tienda de variedades, contamos con dos sucursales en Managua. Visitenos!
      </p>
      <a
        href="#"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold transition md:self-start"
      >
        Conocer más
      </a>
    </div>
     <div className="animate__animated animate__fadeInLeft bg-black bg-opacity-30 border-2 border-white rounded-xl" data-sr>
      <Slider images={Images} />
    </div>
  </div>
</main>


      {/* Secciones */}
      <section className="py-20 px-6 bg-[#141414]" data-sr>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Tenemos lo que usted busca
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative mt-20">
            <ExampleCard
              image={
                <Airpods className="h-full w-full object-contain text-white" />
              }
              Description="Accesorios para celulares"
            />
            <ExampleCard
              className="absolute top-0 left-0 w-full h-full"
              image={
                <Perfume className="h-full w-full object-contain text-white" />
              }
              Description="Cosmeticos"
            />
            <ExampleCard
              className="absolute top-0 left-0 w-full h-full"
              image={
                <Shirt className="h-full w-full object-contain text-white" />
              }
              Description="Vestimenta"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1c1c1c]">
        <div className="max-w-6xl mx-auto" data-sr>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Variedad en un solo lugar
          </h2>
          {/* Carrusel de iconos */}
          <div className="w-full flex justify-center mb-12">
            <div className="relative w-full max-w-full overflow-hidden">
              <div className="flex gap-8 animate-scroll-x items-center">
                {/* Primer set de imágenes */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={airpods}
                    alt="Airpods"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={labial}
                    alt="Labial"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={parlantes}
                    alt="Parlantes"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={perfume}
                    alt="Perfume"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={protectoresCam}
                    alt="Protectores Cam"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={tripode}
                    alt="Trípode"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                {/* Segundo set de imágenes (idéntico al primero) */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={airpods}
                    alt="Airpods"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={labial}
                    alt="Labial"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={parlantes}
                    alt="Parlantes"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={perfume}
                    alt="Perfume"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={protectoresCam}
                    alt="Protectores Cam"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={tripode}
                    alt="Trípode"
                    className="h-40 w-40 object-contain mb-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <style>
            {`
              @keyframes scroll-x {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-x {
                width: max-content;
                animation: scroll-x 18s linear infinite;
              }
            `}
          </style>
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
