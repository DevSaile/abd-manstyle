import React from "react";
import ComboBox from "../common/ComboBox";
import { Modal } from "@rewind-ui/core";

const ModalEditar = ({
  openEdit,
  EditModalClose,
  selectedProducto,
  setSelectedProduct,
  Sucursales, // Pass Sucursales as a prop
}) => {
  return (
    <Modal
      open={openEdit}
      onClose={EditModalClose}
      title="Edit Product"
      size="xl"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-1 gap-4"
      transition={{ duration: 1.5 }}
      overlayCloseOnClick={false}
    >
      <form className="grid grid-cols-4 gap-4">
        {/* Name */}
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={selectedProducto?.Nombre || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProducto, Nombre: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

            {/* Brand */}
            <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Brand
          </label>
          <ComboBox
            name="Brand"
            options={["Brand A", "Brand B", "Brand C"]}
            selected={selectedProducto?.Marca || ""}
            onSelect={(value) =>
              setSelectedProduct({ ...selectedProducto, Marca: value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Price
          </label>
          <input
            type="number"
            value={selectedProducto?.Precio_Producto || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProducto,
                Precio_Producto: e.target.value,
              })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            selected={selectedProducto?.Sucursal || ""}
            onSelect={(value) =>
              setSelectedProduct({ ...selectedProducto, Sucursal: value })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <ComboBox
            name="Category"
            options={["Category A", "Category B", "Category C"]}
            selected={selectedProducto?.Descripcion_Categoria || ""}
            onSelect={(value) =>
              setSelectedProduct({
                ...selectedProducto,
                Descripcion_Categoria: value,
              })
            }
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setSelectedProduct({
                    ...selectedProducto,
                    image: event.target.result,
                  });
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
            onClick={EditModalClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-gray-100 hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditar;