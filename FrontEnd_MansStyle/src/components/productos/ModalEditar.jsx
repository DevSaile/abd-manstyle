import React, { useEffect, useState } from "react";
import ComboBox from "../common/ComboBox";
import { Modal } from "@rewind-ui/core";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerSucursales } from "../../services/SucursalService";
import { actualizarProducto } from "../../services/ProductosService";

const ModalEditar = ({
    openEdit,
    EditModalClose,
    selectedProducto,
    setSelectedProduct,
    refrescarProductos, // Refrescar productos después de actualizar
}) => {
    const [categorias, setCategorias] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    // Cargar categorías activas y sucursales al abrir el modal
    useEffect(() => {
        if (openEdit) {
            obtenerCategoriasActivas().then((data) => {
                const opciones = data.map((categoria) => categoria.Nombre); 
                setCategorias(opciones);
            });

            obtenerSucursales().then((data) => {
                const opciones = data.map((sucursal) => sucursal.Nombre);
                setSucursales(opciones);
            });
        }
    }, [openEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProducto?.ID_Producto) return;

        const productoActualizado = {
            Nombre: selectedProducto.Nombre,
            Marca: selectedProducto.Marca,
            Precio_Producto: selectedProducto.Precio_Producto,
            Sucursal: selectedProducto.versucu,
            Descripcion_Categoria: selectedProducto.Descripcion_Categoria,
            image: selectedProducto.image,
        };

        const resultado = await actualizarProducto(selectedProducto.ID_Producto, productoActualizado);
        if (resultado) {
            alert("Producto actualizado correctamente.");
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
            <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Sucursal</label>
                    <ComboBox
                        name="Sucursal"
                        options={sucursales}
                        selected={selectedProducto?.versucu || ""}
                        onSelect={(value) =>
                            setSelectedProduct({ ...selectedProducto, Sucursal: value })
                        }
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <ComboBox
                        name="Category"
                        options={categorias}
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