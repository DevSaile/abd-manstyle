import api from "../Api";

export const obtenerMarcas = async () => {
    try {
        const response = await api.get("/productos/marcas"); // Llama al endpoint de marcas
        return response.data; // Devuelve las marcas únicas
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};