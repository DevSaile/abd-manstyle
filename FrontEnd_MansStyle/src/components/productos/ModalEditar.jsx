import React, { useEffect, useState, version } from "react";
import ComboBoxID from "../common/ComboxID";
import { Modal } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import { actualizarProducto } from "../../services/ProductosService";

import { obtenerMarcas } from "../../services/MarcasService"; // Asegúrate de importar el método correcto

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
    Promise.all([obtenerCategoriasActivas(), obtenerSucursales(), obtenerMarcas()]).then(
      ([categoriasData, sucursalesData, marcasData]) => {
        setCategorias(categoriasData.map(categoria => ({
          label: categoria.Nombre, 
          value: categoria.ID_Categoria
        })));
        setSucursales(sucursalesData.map(sucursal => ({
          label: sucursal.Nombre, 
          value: sucursal.ID_Sucursal
        })));
        setMarcas(marcasData.map(marca => ({
          label: marca.Nombre, 
          value: marca.ID_Marca
        })));
      }
    );
  }, []);


  // Cargar información del producto cuando el modal se abre
  useEffect(() => {
    if (openEdit && productoID) {
      fetchProductoByID(productoID).then((data) => {
        setSelectedProducto(data); // Cargar datos del producto
      });
    }
  }, [openEdit, productoID]);



    // Verifica si es una URL válida
    const esURLValida = (url) => {
        return typeof url === "string" && url.startsWith("http");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!selectedProducto?.ID_Producto) {
        alert("No se ha seleccionado ningún producto");
        return;
      }
    
      try {
        const productoActualizado = {
          ID_Producto: selectedProducto.ID_Producto,
          Nombre: selectedProducto.Nombre.trim(),
          ID_Marca: selectedProducto.ID_Marca,
          Precio_Producto: parseFloat(selectedProducto.Precio_Producto),
          ID_Sucursal: selectedProducto.ID_Sucursal,
          ID_Categoria: selectedProducto.ID_Categoria,
          url_image: esURLValida(selectedProducto.url_image) ? selectedProducto.url_image : null, // Cambiado a url_image
          Detalles: selectedProducto.Detalles?.trim() || "",
          //Cantidad: selectedProducto.Cantidad || 0, // Añadido
          //Precio_Compra: selectedProducto.Precio_Compra || 0 // Añadido si es necesario
        };
        
        console.log("Producto actualizado:", productoActualizado);
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
            <ComboBoxID
              name={selectedProducto.Marca}
              options={marcas}
              selected={{
                label: selectedProducto.Nombre_Marca || "", // Muestra el nombre
                value: selectedProducto.ID_Marca || ""      // Pero maneja el ID
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Marca: selectedOption.value,          // Guarda el ID
                  Nombre_Marca: selectedOption.label       // Opcional: guarda el nombre para mostrar
                })
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
            <ComboBoxID
              name={selectedProducto.versucu}
              options={sucursales}
              selected={{
                label: selectedProducto.Nombre_Sucursal || "", // Muestra el nombre
                value: selectedProducto.ID_Sucursal || ""      // Pero maneja el ID
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Sucursal: selectedOption.value,          // Guarda el ID
                  Nombre_Sucursal: selectedOption.label       // Opcional: guarda el nombre para mostrar
                })
              }
            />
            
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <ComboBoxID
              name={selectedProducto.Descripcion_Categoria}
              options={categorias}
              selected={{
                label: selectedProducto.Nombre_Categoria || "",
                value: selectedProducto.ID_Categoria || ""
              }}
              onSelect={(selectedOption) =>
                setSelectedProducto({
                  ...selectedProducto,
                  ID_Categoria: selectedOption.value,
                  Nombre_Categoria: selectedOption.label
                })
              }
            />
          </div>
          {/* Product Image Section */}
            <div className="col-span-4 grid grid-cols-2 gap-4">
                {/* Vista previa de la imagen */}
                <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vista Previa</label>
                    <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-600">
                    <img
                        src={
                        selectedProducto.url_image
                            ? selectedProducto.url_image
                            : "https://via.placeholder.com/150"
                        }
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>

                {/* Entrada de imagen */}
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
                            setSelectedProducto({
                                ...selectedProducto,
                                url_image: reader.result,
                            });
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
                        value={selectedProducto.url_image || ""}
                        onChange={(e) =>
                        setSelectedProducto({ ...selectedProducto, url_image: e.target.value })
                        }
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                    />
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
