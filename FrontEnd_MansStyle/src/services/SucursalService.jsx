import api from "../Api";

// Obtener todas las sucursales
export const obtenerSucursales = async () => {
    try {
        const response = await api.get("/sucursales");
        return response.data;
    } catch (error) {
        console.error("Error al obtener sucursales:", error);
        return [];
    }
};

// Obtener ID de sucursal por ID de empleado
export const obtenerSucursalPorEmpleado = async (idempleado) => {
    try {
        const response = await api.get(`/sucursales/empleado/${idempleado}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener ID de sucursal por empleado:", error);
        return null;
    }
};

// Devolver sucursal asociada a un producto
export const devolverSucursalPorProducto = async (idproducto) => {
    try {
        const response = await api.get(`/sucursales/producto/${idproducto}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener sucursal por producto:", error);
        return null;
    }
};

// Devolver marca asociada a un producto
export const devolverMarcaPorProducto = async (idproducto) => {
    try {
        const response = await api.get(`/sucursales/marca/${idproducto}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener marca por producto:", error);
        return null;
    }
};

// Obtener sucursales asociadas a un producto por ID
export const obtenerSucursalesPorIDProducto = async (idproducto) => {
    try {
        const response = await api.get(`/sucursales/producto/sucursales/${idproducto}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener sucursales por ID de producto:", error);
        return [];
    }
};

// Obtener totales relacionados con una sucursal específica
export const obtenerTotalesPorSucursal = async (idSucursal) => {
    try {
        const response = await api.get(`/sucursales/totales/${idSucursal}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener totales por sucursal:", error);
        return null;
    }
};

// Obtener productos agrupados por categoría para una sucursal específica
export const obtenerProductosPorCategoria = async (idSucursal) => {
    try {
        const response = await api.get(`/sucursales/categorias/${idSucursal}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        return [];
    }
};

// Obtener los 5 productos con mayor stock para una sucursal específica
export const obtenerTop5ProductosMayorStock = async (idSucursal) => {
    try {
        const response = await api.get(`/sucursales/top-stock/${idSucursal}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos con mayor stock:", error);
        return [];
    }
};

// Obtener productos con bajo stock para una sucursal específica según un umbral
export const obtenerProductosBajoStock = async (idSucursal, umbral) => {
    try {
        const response = await api.get(`/sucursales/bajo-stock/${idSucursal}/${umbral}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos con bajo stock:", error);
        return [];
    }
};
