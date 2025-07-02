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

export const ExtraerInfoCompra = async () => {
    try {
        const response = await api.get("/productos/InfoDeCompra");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
};

export const GetIDTotals = async () => {

    try {
        const response = await api.get("/productos/totalsID");
        return response.data;
    } catch (error) {
        console.error("Error al obtener ID Totals:", error);
        return [];
    }
}

// Agregar un nuevo producto
export const agregarProducto = async (producto) => {
    try {
        const response = await api.post("/productos/agregar", producto);
        return response.data;
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return null;
    }
};

// Actualizar un producto
export const actualizarProducto = async (id, producto) => {
    try {
        const response = await api.put(`/productos/actualizar/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return null;
    }
};


export const actualizarProductoExistente = async (id, producto) => {
    try {
        const response = await api.put(`/productos/actualizarExistente/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return null;
    }
};

// Eliminar o cambiar estado de un producto
export const eliminarProducto = async (id, productoEliminado) => {
    try {
        const response = await api.put(`/productos/eliminar/${id}`, productoEliminado);
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


export const obtenerProductosPorSucursal = async (idSucursal) => {
    try {
        const response = await api.get(`/productos/sucursal/${idSucursal}`);
        return response.data; // Devuelve los productos obtenidos
    } catch (error) {
        console.error("Error al obtener productos por sucursal:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};

export const DescartarProducto = async (id, productoDescartado) => {
    try {
        const response = await api.put(`/productos/descartar/${id}`, productoDescartado);
        return response.data; 
    } catch (error) {
        console.log(productoDescartado)

        console.error("Error al descartar producto:", error);
        return null; 
    }
}