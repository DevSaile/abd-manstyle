import React, { useEffect, useState } from "react";
import ComboBoxID from "../common/ComboxID";
import { Drawer } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "@/services/CategoriasService";
import { obtenerSucursales } from "@/services/SucursalService";
import { agregarProducto } from "@/services/ProductosService";
import { subirImagen } from "@/services/UploadService"; 
import { obtenerMarcas } from "@/services/MarcasService";

const NewProduct = ({ onProductAdded, openAdd, AddModalClose }) => {
  const [newProduct, setNewProduct] = useState({
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

  const [categorias, setCategorias] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [Marcas, setMarcas] = useState([]);
  
  

  useEffect(() => {
    Promise.all([obtenerCategoriasActivas(), obtenerSucursales(), obtenerMarcas()]).then(
      ([categoriasData, sucursalesData, MarcasData]) => {
        setCategorias(categoriasData.map(c => ({ label: c.Nombre, value: c.ID_Categoria })));
        setSucursales(sucursalesData.map(s => ({ label: s.Nombre, value: s.ID_Sucursal })));
        setMarcas(MarcasData.map(s => ({ label: s.Nombre, value: s.ID_Marca })));
      }
    );
  }, []);

  const esURLValida = (url) => typeof url === "string" && url.startsWith("http");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let urlFinal = "";
  
    try {
      if (newProduct.archivoImagen) {
        const resultado = await subirImagen(newProduct.archivoImagen);
        if (typeof resultado === "string") {
          urlFinal = resultado;
        } else if (resultado && typeof resultado === "object" && resultado.url) {
          urlFinal = resultado.url;
        } else {
          throw new Error("La imagen subida no devolvió una URL válida");
        }
      } else if (esURLValida(newProduct.url_image)) {
        urlFinal = newProduct.url_image;
      } else {
        throw new Error("No se proporcionó una imagen válida");
      }
  
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
  
         const response = await agregarProducto(productoDTO);
      if (!response?.ID_Producto) {
        alert("Error al agregar el producto");
        return;
      }
      if (onProductAdded) onProductAdded(); // <-- refresca productos
      AddModalClose();
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
      alert("Ocurrió un error: " + error.message);
    }
  };

  return (
    
    <Drawer
      open={openAdd}
      onClose={AddModalClose}
      position="right"
      size="xl"
      className="bg-gray-900 text-gray-100 border-l border-gray-700 shadow-2xl"
      overlayCloseOnClick={false}
    >

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Agregar Producto</h2>
          <button
            onClick={AddModalClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <form className="flex-1 overflow-y-auto px-6 py-4 space-y-6" onSubmit={handleSubmit}>
          {/* Vista previa */}
          
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
              <input
                type="text"
                value={newProduct.Nombre}
                onChange={(e) => setNewProduct({ ...newProduct, Nombre: e.target.value })}
                className="w-full bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
              <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Precio de Venta(C$)</label>
              <input
                type="number"
                value={newProduct.Precio_Venta}
                onChange={(e) => setNewProduct({ ...newProduct, Precio_Venta: e.target.value })}
                className="w-full bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
           
          </div>
          </div>

          {/* Precios y Marca */}
          

          {/* Sucursal y Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Sucursal</label>
              <ComboBoxID
                name="Seleccionar Sucursal"
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
             <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Marca</label>
              <ComboBoxID
                name="Seleccionar Marca"
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

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
            <textarea
              value={newProduct.Detalles || ""}
              onChange={(e) => setNewProduct({ ...newProduct, Detalles: e.target.value })}
              className="w-full bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Añadir descripción del producto..."
            />
          </div>
          
          <div className="grid grid-cols-3 gap-6 items-start">
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
                        url_image: "",
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
                      archivoImagen: null,
                    })
                  }
                  className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>


          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
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
      </div>
    </Drawer>
  );
};

export default NewProduct;