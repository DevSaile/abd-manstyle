import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { obtenerProductos } from "../services/ProductosService";
import { obtenerSucursales } from "../services/SucursalService";
import { obtenerCategoriasActivas } from "../services/CategoriasService";

import Header from "../components/common/Header";
import ComboBox from "../components/common/ComboBox";
import ProductCard from "../components/productos/ProductCard";
import SalesTrendChart from "../components/productos/SalesTrendChart";
import SellsPerCategory from "../components/panelinicial/VentasPorCategoria";
import ModalEditar from "../components/productos/ModalEditar";
import { Modal } from "@rewind-ui/core";

const ProductsPage = () => {

  const [productos, setProductos] = useState([]);
  const [Sucursales, setSucursales] = useState([]);
  const [Categorias, setCategorias] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedProducto, setSelectedProduct] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    obtenerProductos().then((data) => {
      setProductos(data);
      setFilteredProducts(data); // Initialize filtered products
    });
  }, []);

  useEffect(() => {
    obtenerSucursales().then((data) => {
      const opciones = data.map((sucursal) => sucursal.Nombre); // Extrae solo los nombres
      setSucursales(["All", ...opciones]); // Agrega la opción "All" como predeterminada
    });
  }, []);

  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      const opciones = data.map((Categoria) => Categoria.Nombre); // Extrae solo los nombres
      setCategorias(["All", ...opciones]); // Agrega la opción "All" como predeterminada
    });
  }, []);

  // Filter products whenever filters change
  useEffect(() => {
    const filtered = productos.filter((product) => {

      const matchesSearchTerm = product.Nombre.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

      const matchesCategory =
        selectedCategory === "All" || product.Descripcion_Categoria === selectedCategory;

      const matchesPrice =
        selectedPrice === "All" ||
        (selectedPrice === "Under $50" && product.Precio_Producto < 50) ||
        (selectedPrice === "$50 - $100" &&
          product.Precio_Producto >= 50 &&
          product.Precio_Producto <= 100) ||
        (selectedPrice === "Above $100" && product.Precio_Producto > 100);

      const matchesBrand =
        selectedBrand === "All" || product.Marca === selectedBrand;

      return (
        matchesSearchTerm && matchesCategory && matchesPrice && matchesBrand
      );

    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedPrice, selectedBrand, productos]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Filters */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ComboBox
            name={"Categorias"}
            options={Categorias}
            onSelect={setSelectedCategory}
          />
          <ComboBox
            name={"Precio"}
            options={["All", "Under $50", "$50 - $100", "Above $100"]}
            onSelect={setSelectedPrice}
          />
          <ComboBox
            name={"Marca"}
            options={["All", "Brand A", "Brand B", "Brand C"]}
            onSelect={setSelectedBrand}
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        {/* Product Cards */}
        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4
        mb-8 p-10 col-span-4
        bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800
        border border-gray-700 rounded-xl shadow-lg">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.ID_Producto}
              name={product.Nombre}
              Sucursal={product.versucu}
              price={product.Precio_Producto}
              brand={product.Marca}
              category={product.Descripcion_Categoria}
              stock={product.Cantidad}
              image={
                product.image
                  ? product.image
                  : "https://via.placeholder.com/150"
              }
              onClickDelete={() => {
                setOpenDelete(true);
                setSelectedProduct(product);
              }}
              onClickEdit={() => {
                setOpenEdit(true);
                setSelectedProduct(product);
              }}
            />
          ))}
        </div>
        </motion.div>

    

        {/* Modal Eliminar */}
        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Confirm Delete"
          size="l" // Make the modal larger
          className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-2" // Consistent styles
          transition={{ duration: 1.5 }} // Slower animation
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
              onClick={() => {
                // Add your delete logic here
                setOpenDelete(false);
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
            selectedProducto={selectedProducto}
            setSelectedProduct={setSelectedProduct}
            refrescarProductos={() => {
                obtenerProductos().then((data) => {
                    setProductos(data);
                    setFilteredProducts(data); // Refrescar la lista después de editar
                });
            }}
        />

        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <SellsPerCategory />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
