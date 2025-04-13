import api from "../Api"; // Asegúrate de que api.js está configurado con la baseURL

// Obtener todas las categorías activas
export const obtenerCategoriasActivas = async () => {
    try {
        const response = await api.get("/categorias/activas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías activas:", error);
        return [];
    }
};

// Obtener todas las categorías inactivas
export const obtenerCategoriasInactivas = async () => {
    try {
        const response = await api.get("/categorias/inactivas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías inactivas:", error);
        return [];
    }
};

// Obtener categorías por ID de producto
export const obtenerCategoriasPorID = async (idCategoria) => {
    try {
        const response = await api.get(`/categorias/producto/${idCategoria}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías por ID de producto:", error);
        return [];
    }
};

// Obtener información de una categoría por nombre
export const obtenerNombreCategoria = async (nombreCategoria) => {
    try {
        const response = await api.get(`/categorias/nombre/${nombreCategoria}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener nombre de la categoría:", error);
        return null;
    }
};

// Actualizar una categoría
export const actualizarCategoria = async (categoria) => {
    try {
        const response = await api.put("/categorias/actualizar", categoria);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return null;
    }
};

// Cambiar estado de una categoría (Eliminar/Inactivar)
export const eliminarCategoria = async (categoria) => {
    try {
        const response = await api.put("/categorias/eliminar", categoria);
        return response.data;
    } catch (error) {
        console.error("Error al cambiar el estado de la categoría:", error);
        return null;
    }
};

// Agregar una nueva categoría
export const agregarCategoria = async (nuevaCategoria) => {
    try {
        const response = await api.post("/categorias/agregar", nuevaCategoria);
        return response.data;
    } catch (error) {
        console.error("Error al agregar una nueva categoría:", error);
        return null;
    }
};