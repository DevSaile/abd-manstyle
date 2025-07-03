import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "@/components/public/common/ParticlesBackground";
//import tiendaImg from "@/assest/login_image.webp";
import { loginUsuario } from "@/services/LoginService";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUsuario(usuario, contrasena);

      if (response && response.access_token && response.empleado) {

        const empleadoInfo = response.empleado;

        const userRole = empleadoInfo.NombreRol; 
        const idSucursal = empleadoInfo.ID_Sucursal; 
        //const idEmpleado = empleadoInfo.ID_Empleado; 

        localStorage.setItem("accessToken", response.access_token);

        localStorage.setItem("usuario", JSON.stringify(empleadoInfo)); 
        localStorage.setItem("rol", userRole); 
        localStorage.setItem("idSucursal", idSucursal); 
        localStorage.setItem("isAuthenticated", "true");

        if(userRole === "Administrador") {
        navigate("/admin/inicio");
        }
        else{
                  navigate("/admin/venta");

        }
      } else {
        setError(
          "Credenciales incorrectas o datos de usuario incompletos en la respuesta."
        );
      }
    } catch (err) {
      console.error("Error durante el login:", err); 
      setError(
        "Credenciales incorrectas o error en el servidor. Intenta de nuevo."
      );

    }
  };

  const handleForgotPassword = () => {
    navigate("/recuperar-contrasena");
  };

  return (
    <div className="flex justify-end min-h-screen font-[poppins] bg-black">
      {/* Fondo de partículas */}
      <ParticlesBackground color="#0f0f0f" />

      {/* Imagen a la izquierda */}

      {/* Formulario de login a la derecha */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#18181b] p-10 text-center relative z-10 min-h-screen shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg font-[poppins] tracking-wide">
          Variedades Man's Style
        </h1>
        <h2 className="text-xl md:text-2xl mb-10 text-gray-200 font-semibold font-[poppins]">
          Iniciar Sesión
        </h2>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mx-auto flex flex-col gap-7"
        >
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[poppins] placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[poppins] placeholder-gray-400"
              required
            />
          </div>
          {error && <p className="text-red-400 -mt-4">{error}</p>}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl w-full font-semibold transition duration-300 shadow-lg font-[poppins]"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-10 text-sm flex flex-col gap-2">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-indigo-300 hover:underline focus:outline-none font-[poppins] transition"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
