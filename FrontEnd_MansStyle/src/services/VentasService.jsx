import api from "../Api"; // Asegúrate de que api.js esté configurado con la baseURL

export const agregarVenta = async (nuevaVenta) => {
    try {
        const response = await api.post("/ventas/agregar", nuevaVenta); // Llama al endpoint
        return response.data; // Devuelve la respuesta de la API
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return null; // Devuelve null en caso de error
    }
};

export const obtenerTodasLasVentas = async () => {
    try {
        const response = await api.get("/ventas/todas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        return [];
    }
};
