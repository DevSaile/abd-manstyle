import api from "../Api"; // Asegúrate de que api.js está configurado con la baseURL

// Agregar una nueva compra de producto
export const agregarCompraProducto = async (nuevaCompra) => {
    try {
        const response = await api.post("/compra_entrada/agregar", nuevaCompra);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al registrar la compra:", error);
        return null; // Devuelve null en caso de error
    }
};


// Obtener el registro completo de compras
export const obtenerRegistroCompras = async () => {
    try {
        const response = await api.get("/compra_entrada");
        return response.data; // Devuelve el registro completo de compras
    } catch (error) {
        console.error("Error al obtener el registro de compras:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};


// Obtener compras dentro de un rango de fechas
export const obtenerRegistroComprasPorFechas = async (fechaInicio, fechaFin) => {
    try {
        const response = await api.get(`/compra_entrada/rango`, {
            params: { fechaInicio, fechaFin }, // Pasa los parámetros en la query string
        });
        return response.data; // Devuelve los registros filtrados por rango de fechas
    } catch (error) {
        console.error("Error al obtener compras por rango de fechas:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};