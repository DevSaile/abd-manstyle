import React, { useEffect, useState, version } from "react";
import ComboBox from "../common/ComboBox";
import { Modal } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import {
  actualizarProducto,
  obtenerMarcas,
} from "../../services/ProductosService";

const ModalEditar = ({
  openEdit,
  EditModalClose,
  refrescarProductos,
  fetchProductoByID, // Método para obtener producto por ID
  productoID, // ID del producto seleccionado
}) => {
  const [categorias, setCategorias] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para el producto cargado

  // Cargar todas las categorías y sucursales al iniciar el componente
  useEffect(() => {
    Promise.all([obtenerCategoriasActivas(), obtenerSucursales()]).then(
      ([categoriasData, sucursalesData]) => {
        setCategorias(categoriasData.map((categoria) => categoria.Nombre));
        setSucursales(sucursalesData.map((sucursal) => sucursal.Nombre));
      }
    );
  }, []); // Sin dependencias: solo se ejecuta al montar el componente

  useEffect(() => {
    obtenerMarcas().then((marcas) => {
      setMarcas(marcas); // Actualiza el estado con las marcas únicas
    });
  }, []);

  // Cargar información del producto cuando el modal se abre
  useEffect(() => {
    if (openEdit && productoID) {
      fetchProductoByID(productoID).then((data) => {
        setSelectedProducto(data); // Cargar datos del producto
      });
    }
  }, [openEdit, productoID]);

  // Establecer automáticamente la categoría y sucursal en el ComboBox cuando se abra el modal
  useEffect(() => {
    if (openEdit && selectedProducto) {
      // Solo actualiza si los valores son diferentes
      const categoriaValida = categorias.includes(
        selectedProducto.Descripcion_Categoria
      )
        ? selectedProducto.Descripcion_Categoria
        : "";

      const sucursalValida = sucursales.includes(selectedProducto.Sucursal)
        ? selectedProducto.Sucursal
        : "";

      if (
        selectedProducto.Descripcion_Categoria !== categoriaValida ||
        selectedProducto.Sucursal !== sucursalValida
      ) {
        setSelectedProducto((prev) => ({
          ...prev,
          Descripcion_Categoria: categoriaValida,
          Sucursal: sucursalValida,
        }));
      }
    }
  }, [openEdit, categorias, sucursales]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProducto?.ID_Producto) return;

    const productoActualizado = {
      Nombre: selectedProducto.Nombre,
      Marca: selectedProducto.Marca,
      Precio_Producto: selectedProducto.Precio_Producto,
      Sucursal: selectedProducto.Sucursal, //Recordatorio para jeser del futuro: Cambiar a ID_Sucursal
      Descripcion_Categoria: selectedProducto.Descripcion_Categoria, //Recordatorio para jeser del futuro: Cambiar a ID_Categoria
      image: selectedProducto.image,
    };

    const resultado = await actualizarProducto(
      selectedProducto.ID_Producto,
      productoActualizado
    );
    if (resultado) {
      refrescarProductos();
      EditModalClose();
    } else {
      alert("Hubo un error al actualizar el producto.");
    }
  };

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
      {selectedProducto ? (
        <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={selectedProducto.Nombre || ""}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  Nombre: e.target.value,
                })
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
              name={selectedProducto.Marca}
              options={marcas}
              selected={selectedProducto.Marca || ""}
              onSelect={(value) =>
                setSelectedProducto({ ...selectedProducto, Marca: value })
              }
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              value={selectedProducto.Precio_Producto || ""}
              onChange={(e) =>
                setSelectedProducto({
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
              name={selectedProducto.versucu}
              options={sucursales}
              selected={selectedProducto.versucu || ""}
              onSelect={(value) =>
                setSelectedProducto({ ...selectedProducto, versucu: value })
              }
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <ComboBox
              name={selectedProducto.Descripcion_Categoria}
              options={categorias}
              selected={selectedProducto.Descripcion_Categoria || ""}
              onSelect={(value) =>
                setSelectedProducto({
                  ...selectedProducto,
                  Descripcion_Categoria: value,
                })
              }
            />
          </div>
          {/* Description */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descripcion
            </label>
            <textarea
              value={selectedProducto.Descripcion || ""}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  Descripcion: e.target.value,
                })
              }
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Añadir descripcion..."
            />
          </div>
          {/* Buttons */}
          <div className="col-span-4 flex justify-end gap-4">
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
      ) : (
        <p>Cargando producto...</p>
      )}
    </Modal>
  );
};

export default ModalEditar;
