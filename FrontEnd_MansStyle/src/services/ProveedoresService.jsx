import api from "../Api"; // Asegúrate de que api.js está configurado con la baseURL

// Obtener todas las categorías activas
export const obtenerProveedoresActivos = async () => {
    try {
        const response = await api.get("/proveedores/activos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener Proveedores activos:", error);
        return [];
    }
};