import React, { useEffect, useState } from "react";
import ComboBoxID from "../common/ComboxID";
import { Drawer } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "@/services/CategoriasService";
import { obtenerSucursales } from "@/services/SucursalService";
import { agregarProducto } from "@/services/ProductosService";
import { subirImagen, eliminarImagen } from "@/services/UploadService";
import { obtenerMarcas } from "@/services/MarcasService";
import ShowToast from "../common/ShowToast";

const NewProduct = ({
  onProductAdded,
  openAdd,
  AddModalClose,
  siguienteId,
}) => {
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Precio_Venta: "",
    ID_Marca: "",
    Detalles: "",
    ID_Sucursal: "",
    ID_Categoria: "",
    url_image: "",
    Cantidad: "",
    archivoImagen: null,
  });

  const [categorias, setCategorias] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [Marcas, setMarcas] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    Promise.all([
      obtenerCategoriasActivas(),
      obtenerSucursales(),
      obtenerMarcas(),
    ]).then(([categoriasData, sucursalesData, MarcasData]) => {
      setCategorias(
        categoriasData.map((c) => ({ label: c.Nombre, value: c.ID_Categoria }))
      );
      setSucursales(
        sucursalesData.map((s) => ({ label: s.Nombre, value: s.ID_Sucursal }))
      );
      setMarcas(
        MarcasData.map((s) => ({ label: s.Nombre, value: s.ID_Marca }))
      );
    });
  }, []);

  const esURLValida = (url) =>
    typeof url === "string" && url.startsWith("http");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: todos obligatorios menos imagen
    if (
      !newProduct.Nombre.trim() ||
      !newProduct.Precio_Venta ||
      !newProduct.ID_Marca ||
      !newProduct.ID_Sucursal ||
      !newProduct.ID_Categoria ||
      !newProduct.Detalles.trim()
    ) {
      setShowErrorToast(true);
      return;
    }

    let urlFinal = "";

    try {
      if (newProduct.archivoImagen) {
        const extension = newProduct.archivoImagen.name.split('.').pop();
        const nombreFinal = `Producto_${siguienteId}.${extension}`;
        console.log("Nombre final de la imagen:", nombreFinal);
        const resultado = await subirImagen(newProduct.archivoImagen, nombreFinal);

        if (typeof resultado === "string") {
          urlFinal = resultado;
        } else if (resultado?.url) {
          urlFinal = resultado.url;
        } else {
          console.error("Error al subir la imagen:", resultado);
          throw new Error("La imagen subida no devolvió una URL válida");
        }
      } else if (esURLValida(newProduct.url_image)) {
        urlFinal = newProduct.url_image;
      } else {
        urlFinal = "";
      }

      // Crear DTO para el producto
      const productoDTO = {
        Nombre: newProduct.Nombre,
        ID_Marca: newProduct.ID_Marca,
        ID_Sucursal: newProduct.ID_Sucursal,
        ID_Categoria: newProduct.ID_Categoria,
        Cantidad: 0,
        Precio_Producto: parseFloat(newProduct.Precio_Venta),
        Precio_Compra: parseFloat(newProduct.Precio_Compra),
        Detalles: newProduct.Detalles,
        Estado: 1,
        url_image: urlFinal,
      };

      // Guardar producto
      const response = await agregarProducto(productoDTO);

      // Validar respuesta
      if (!response?.ID_Producto) {
        // Si falla, eliminar la imagen subida
        if (urlFinal && !esURLValida(newProduct.url_image)) {
          await eliminarImagen(urlFinal);
        }
        setShowErrorToast(true);
        return;
      }

      // Todo bien
      if (onProductAdded) onProductAdded();
      AddModalClose();
      setShowToast(true);

      // Reset form
      setNewProduct({
        Nombre: "",
        Precio_Compra: "",
        Precio_Venta: "",
        ID_Marca: "",
        Detalles: "",
        ID_Sucursal: "",
        ID_Categoria: "",
        url_image: "",
        Cantidad: "",
        archivoImagen: null,
      });

    } catch (error) {
      // Si algo falla, eliminar imagen si era local
      if (urlFinal && !esURLValida(newProduct.url_image)) {
        await eliminarImagen(urlFinal);
      }
      setShowErrorToast(true);
    }
  };

  return (
    <Drawer
      open={openAdd}
      onClose={AddModalClose}
      position="right"
      size="xl"
      className="bg-white text-blue-900 border-l border-blue-200 shadow-2xl lg:w-5/12"
      overlayCloseOnClick={false}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200 bg-white">
          <h2 className="text-xl font-semibold text-blue-900">
            Agregar Producto
          </h2>
          <button
            onClick={AddModalClose}
            className="text-blue-400 hover:text-blue-700 text-2xl font-bold"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <form
          className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-white"
          onSubmit={handleSubmit}
        >
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={newProduct.Nombre}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Nombre: e.target.value })
                }
                className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Precio de Venta (C$)
              </label>
              <input
                type="number"
                value={newProduct.Precio_Venta}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Precio_Venta: e.target.value })
                }
                className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Sucursal
              </label>
              <ComboBoxID
                name="Sucursal"
                enableSearchbar={false}
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
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Categoría
              </label>
              <ComboBoxID
                name="Categoria"
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
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Marca
              </label>
              <ComboBoxID
                name="Marca"
                options={Marcas}
                selected={{
                  label: newProduct.Nombre_Marca || "",
                  value: newProduct.ID_Marca || "",
                }}
                onSelect={(selectedOption) =>
                  setNewProduct({
                    ...newProduct,
                    ID_Marca: selectedOption.value,
                    Nombre_Marca: selectedOption.label,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Descripción
            </label>
            <textarea
              value={newProduct.Detalles || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, Detalles: e.target.value })
              }
              className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Añadir descripción del producto..."
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-start">
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-blue-900">
                Vista Previa
              </label>
              <div className="w-40 h-40 rounded-xl overflow-hidden border border-blue-500 bg-gray-100">
                <img
                  src={
                    newProduct.archivoImagen
                      ? URL.createObjectURL(newProduct.archivoImagen)
                      : newProduct.url_image ||
                        "https://via.placeholder.com/150"
                  }
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 col-span-2">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
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
                        url_image: "",
                      });
                    }
                  }}
                  className="text-blue-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  O ingresa una URL de imagen
                </label>
                <input
                  type="text"
                  value={newProduct.url_image}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      url_image: e.target.value,
                      archivoImagen: null,
                    })
                  }
                  className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-blue-200">
            <button
              type="button"
              onClick={AddModalClose}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg transition duration-200 border border-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-lg transition duration-200"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
 
      <ShowToast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message="Error al agregar el producto. Verifica los campos."
        iconType="error"
        color="red"
        tone="solid"
        position="bottom-left"
      />
    </Drawer>
  );
};

export default NewProduct;