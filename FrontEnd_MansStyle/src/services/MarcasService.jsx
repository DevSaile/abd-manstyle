import api from "../Api";

/*export const obtenerMarcas = async () => {
    try {
        const response = await api.get("/productos/marcas"); // Llama al endpoint de marcas
        return response.data; // Devuelve las marcas únicas
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};*/


// Obtener todas las marcas
export const obtenerMarcas = async () => {
    try {
        const response = await api.get("/marcas/todas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las marcas:", error);
        return [];
    }
};

// Obtener una marca por ID
export const obtenerMarcaPorID = async (idMarca) => {
    try {
        const response = await api.get(`/marcas/id/${idMarca}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la marca por ID:", error);
        return null;
    }
};

// Obtener información de una marca por nombre
export const obtenerNombreMarca = async (nombreMarca) => {
    try {
        const response = await api.get(`/marcas/nombre/${nombreMarca}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la marca por nombre:", error);
        return null;
    }
};

// Actualizar una marca
export const actualizarMarca = async (marca) => {
    try {
        const response = await api.put("/marcas/actualizar", marca);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la marca:", error);
        return null;
    }
};

// Eliminar una marca por ID
export const eliminarMarca = async (Marca) => {
    try {
        const response = await api.put("/marcas/eliminar", Marca);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la marca:", error);
        return null;
    }
};

// Agregar una nueva marca
export const agregarMarca = async (nuevaMarca) => {
    try {
        const response = await api.post("/marcas/agregar", nuevaMarca);
        return response.data;
    } catch (error) {
        console.error("Error al agregar una nueva marca:", error);
        return null;
    }
};