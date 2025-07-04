import React, { useEffect, useState } from "react";
import ComboBoxID from "../common/ComboxID";
import { Modal } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import { actualizarProducto } from "../../services/ProductosService";
import { obtenerMarcas } from "../../services/MarcasService";
import { subirImagen, eliminarImagen } from "../../services/UploadService";
import ShowToast from "@/components/common/ShowToast";

const ModalEditar = ({
  openEdit,
  EditModalClose,
  refrescarProductos,
  fetchProductoByID,
  productoID,
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
    nuevaImagen: null,
    usarURL: false,
  });

  // Toast para edición exitosa
  const [openToastEdit, setOpenToastEdit] = useState(false);

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

      // Eliminar la imagen existente si hay una nueva imagen
      if (selectedProducto.nuevaImagen) {
        if (selectedProducto.url_image && esURLValida(selectedProducto.url_image)) {
          await eliminarImagen(selectedProducto.url_image);
        }

        // Subir la nueva imagen
        const extension = selectedProducto.nuevaImagen.name.split('.').pop();
        const nombreFinal = `Producto_${selectedProducto.ID_Producto}.${extension}`;
        const resultadoSubida = await subirImagen(selectedProducto.nuevaImagen, nombreFinal);
        urlImagenFinal = resultadoSubida?.url || resultadoSubida;
        
      } else if (selectedProducto.usarURL && esURLValida(selectedProducto.url_image)) {
        urlImagenFinal = selectedProducto.url_image;
      }

      // Validar urlImagenFinal antes de continuar
      if (!urlImagenFinal) {
        throw new Error("La URL de la imagen no es válida");
      }

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

      const resultado = await actualizarProducto(selectedProducto.ID_Producto, productoActualizado);

      if (!resultado) {
        // Eliminar la nueva imagen si la actualización del producto falla
        if (selectedProducto.nuevaImagen) {
          await eliminarImagen(urlImagenFinal);
        }
        throw new Error("Error al actualizar el producto");
      }

      refrescarProductos();
      setOpenToastEdit(true);
      EditModalClose();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al actualizar el producto");
    }
  };


  return (
    <>
      <Modal
        open={openEdit}
        onClose={EditModalClose}
        title="Editar Producto"
        size="xl"
        className="bg-white text-blue-900 border border-slate-300 rounded-xl shadow-2xl p-8"
        transition={{ duration: 0.5 }}
        overlayCloseOnClick={false}
      >
        {selectedProducto ? (
          <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-blue-900 mb-1">
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
                className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Marca
              </label>
              <ComboBoxID
                name={selectedProducto.Marca}
                options={marcas}
                selected={{
                  label: selectedProducto.Nombre_Marca || "",
                  value: selectedProducto.ID_Marca || "",
                }}
                onSelect={(selectedOption) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    ID_Marca: selectedOption.value,
                    Nombre_Marca: selectedOption.label,
                  })
                }
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
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
                className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Sucursal */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Sucursal
              </label>
              <ComboBoxID
                name={selectedProducto.versucu}
                options={sucursales}
                selected={{
                  label: selectedProducto.Nombre_Sucursal || "",
                  value: selectedProducto.ID_Sucursal || "",
                }}
                onSelect={(selectedOption) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    ID_Sucursal: selectedOption.value,
                    Nombre_Sucursal: selectedOption.label,
                  })
                }
              />
            </div>

            {/* Categoria */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Categoría
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
            {/* Imagen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start col-span-4">
              <div className="flex flex-col items-center space-y-2">
                <label className="text-sm font-medium text-blue-900">
                  Vista Previa
                </label>
                <div className="w-40 h-40 rounded-xl overflow-hidden border border-blue-500 bg-gray-100 shadow">
                  <img
                    src={obtenerUrlVistaPrevia()}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
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
                    className="text-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
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
                      className="flex-1 bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="col-span-4">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Descripción
              </label>
              <textarea
                value={selectedProducto.Detalles || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    Detalles: e.target.value,
                  })
                }
                className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Añadir descripción..."
              />
            </div>

            {/* Botones */}
            <div className="col-span-4 flex justify-end gap-4 pt-4 border-t border-blue-200">
              <button
                type="button"
                onClick={EditModalClose}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg border border-blue-500 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-lg transition"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-blue-700">Cargando producto...</p>
        )}
      </Modal>
      <ShowToast
        show={openToastEdit}
        onClose={() => setOpenToastEdit(false)}
        message="Producto editado correctamente"
        iconType="success"
        color="green"
        tone="solid"
        position="bottom-right"
      />
    </>
  );
};

export default ModalEditar;