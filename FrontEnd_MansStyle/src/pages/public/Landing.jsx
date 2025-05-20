import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Smartphone, Headphones, ShoppingBag, Watch, Gem } from "lucide-react";
import "animate.css";
import { ReactComponent as Ilustracion } from "../../assest/ilustracion.svg";
import ParticlesBackground from "../../components/public/common/ParticlesBackground";
import { ReactComponent as Airpods } from "../../assest/airpods.svg";
import { ReactComponent as Perfume } from "../../assest/perfume.svg";
import { ReactComponent as Shirt } from "../../assest/mens.svg";
import ExampleCard from "../../components/public/landing/ExampleCard";
import Navbar from "../../components/public/landing/Navbar";

const LandingPage = () => {
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
            <Navbar />
                  <div className="pointer-events-none fixed top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black via-black/80 to-transparent" />


      <main className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 lg:px-32 pt-20">
        <ParticlesBackground color={"0f0f0f"} />

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full max-w-7xl">
          <div className="animate__animated animate__fadeInLeft" data-sr>
            <Ilustracion className="w-full h-auto" />
          </div>
          <div
            className="animate__animated animate__fadeInRight text-center md:text-left"
            data-sr
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Sistema de Gestión para <br />
              <span className="text-indigo-500">Variedades Man's Style</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Controlá tu inventario, ventas y facturación de manera eficiente.
            </p>
            <a
              href="#"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold transition"
            >
              Conocer más
            </a>
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
            <div className="relative w-full max-w-2xl overflow-hidden">
              <div className="flex gap-8 animate-scroll-x items-center">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Smartphone size={64} className="text-indigo-400 mb-2" />
                  <span className="text-gray-300 text-sm">Celulares</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Headphones size={64} className="text-blue-400 mb-2" />
                  <span className="text-gray-300 text-sm">Accesorios</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Shirt size={64} className="text-pink-400 mb-2" />
                  <span className="text-gray-300 text-sm">Ropa</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <ShoppingBag size={64} className="text-green-400 mb-2" />
                  <span className="text-gray-300 text-sm">Bolsos</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Watch size={64} className="text-yellow-400 mb-2" />
                  <span className="text-gray-300 text-sm">Relojes</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Gem size={64} className="text-purple-400 mb-2" />
                  <span className="text-gray-300 text-sm">Joyería</span>
                </div>
                {/* Repetir para efecto infinito */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Smartphone size={64} className="text-indigo-400 mb-2" />
                  <span className="text-gray-300 text-sm">Celulares</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Headphones size={64} className="text-blue-400 mb-2" />
                  <span className="text-gray-300 text-sm">Accesorios</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Shirt size={64} className="text-pink-400 mb-2" />
                  <span className="text-gray-300 text-sm">Ropa</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <ShoppingBag size={64} className="text-green-400 mb-2" />
                  <span className="text-gray-300 text-sm">Bolsos</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Watch size={64} className="text-yellow-400 mb-2" />
                  <span className="text-gray-300 text-sm">Relojes</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Gem size={64} className="text-purple-400 mb-2" />
                  <span className="text-gray-300 text-sm">Joyería</span>
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
          <h2 className="text-3xl font-bold mb-6">Nuestra ubicación</h2>
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
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1c1c1c]" data-sr>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Testimonios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#222] p-6 rounded-lg shadow-md text-left">
              <p className="text-gray-300 mb-3">
                “Todo más ordenado y profesional.”
              </p>
              <span className="text-sm text-gray-400">- Karen, encargada</span>
            </div>
            <div className="bg-[#222] p-6 rounded-lg shadow-md text-left">
              <p className="text-gray-300 mb-3">
                “Control total desde cualquier lugar.”
              </p>
              <span className="text-sm text-gray-400">- Juan, propietario</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f0f0f] text-gray-500 text-center py-6 text-sm">
        &copy; 2025 Variedades Man's Style. Todos los derechos reservados.
      </footer>
    </>
  );
};

export default LandingPage;