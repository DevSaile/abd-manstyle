import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ParticlesBackground from '../../components/public/common/ParticlesBackground';
import { loginUsuario } from '../../services/LoginService'; 

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUsuario(usuario, contrasena);
      console.log('Respuesta del servidor:', response);

      if (response && response.ID_Vendedor) { 
     
        const userRole = response.NombreRol

        localStorage.setItem('usuario', JSON.stringify(response)); 
        localStorage.setItem('rol', userRole); // Assuming the role is returned as "rol"
        localStorage.setItem('isAuthenticated', 'true'); // Mark the user as authenticated

        console.log('Rol guardado en localStorage:', userRole);

        console.log('Usuario guardado en localStorage:', response);
        navigate('/inicio'); 
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales incorrectas o error en el servidor');
    }
  };

  const handleForgotPassword = () => {
    // Lógica adicional, por ejemplo: validación
    navigate("/recuperar-contrasena");
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo de partículas */}
      <ParticlesBackground color="#0f0f0f" />

      {/* Formulario de login */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center relative z-10">
        <h1 className="text-white text-5xl font-extrabold mb-6 tracking-wide">
          <span className="azul-claro">Variedades</span> Man's Style
        </h1>
        <h2 className="text-white text-2xl mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-sm">
          <a href="#" className="text-blue-400 hover:underline">
            Recuperar cuenta
          </a>{' '}
          |{' '}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            Olvidé mi contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
