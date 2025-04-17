import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import { agregarCompraProducto } from "../../services/CompraHitorialService";
import { actualizarProductoExistente } from "../../services/ProductosService";

const ModalCompraExistente = ({
  openExistente,
  ExistenteModalClose,
  refrescarProductos,
  fetchProductoByID,
  productoID,
}) => {
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [cantidadCompra, setCantidadCompra] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");

  // Cargar información del producto existente
  useEffect(() => {
    if (openExistente && productoID) {
      fetchProductoByID(productoID).then((data) => {
        setSelectedProducto(data);
        setPrecioCompra("");
        setCantidadCompra(""); // no prellenes la cantidad
      });
    }
  }, [openExistente, productoID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCantidadTotal = parseInt(selectedProducto.Cantidad) + parseInt(cantidadCompra);

    const productoActualizado = {
      ID_Producto: productoID,
      Cantidad: nuevaCantidadTotal,
    };

    // Actualizar cantidad del producto existente
    const response = await actualizarProductoExistente(
      productoID,
      productoActualizado
    );

    if (!response || !response.productId) {
      alert("Error al actualizar el producto.");
      return;
    }
    

    // Registrar la compra
    const compraDTO = {
      Estado: 1,
      ID_Producto: response.productId,
      Fecha_Compra: new Date().toISOString().split("T")[0],
      Precio_Compra: parseFloat(precioCompra),
      CantidadCompra: parseInt(cantidadCompra),
    };

    const compraResult = await agregarCompraProducto(compraDTO);

    if (!compraResult) {
      alert("Error al registrar la compra.");
      return;
    }

    refrescarProductos();
    ExistenteModalClose();
  };

  return (
    <Modal
      open={openExistente}
      onClose={ExistenteModalClose}
      title={`Agregar Compra - ${selectedProducto?.Nombre || "Producto"}`}
      size="md"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-1 gap-4"
      transition={{ duration: 1.5 }}
      overlayCloseOnClick={false}
    >
      {selectedProducto && (
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={selectedProducto.Nombre}
              disabled
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Precio de Compra
            </label>
            <input
              type="number"
              step="0.01"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Cantidad Comprada
            </label>
            <input
              type="number"
              value={cantidadCompra}
              onChange={(e) => setCantidadCompra(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={ExistenteModalClose}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-gray-100 hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
            >
              Agregar Compra
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ModalCompraExistente;
