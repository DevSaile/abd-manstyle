import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import 'animate.css';

const LandingPage = () => {
  useEffect(() => {
    ScrollReveal().reveal('[data-sr]', {
      distance: '60px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 200,
    });
  }, []);

  return (
    <div className="text-white font-sans overflow-y-hidden relative">

      {/* Header/Nav */}
      <header className="w-full px-6 py-4 bg-[#0f0f0f] flex items-center justify-between shadow-md fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <img src="img/logo.png" alt="Logo" className="h-10" />
          <a href="/" className="text-gray-300 hover:text-white transition">Inicio</a>
          <a href="/productos" className="text-gray-300 hover:text-white transition">Productos</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/profile.php?id=100090369100184" target="_blank" rel="noreferrer">
            <img src="img/facebook-icon.png" alt="Facebook" className="h-6" />
          </a>
          <a href="https://wa.me/50576574229" target="_blank" rel="noreferrer">
            <img src="img/whatsapp-icon.png" alt="WhatsApp" className="h-6" />
          </a>
          <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition">
            Iniciar sesión
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 lg:px-32 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full max-w-7xl">
          <div className="animate__animated animate__fadeInLeft" data-sr>
            <img src="img/tienda-ilustracion.png" alt="Tienda Variedades" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
          <div className="animate__animated animate__fadeInRight text-center md:text-left" data-sr>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Sistema de Gestión para <br />
              <span className="text-indigo-500">Variedades Man's Style</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Controlá tu inventario, ventas y facturación de manera eficiente.
            </p>
            <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold transition">
              Conocer más
            </a>
          </div>
        </div>
      </main>

      {/* Secciones */}
      <section className="py-20 px-6 bg-[#141414]" data-sr>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Por qué usar nuestro sistema?</h2>
          <p className="text-gray-400 text-lg">
            Mejora el control, reduce errores y te permite enfocarte en hacer crecer tu negocio.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1c1c1c]">
        <div className="max-w-6xl mx-auto" data-sr>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Beneficios del sistema</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Inventario organizado',
                text: 'Visualizá tu stock en tiempo real y recibí alertas.',
              },
              {
                title: 'Facturación rápida',
                text: 'Generá facturas automáticamente.',
              },
              {
                title: 'Multisucursal',
                text: 'Control total de múltiples tiendas.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-indigo-400 mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
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
              <p className="text-gray-300 mb-3">“Todo más ordenado y profesional.”</p>
              <span className="text-sm text-gray-400">- Karen, encargada</span>
            </div>
            <div className="bg-[#222] p-6 rounded-lg shadow-md text-left">
              <p className="text-gray-300 mb-3">“Control total desde cualquier lugar.”</p>
              <span className="text-sm text-gray-400">- Juan, propietario</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f0f0f] text-gray-500 text-center py-6 text-sm">
        &copy; 2025 Variedades Man's Style. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;
