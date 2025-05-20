import React, { useEffect, useState, version } from "react";
import ComboBoxID from "../common/ComboxID";
import { Modal } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import { actualizarProducto } from "../../services/ProductosService";

import { obtenerMarcas } from "../../services/MarcasService"; // Asegúrate de importar el método correcto
import { subirImagen } from "../../services/UploadService";

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
  const [selectedProducto, setSelectedProducto] = useState({
    ID_Producto: null,
    Nombre: "",
    ID_Marca: null,
    Precio_Producto: 0,
    ID_Sucursal: null,
    ID_Categoria: null,
    url_image: "",
    Detalles: "",
    Nombre_Marca: "",
    Nombre_Sucursal: "",
    Nombre_Categoria: "",
    // Para manejo de imagen
    nuevaImagen: null, // Para archivos subidos
    usarURL: false, // Flag para saber si usar URL
  });

  useEffect(() => {
    Promise.all([
      obtenerCategoriasActivas(),
      obtenerSucursales(),
      obtenerMarcas(),
    ]).then(([categoriasData, sucursalesData, marcasData]) => {
      setCategorias(
        categoriasData.map((c) => ({ label: c.Nombre, value: c.ID_Categoria }))
      );
      setSucursales(
        sucursalesData.map((s) => ({ label: s.Nombre, value: s.ID_Sucursal }))
      );
      setMarcas(
        marcasData.map((m) => ({ label: m.Nombre, value: m.ID_Marca }))
      );
    });
  }, []);

  useEffect(() => {
    if (openEdit && productoID) {
      fetchProductoByID(productoID).then((data) => {
        setSelectedProducto({
          ...data,
          nuevaImagen: null,
          usarURL: false,
        });
      });
    }
  }, [openEdit, productoID]);

  const esURLValida = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Obtener URL para vista previa
  const obtenerUrlVistaPrevia = () => {
    if (selectedProducto.nuevaImagen) {
      return URL.createObjectURL(selectedProducto.nuevaImagen);
    }
    if (selectedProducto.usarURL && selectedProducto.url_image) {
      return selectedProducto.url_image;
    }
    if (selectedProducto.url_image && esURLValida(selectedProducto.url_image)) {
      return selectedProducto.url_image;
    }
    return "https://via.placeholder.com/150";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let urlImagenFinal = selectedProducto.url_image;

      // Subir nueva imagen si existe
      if (selectedProducto.nuevaImagen) {
        const resultado = await subirImagen(selectedProducto.nuevaImagen);
        urlImagenFinal = resultado?.url || resultado;
      }
      // Usar URL directa si es válida y no hay archivo subido
      else if (
        selectedProducto.usarURL &&
        esURLValida(selectedProducto.url_image)
      ) {
        urlImagenFinal = selectedProducto.url_image;
      }
      // Si no hay imagen nueva ni URL válida, mantener la existente (puede ser vacía)

      const productoActualizado = {
        ID_Producto: selectedProducto.ID_Producto,
        Nombre: selectedProducto.Nombre.trim(),
        ID_Marca: selectedProducto.ID_Marca,
        Precio_Producto: parseFloat(selectedProducto.Precio_Producto),
        ID_Sucursal: selectedProducto.ID_Sucursal,
        ID_Categoria: selectedProducto.ID_Categoria,
        url_image: urlImagenFinal,
        Detalles: selectedProducto.Detalles?.trim() || "",
      };

      const resultado = await actualizarProducto(
        selectedProducto.ID_Producto,
        productoActualizado
      );

      if (!resultado) throw new Error("Error al actualizar");

      refrescarProductos();
      EditModalClose();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al actualizar el producto");
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
              Nombre
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
              Marca
            </label>
            <ComboBoxID
              name={selectedProducto.Marca}
              options={marcas}
              selected={{
                label: selectedProducto.Nombre_Marca || "", // Muestra el nombre
                value: selectedProducto.ID_Marca || "", // Pero maneja el ID
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Marca: selectedOption.value, // Guarda el ID
                  Nombre_Marca: selectedOption.label, // Opcional: guarda el nombre para mostrar
                })
              }
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Precio
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
            <ComboBoxID
              name={selectedProducto.versucu}
              options={sucursales}
              selected={{
                label: selectedProducto.Nombre_Sucursal || "", // Muestra el nombre
                value: selectedProducto.ID_Sucursal || "", // Pero maneja el ID
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Sucursal: selectedOption.value, // Guarda el ID
                  Nombre_Sucursal: selectedOption.label, // Opcional: guarda el nombre para mostrar
                })
              }
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Categoria
            </label>
            <ComboBoxID
              name={selectedProducto.Descripcion_Categoria}
              options={categorias}
              selected={{
                label: selectedProducto.Nombre_Categoria || "",
                value: selectedProducto.ID_Categoria || "",
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Categoria: selectedOption.value,
                  Nombre_Categoria: selectedOption.label,
                })
              }
            />
          </div>
          {/* Sección de imagen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start col-span-4">
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Vista Previa
              </label>
              <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-600">
                <img
                  src={obtenerUrlVistaPrevia()}
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
                    setSelectedProducto({
                      ...selectedProducto,
                      nuevaImagen: archivo,
                      usarURL: false,
                    });
                  }}
                  className="text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  O usar URL de imagen
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducto.usarURL}
                    onChange={(e) =>
                      setSelectedProducto({
                        ...selectedProducto,
                        usarURL: e.target.checked,
                        nuevaImagen: e.target.checked
                          ? null
                          : selectedProducto.nuevaImagen,
                      })
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={selectedProducto.url_image}
                    onChange={(e) =>
                      setSelectedProducto({
                        ...selectedProducto,
                        url_image: e.target.value,
                      })
                    }
                    disabled={!selectedProducto.usarURL}
                    className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descripcion
            </label>
            <textarea
              value={selectedProducto.Detalles || ""}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  Detalles: e.target.value,
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
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-gray-100 hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
            >
              Guardar
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
