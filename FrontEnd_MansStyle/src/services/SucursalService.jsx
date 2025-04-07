import api from "../Api";

// Obtener todos los productos
export const obtenerSucursales = async () => {
    try {
        const response = await api.get("/Sucursales");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las Sucursales:", error);
        return [];
    }
};