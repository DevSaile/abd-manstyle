import api from "../Api"; // Configuración baseURL para tu API


export const loginUsuario = async (usuario, contrasena) => {
    try {
      const response = await api.post('/empleados/login', {
        Usuario: usuario,
        Contra: contrasena,
      
      });
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  };
  