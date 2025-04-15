import React, { useEffect, useState } from "react";
import ComboBoxID from "../common/ComboxID";
import { Modal } from "@rewind-ui/core";

import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import { agregarCompraProducto } from "../../services/CompraHitorialService";
import { agregarProducto } from "../../services/ProductosService";

const ModalCompra = ({ openAdd, AddModalClose, refrescarProductos }) => {
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Precio_Compra: "",
    Precio_Venta: "",
    Marca: "",
    Detalles: "",
    ID_Sucursal: "",
    ID_Categoria: "",
    url_image: "",
    Cantidad: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    Promise.all([obtenerCategoriasActivas(), obtenerSucursales()]).then(
      ([categoriasData, sucursalesData]) => {
        setCategorias(
          categoriasData.map((categoria) => ({
            label: categoria.Nombre,
            value: categoria.ID_Categoria,
          }))
        );
        setSucursales(
          sucursalesData.map((sucursal) => ({
            label: sucursal.Nombre,
            value: sucursal.ID_Sucursal,
          }))
        );
      }
    );
  }, []);

  const esURLValida = (url) => {
    return typeof url === "string" && url.startsWith("http");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productoDTO = {
      Nombre: newProduct.Nombre,
      Marca: newProduct.Marca,
      ID_Sucursal: newProduct.ID_Sucursal,
      ID_Categoria: newProduct.ID_Categoria,
      Cantidad: parseInt(newProduct.Cantidad),
      Precio_Producto: parseFloat(newProduct.Precio_Venta),
      Precio_Compra: parseFloat(newProduct.Precio_Compra),
      Detalles: newProduct.Descripcion,
      Estado: 1,
      url_image: esURLValida(newProduct.url_image) ? newProduct.url_image : null,
    };

    const response = await agregarProducto(productoDTO);
    if (!response || !response.ID_Producto) {
      alert("Error al agregar el producto");
      return;
    }

    const compraDTO = {
      Estado: 1,
      ID_Producto: response.ID_Producto,
      Fecha_Compra: new Date().toISOString().split("T")[0],
      Precio_Compra: parseFloat(newProduct.Precio_Compra),
      CantidadCompra: parseInt(newProduct.Cantidad),
    };

    const compraResult = await agregarCompraProducto(compraDTO);
    if (!compraResult) {
      alert("Error al registrar la compra");
      return;
    }

    refrescarProductos();
    AddModalClose();
  };

  return (
    <Modal
      open={openAdd}
      onClose={AddModalClose}
      title="Add Product"
      size="lg"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-1 gap-4"
      transition={{ duration: 1.5 }}
      overlayCloseOnClick={false}
    >
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Product Image Section */}
        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-300 mb-2">Vista Previa</label>
            <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-600">
              <img
                src={newProduct.url_image ? newProduct.url_image : "https://via.placeholder.com/150"}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subir Imagen (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewProduct({ ...newProduct, url_image: reader.result });
                    };
                    reader.readAsDataURL(file);
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
                value={newProduct.url_image || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, url_image: e.target.value })
                }
                className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-5 gap-4">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              value={newProduct.Nombre}
              onChange={(e) => setNewProduct({ ...newProduct, Nombre: e.target.value })}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad</label>
            <input
              type="number"
              value={newProduct.Cantidad || ""}
              onChange={(e) => setNewProduct({ ...newProduct, Cantidad: e.target.value })}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Precio de Compra</label>
          <input
            type="number"
            value={newProduct.Precio_Compra}
            onChange={(e) => setNewProduct({ ...newProduct, Precio_Compra: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

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

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
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

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
          <textarea
            value={newProduct.Descripcion || ""}
            onChange={(e) => setNewProduct({ ...newProduct, Descripcion: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Añadir descripción del producto..."
          />
        </div>

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
