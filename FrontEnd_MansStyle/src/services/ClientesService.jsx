import api from "../Api"; // Asegúrate de que api.js está configurado con la baseURL

export const obtenerClientesActivos = async () => {
    try {
        const response = await api.get("/clientes/activos"); // Llama al endpoint
        return response.data; // Devuelve los clientes activos
    } catch (error) {
        console.error("Error al obtener clientes activos:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};