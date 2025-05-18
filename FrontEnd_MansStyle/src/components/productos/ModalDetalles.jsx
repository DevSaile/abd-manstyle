import React from "react";
import { Modal } from "@rewind-ui/core";

const ModalDetalles = ({ openDetails, DetailsModalClose, product }) => {
  // Default placeholder data
  const defaultProduct = {
    Nombre: "",
    Precio_Producto: "",
    Marca: "",
    Descripcion_Sucursal: "",
    Descripcion_Categoria: "",
    url_image: null,
  };

  // Use product data if available, otherwise fallback to default data
  const displayProduct = product || defaultProduct;

  return (
    <Modal
      open={openDetails}
      onClose={DetailsModalClose}
      title="Detalles del Producto"
      size="lg"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
      transition={{ duration: 1.5 }}
      overlayCloseOnClick={false}
    >
      <div className="grid grid-cols-2 grid-rows-5 gap-4">
        {/* Name */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Nombre:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Nombre}
          </p>
        </div>

        {/* Selling Price */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Precio de Venta:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Precio_Producto}
          </p>
        </div>

        {/* Brand */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Marca:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Marca}
          </p>
        </div>

        {/* Sucursal */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Sucursal:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Descripcion_Sucursal}
          </p>
        </div>

        {/* Category */}
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Categoría:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Descripcion_Categoria}
          </p>
        </div>

        {/* Description */}
        <div className="flex items-center rpw-span-3">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Descripción:
          </label>
          <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2 w-2/3">
            {displayProduct.Detalles}
          </p>
        </div>

        {/* Image */}
        <div className="flex items-center row-span-2">
          <label className="block text-sm font-medium text-gray-300 w-1/3">
            Imagen:
          </label>
          <div className="w-2/3">
            {displayProduct.url_image ? (
              <img
                src={displayProduct.url_image}
                alt="Product"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2">
                No hay imagen disponible
              </p>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={DetailsModalClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetalles;