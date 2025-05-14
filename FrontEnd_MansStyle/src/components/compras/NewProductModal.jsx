import React, { useState } from "react";
import ComboBoxID from "../common/ComboxID";
import { Drawer } from "@rewind-ui/core";

const NewProduct = ({ openAdd, AddModalClose }) => {
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Precio_Compra: "",
    Precio_Venta: "",
    Marca: "",
    Detalles: "",
    ID_Sucursal: "",
    ID_Categoria: "",
    url_image: "",
    Cantidad: "",
    archivoImagen: null,
  });

  // Mock data for categories and branches
  const categorias = [
    { label: "Electrónica", value: "1" },
    { label: "Ropa", value: "2" },
    { label: "Hogar", value: "3" },
  ];

  const sucursales = [
    { label: "Sucursal A", value: "A" },
    { label: "Sucursal B", value: "B" },
    { label: "Sucursal C", value: "C" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto agregado:", newProduct);
    AddModalClose();
  };

  return (
    <Drawer
      open={openAdd}
      onClose={AddModalClose}
      title="Agregar Producto"
      size="lg"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6"
      transition={{ duration: 0.3 }}
      overlayCloseOnClick={false}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Vista previa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-gray-300">Vista Previa</label>
            <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-600">
              <img
                src={
                  newProduct.archivoImagen
                    ? URL.createObjectURL(newProduct.archivoImagen)
                    : newProduct.url_image || "https://via.placeholder.com/150"
                }
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subir Imagen (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const archivo = e.target.files[0];
                  if (archivo) {
                    setNewProduct({
                      ...newProduct,
                      archivoImagen: archivo,
                      url_image: "", // Clear URL if a file is uploaded
                    });
                  }
                }}
                className="text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                O ingresa una URL de imagen
              </label>
              <input
                type="text"
                value={newProduct.url_image}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    url_image: e.target.value,
                    archivoImagen: null, // Clear file if a URL is entered
                  })
                }
                className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Datos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              value={newProduct.Nombre}
              onChange={(e) => setNewProduct({ ...newProduct, Nombre: e.target.value })}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Precios y Marca */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Precio de Venta</label>
            <input
              type="number"
              value={newProduct.Precio_Venta}
              onChange={(e) => setNewProduct({ ...newProduct, Precio_Venta: e.target.value })}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Marca</label>
            <input
              type="text"
              value={newProduct.Marca}
              onChange={(e) => setNewProduct({ ...newProduct, Marca: e.target.value })}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Sucursal y Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Sucursal</label>
            <ComboBoxID
              name="Seleccionar Sucursal"
              options={sucursales}
              selected={{
                label: newProduct.Nombre_Sucursal || "",
                value: newProduct.ID_Sucursal || "",
              }}
              onSelect={(selectedOption) =>
                setNewProduct({
                  ...newProduct,
                  ID_Sucursal: selectedOption.value,
                  Nombre_Sucursal: selectedOption.label,
                })
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
            <ComboBoxID
              name="Seleccionar Categoria"
              options={categorias}
              selected={{
                label: newProduct.Nombre_Categoria || "",
                value: newProduct.ID_Categoria || "",
              }}
              onSelect={(selectedOption) =>
                setNewProduct({
                  ...newProduct,
                  ID_Categoria: selectedOption.value,
                  Nombre_Categoria: selectedOption.label,
                })
              }
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
          <textarea
            value={newProduct.Detalles || ""}
            onChange={(e) => setNewProduct({ ...newProduct, Detalles: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Añadir descripción del producto..."
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={AddModalClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default NewProduct;