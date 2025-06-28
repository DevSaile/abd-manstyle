// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  eliminarProducto,
  obtenerProductoPorID,
  obtenerProductos
} from "@/services/ProductosService";

import useProductos from "@/hooks/useProducts";
import ComboBox from "@/components/common/ComboBox";
import ProductCard from "@/components/productos/ProductCard";
import ModalEditar from "@/components/productos/ModalEditar";
import { Modal } from "@rewind-ui/core";
import ModalDetalles from "@/components/productos/ModalDetalles";
import { useOutletContext } from "react-router-dom";
import TopSection from "../../components/common/TopSection";

const ProductsPage = () => {
const { productos, recargar } = useProductos(); // ✅ Correcto

  const [openDetails, setOpenDetails] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedSucursal, setSelectedSucursal] = useState("Todos");
  const [selectedMarcas, setSelectedMarca] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredSucursales, setFilteredSucursales] = useState([]);
  const [filteredMarcas, setFilteredMarcas] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const [selectedProducto, setSelectedProduct] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Productos");
  }, [setTitle]);

  useEffect(() => {
    setFilteredProducts(productos);
  }, [productos]);

  useEffect(() => {
    const sucursalesDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedMarcas === "Todos" || p.Marca === selectedMarcas) &&
                (selectedCategory === "Todos" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Descripcion_Sucursal)
        )
      ),
    ];

    const marcasDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedSucursal === "Todos" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedCategory === "Todos" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Marca)
        )
      ),
    ];

    const categoriasDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedSucursal === "Todos" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedMarcas === "Todos" || p.Marca === selectedMarcas)
            )
            .map((p) => p.Descripcion_Categoria)
        )
      ),
    ];

    setFilteredSucursales(sucursalesDisponibles);
    setFilteredMarcas(marcasDisponibles);
    setFilteredCategorias(categoriasDisponibles);

    if (
      selectedSucursal !== "Todos" &&
      !sucursalesDisponibles.includes(selectedSucursal)
    ) {
      setSelectedSucursal("Todos");
    }
    if (
      selectedMarcas !== "Todos" &&
      !marcasDisponibles.includes(selectedMarcas)
    ) {
      setSelectedMarca("Todos");
    }
    if (
      selectedCategory !== "Todos" &&
      !categoriasDisponibles.includes(selectedCategory)
    ) {
      setSelectedCategory("Todos");
    }
  }, [productos, selectedSucursal, selectedMarcas, selectedCategory]);

  useEffect(() => {
    const filtered = productos.filter((product) => {
      const matchesSearchTerm = product.Nombre.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

      const matchesCategory =
        selectedCategory === "Todos" ||
        product.Descripcion_Categoria === selectedCategory;

      const matchesSucursal =
        selectedSucursal === "Todos" ||
        product.Descripcion_Sucursal === selectedSucursal;

      const matchesBrand =
        selectedMarcas === "Todos" || product.Marca === selectedMarcas;

      return (
        matchesSearchTerm && matchesCategory && matchesSucursal && matchesBrand
      );
    });

    setFilteredProducts(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedSucursal,
    selectedMarcas,
    productos,
  ]);

  const deletefuncion = async () => {
  if (!selectedProducto?.ID_Producto) {
    alert("No se ha seleccionado ningún producto para eliminar.");
    return;
  }

  try {
    const productoEliminado = {
      ID_Producto: selectedProducto.ID_Producto,
      Estado: 0,
    };

     await eliminarProducto(
      selectedProducto.ID_Producto,
      productoEliminado
    );

  } catch (error) {
    alert(error.response?.data?.message || "Error al eliminar el producto");
  } finally {
    // SIEMPRE refresca la lista, aunque haya error
    await recargar(); // ✅ Refresca productos desde el hook

  }
};

  return (
    <div className="flex-column relative z-10">
      <main>
        <TopSection>
          <ComboBox
            name={"Categoria"}
            options={filteredCategorias}
            onSelect={setSelectedCategory}
            selected={selectedCategory}
            bgColor="bg-white"
            dropdownBgColor="bg-white"
            inputBgColor="bg-white"
            hoverBgColor="hover:bg-blue-100"
          />
          <ComboBox
            name={"Sucursal"}
            options={filteredSucursales}
            onSelect={setSelectedSucursal}
            selected={selectedSucursal}
            bgColor="bg-white"
            dropdownBgColor="bg-white"
            inputBgColor="bg-white"
            hoverBgColor="hover:bg-blue-100"
          />
          <ComboBox
            name={"Marca"}
            options={filteredMarcas}
            onSelect={setSelectedMarca}
            selected={selectedMarcas}
            bgColor="bg-white"
            dropdownBgColor="bg-white"
            inputBgColor="bg-white"
            hoverBgColor="hover:bg-blue-100"
          />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-white text-white placeholder-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </TopSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 mb-8 p-10 col-span-4 mx-9 overflow-y-auto h-5/6 min-h-[400px]"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.ID_Producto}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
            />
          ))}

        </motion.div>

        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Confirm Delete"
          size="l"
          className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-2"
          transition={{ duration: 1.5 }}
        >
          <p className="text-gray-300 text-lg text-center mb-6 col-span-2">
            Are you sure you want to delete this product?{" "}
            <strong>{selectedProducto?.Nombre}</strong>
          </p>
          <div className="content-center justify-center flex gap-4 col-span-2">
            <button
              onClick={() => setOpenDelete(false)}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
            >
              Cancel
            </button>
         <button
   onClick={async () => {
      await deletefuncion();
    
      setOpenDelete(false);
      recargar(); // ✅ recargar productos después de eliminar
    
  }}
  className="bg-red-600 text-gray-100 hover:bg-red-500 px-6 py-2 rounded-lg transition duration-200"
>
  Delete
</button>
          </div>
        </Modal>

        <ModalEditar
          openEdit={openEdit}
          EditModalClose={() => setOpenEdit(false)}
       refrescarProductos={recargar} // ✅ recargar viene del hook useProductos

          fetchProductoByID={obtenerProductoPorID}
          productoID={selectedProducto?.ID_Producto || null}
        />

        <ModalDetalles
          openDetails={openDetails}
          DetailsModalClose={() => setOpenDetails(false)}
          product={selectedProducto}
        />
      </main>
    </div>
  );
};

export default ProductsPage;
