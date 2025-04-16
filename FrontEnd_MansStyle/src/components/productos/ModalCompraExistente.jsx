import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import { agregarCompraProducto } from "../../services/CompraHitorialService";

const ModalCompraExistente = ({ openExistente, ExistenteModalClose, refrescarProductos, selectedProducto }) => {
  const [compraData, setCompraData] = useState({
    ID_Producto: "",
    Precio_Compra: "",
    Cantidad: "",
  });

  useEffect(() => {
    if (selectedProducto) {
      setCompraData({
        ...compraData,
        ID_Producto: selectedProducto.ID_Producto,
      });
    }
  }, [selectedProducto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const compraDTO = {
      Estado: 1,
      ID_Producto: compraData.ID_Producto,
      Fecha_Compra: new Date().toISOString().split("T")[0],
      Precio_Compra: parseFloat(compraData.Precio_Compra),
      CantidadCompra: parseInt(compraData.Cantidad),
    };

    const compraResult = await agregarCompraProducto(compraDTO);
    if (!compraResult) {
      alert("Error al registrar la compra");
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
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del Producto</label>
          <input
            type="text"
            value={selectedProducto?.Nombre || ""}
            disabled
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Precio de Compra</label>
          <input
            type="number"
            value={compraData.Precio_Compra}
            onChange={(e) => setCompraData({ ...compraData, Precio_Compra: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad</label>
          <input
            type="number"
            value={compraData.Cantidad}
            onChange={(e) => setCompraData({ ...compraData, Cantidad: e.target.value })}
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
    </Modal>
  );
};

export default ModalCompraExistente;