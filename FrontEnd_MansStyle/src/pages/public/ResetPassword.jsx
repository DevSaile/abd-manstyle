import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordService } from "@/services/LoginService"; // Lo creamos ahorita

const ResetPassword = () => {
  const { token } = useParams(); // Capturamos el token de la URL
  const navigate = useNavigate();
  
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const result = await ResetPasswordService(token, nuevaContrasena);

      if (result.success) {
        setSuccess("Contraseña actualizada exitosamente. Redirigiendo...");
        setTimeout(() => navigate("/login"), 3000); // Redirige al login en 3 segundos
      } else {
        setError("Error al actualizar contraseña.");
      }
    } catch (err) {
      console.error("Error al resetear contraseña:", err);
      setError("Error al resetear contraseña.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-white text-2xl font-bold mb-4">Resetear Contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            className="w-full p-2 rounded bg-black text-white focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Resetear
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
