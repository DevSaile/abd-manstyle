import { useState } from "react";
import { solicitarRecuperacion } from "../../services/LoginService"; // Este servicio lo crearemos ahorita

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h1>

        <form onSubmit={handleRecover}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          {mensaje && <p className="text-green-400 text-sm mb-4">{mensaje}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full transition duration-300"
          >
            Recuperar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
