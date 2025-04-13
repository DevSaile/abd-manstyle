import React, { useState } from "react";
import ComboBox from "../common/ComboBox";
import { Modal } from "@rewind-ui/core";

const ModalCompra = ({
  openAdd,
  AddModalClose,
  Sucursales,
  onAddProduct,
}) => {
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Precio_Compra: "",
    Precio_Venta: "",
    Marca: "",
    Sucursal: "",
    Descripcion_Categoria: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(newProduct.Precio_Venta) > parseFloat(newProduct.Precio_Compra)) {
      alert("Selling price cannot be higher than the buying price.");
      return;
    }
    onAddProduct(newProduct);
    AddModalClose();
  };

  return (
    <Modal
      open={openAdd}
      onClose={AddModalClose}
      title="Add Product"
      size="xl"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-1 gap-4"
      transition={{ duration: 1.5 }}
      overlayCloseOnClick={false}
    >
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={newProduct.Nombre}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Nombre: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Buying Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Precio de Compra
          </label>
          <input
            type="number"
            value={newProduct.Precio_Compra}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Precio_Compra: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Precio de Venta
          </label>
          <input
            type="number"
            value={newProduct.Precio_Venta}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Precio_Venta: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Marca
          </label>
          <ComboBox
            name="Brand"
            options={["Brand A", "Brand B", "Brand C"]}
            selected={newProduct.Marca}
            onSelect={(value) =>
              setNewProduct({ ...newProduct, Marca: value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sucursal */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Sucursal
          </label>
          <ComboBox
            name="Sucursal"
            options={Sucursales}
            selected={newProduct.Sucursal}
            onSelect={(value) =>
              setNewProduct({ ...newProduct, Sucursal: value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Categoria
          </label>
          <ComboBox
            name="Category"
            options={["Category A", "Category B", "Category C"]}
            selected={newProduct.Descripcion_Categoria}
            onSelect={(value) =>
              setNewProduct({ ...newProduct, Descripcion_Categoria: value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Cargar Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setNewProduct({ ...newProduct, image: event.target.result });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4">
          <button
            type="button"
            onClick={AddModalClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-gray-100 hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCompra;