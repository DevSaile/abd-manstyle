import api from "../Api";

// Obtener todos los productos
export const obtenerProductos = async () => {
    try {
        const response = await api.get("/productos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
};

// Agregar un nuevo producto
export const agregarProducto = async (producto) => {
    try {
        const response = await api.post("/productos", producto);
        return response.data;
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return null;
    }
};

// Actualizar un producto
export const actualizarProducto = async (id, producto) => {
    try {
        const response = await api.put(`/productos/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return null;
    }
};

// Eliminar o cambiar estado de un producto
export const actualizarEstadoProducto = async (id, estado) => {
    try {
        const response = await api.put(`/productos/estado/${id}`, { ID_Producto: id, Estado: estado });
        return response.data;
    } catch (error) {
        console.error("Error al cambiar estado del producto:", error);
        return null;
    }
};

// Buscar un producto por ID
export const obtenerProductoPorID = async (id) => {
    try {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return null;
    }
};