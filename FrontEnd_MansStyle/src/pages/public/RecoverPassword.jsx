import { useState } from "react";
import { solicitarRecuperacion } from "@/services/LoginService";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const response = await solicitarRecuperacion(email);
      if (response && response.success) {
        setMensaje("Se ha enviado un enlace de recuperación a tu correo.");
      } else {
        setError("No se pudo enviar el correo. Verifica tu email.");
      }
    } catch (err) {
      console.error("Error solicitando recuperación:", err);
      setError("Hubo un error, intenta más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-[poppins]">
      <div className="bg-[#18181b] p-10 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        <h1 className="text-lg font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg text-center font-[poppins]">
          Recuperar Contraseña
        </h1>

        <form onSubmit={handleRecover} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 text-sm rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[poppins] placeholder-gray-400"
            required
          />

          {error && <p className="text-red-400 text-xs -mt-2">{error}</p>}
          {mensaje && <p className="text-green-400 text-xs -mt-2">{mensaje}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg w-full font-semibold transition duration-300 shadow-lg font-[poppins] text-sm"
          >
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
