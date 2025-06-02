import api from "../Api"; // Configuración baseURL para tu API


export const loginUsuario = async (usuario, contrasena) => {
    try {
      const response = await api.post('/Auth/login', {
        Usuario: usuario,
        Contra: contrasena,
      
      });
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
};

// Solicitar recuperación de contraseña
export const solicitarRecuperacion = async (email) => {
  try {
    const response = await api.post("/Auth/solicitar-recuperacion", { email });
    return response.data;
  } catch (error) {
    console.error("Error solicitando recuperación:", error);
    return null;
  }
};

// Resetear contraseña usando token
export const ResetPasswordService = async (token, nuevaContrasena) => {
  try {
    const response = await api.post("/Auth/resetear-contrasena", {
      token,
      nuevaContrasena,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el servicio de reset password:", error);
    return { success: false };
  }
};


  