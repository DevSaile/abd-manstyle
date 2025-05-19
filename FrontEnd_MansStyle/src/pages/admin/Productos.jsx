import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  obtenerProductos,
  obtenerProductoPorID,
  eliminarProducto,
} from "../../services/ProductosService";
import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerMarcas } from "../../services/MarcasService";
import { Plus } from "lucide-react";
import Header from "../../components/common/Header";
import ComboBox from "../../components/common/ComboBox";
import ProductCard from "../../components/productos/ProductCard";
import ModalEditar from "../../components/productos/ModalEditar";
import { Modal } from "@rewind-ui/core";
import ModalDetalles from "../../components/productos/ModalDetalles";

const ProductsPage = () => {
  const [openDetails, setOpenDetails] = useState(false);

  const [productos, setProductos] = useState([]);
  const [Sucursales, setSucursales] = useState([]);
  const [Categorias, setCategorias] = useState([]);
  const [Marcas, setMarcas] = useState([]);

  // Filtros seleccionados
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSucursal, setSelectedSucursal] = useState("All");
  const [selectedMarcas, setSelectedMarca] = useState("All");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Opciones filtradas dinámicamente
  const [filteredSucursales, setFilteredSucursales] = useState([]);
  const [filteredMarcas, setFilteredMarcas] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const [selectedProducto, setSelectedProduct] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const userRole = localStorage.getItem("rol");

  // Fetch products from the API
  useEffect(() => {
    obtenerProductos().then((data) => {
      setProductos(data);
      setFilteredProducts(data); // Initialize filtered products
    });
  }, []);

  useEffect(() => {
    obtenerSucursales().then((data) => {
      const opciones = data.map((sucursal) => sucursal.Nombre);
      setSucursales(["All", ...opciones]);
    });
  }, []);

  useEffect(() => {
    obtenerMarcas().then((data) => {
      const opciones = data.map((Marca) => Marca.Nombre);
      setMarcas(["All", ...opciones]);
    });
  }, []);

  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      const opciones = data.map((Categoria) => Categoria.Nombre);
      setCategorias(["All", ...opciones]);
    });
  }, []);

  // Filtrado dinámico de opciones de Sucursal, Marca y Categoría
  useEffect(() => {
    // Sucursales disponibles según marca y categoría seleccionadas
    const sucursalesDisponibles = [
      "All",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedMarcas === "All" || p.Marca === selectedMarcas) &&
                (selectedCategory === "All" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Descripcion_Sucursal)
        )
      ),
    ];

    // Marcas disponibles según sucursal y categoría seleccionadas
    const marcasDisponibles = [
      "All",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedSucursal === "All" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedCategory === "All" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Marca)
        )
      ),
    ];

    // Categorías disponibles según sucursal y marca seleccionadas
    const categoriasDisponibles = [
      "All",
      ...Array.from(
        new Set(
          productos
            .filter(
              (p) =>
                (selectedSucursal === "All" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedMarcas === "All" || p.Marca === selectedMarcas)
            )
            .map((p) => p.Descripcion_Categoria)
        )
      ),
    ];

    setFilteredSucursales(sucursalesDisponibles);
    setFilteredMarcas(marcasDisponibles);
    setFilteredCategorias(categoriasDisponibles);

    // Si la selección actual ya no es válida, resetea a "All"
    if (
      selectedSucursal !== "All" &&
      !sucursalesDisponibles.includes(selectedSucursal)
    ) {
      setSelectedSucursal("All");
    }
    if (
      selectedMarcas !== "All" &&
      !marcasDisponibles.includes(selectedMarcas)
    ) {
      setSelectedMarca("All");
    }
    if (
      selectedCategory !== "All" &&
      !categoriasDisponibles.includes(selectedCategory)
    ) {
      setSelectedCategory("All");
    }
  }, [productos, selectedSucursal, selectedMarcas, selectedCategory]);

  // Filtrado de productos según los filtros activos
  useEffect(() => {
    const filtered = productos.filter((product) => {
      const matchesSearchTerm = product.Nombre.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

      const matchesCategory =
        selectedCategory === "All" ||
        product.Descripcion_Categoria === selectedCategory;

      const matchesSucursal =
        selectedSucursal === "All" ||
        product.Descripcion_Sucursal === selectedSucursal;

      const matchesBrand =
        selectedMarcas === "All" || product.Marca === selectedMarcas;

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

      const resultado = await eliminarProducto(
        selectedProducto.ID_Producto,
        productoEliminado
      );

      if (resultado) {
        obtenerProductos().then((data) => {
          setProductos(data);
          setFilteredProducts(data);
        });

        alert("Producto eliminado correctamente");
      } else "Error al eliminar el producto";
    } catch (error) {
      alert(error.response?.data?.message || "Error al eliminar el producto");
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Productos" />

      <main className="max-w-7xl mx-5 py-6 px-4 lg:px-8">
        {/* Filters */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ComboBox
            name={"Categorias"}
            options={filteredCategorias}
            onSelect={setSelectedCategory}
            selected={selectedCategory}
          />
          <ComboBox
            name={"Sucursales"}
            options={filteredSucursales}
            onSelect={setSelectedSucursal}
            selected={selectedSucursal}
          />
          <ComboBox
            name={"Marca"}
            options={filteredMarcas}
            onSelect={setSelectedMarca}
            selected={selectedMarcas}
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className=" bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedProducto}
            onClick={() => {
              setOpenDetails(true);
            }}
          >
            Detalles
          </button>

          {/* Product Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4
        mb-8 p-10 col-span-4 overflow-y-auto custom-scrollbar
        bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800
        border border-gray-700 rounded-xl shadow-lg h-5/6 min-h-[400px]"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.ID_Producto}
                name={product.Nombre}
                price={product.Precio_Producto}
                category={product.Descripcion_Categoria}
                stock={product.Cantidad}
                image={
                  product.url_image
                    ? product.url_image
                    : "https://via.placeholder.com/150"
                }
                onClick={() => setSelectedProduct(product)}
                selected={selectedProducto?.ID_Producto === product.ID_Producto}
              />
            ))}
          </div>

         <div className="flex flex-col gap-4">
  <div className="grid grid-cols-2 gap-4"></div>
  <button
    className={`bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition duration-200
      ${!selectedProducto ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-blue-600" : ""}`}
    onClick={() => setOpenEdit(true)}
    disabled={!selectedProducto}
  >
    Editar
  </button>
  <button
    className={`bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition duration-200
      ${!selectedProducto ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-red-600" : ""}`}
    onClick={() => setOpenDelete(true)}
    disabled={!selectedProducto}
  >
    Eliminar
  </button>
</div>
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
              onClick={() => {
                deletefuncion();
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
          refrescarProductos={() => {
            obtenerProductos().then((data) => {
              setProductos(data);
              setFilteredProducts(data);
            });
          }}
          fetchProductoByID={obtenerProductoPorID}
          productoID={selectedProducto?.ID_Producto || null}
        />

        <ModalDetalles
          openDetails={openDetails}
          DetailsModalClose={() => setOpenDetails(false)}
          product={selectedProducto}
        />

        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          {/*       Se usara después, por esto se deja comentado

          <SalesTrendChart />
          <SellsPerCategory />
          */}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;