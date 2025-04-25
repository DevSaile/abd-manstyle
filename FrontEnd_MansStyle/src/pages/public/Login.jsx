import React from 'react';
import ParticlesBackground from '../../components/public/common/ParticlesBackground';

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Particle Background */}
      <ParticlesBackground color="#0f0f0f" />

      {/* Login Form */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center relative z-10">
        <h1 className="text-white text-5xl font-extrabold mb-6 tracking-wide">
          <span className="azul-claro">Variedades</span> Man's Style
        </h1>
        <h2 className="text-white text-2xl mb-4">Iniciar Sesión</h2>

        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {}}
              className="absolute right-2 top-2 text-blue-500"
            >
              👁️
            </button>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition duration-300">
            Iniciar sesión
          </button>
          <div className="mt-4 text-sm">
            <a href="#" className="text-blue-400 hover:underline">
              Recuperar cuenta
            </a>{' '}
            |{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Olvidé mi contraseña
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;