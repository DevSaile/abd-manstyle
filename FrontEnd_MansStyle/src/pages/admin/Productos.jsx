import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  obtenerProductos,
  obtenerProductoPorID,
} from "../../services/ProductosService";
import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { Plus } from "lucide-react";
import Header from "../../components/common/Header";
import ComboBox from "../../components/common/ComboBox";
import ProductCard from "../../components/productos/ProductCard";
import SalesTrendChart from "../../components/productos/SalesTrendChart";
import SellsPerCategory from "../../components/panelinicial/VentasPorCategoria";
import ModalEditar from "../../components/productos/ModalEditar";
import { Modal } from "@rewind-ui/core";
import ModalCompra from "../../components/productos/ModalCompra";
import ModalDetalles from "../../components/productos/ModalDetalles";
import ModalCompraExistente from "../../components/productos/ModalCompraExistente";

const ProductsPage = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [productos, setProductos] = useState([]);
  const [Sucursales, setSucursales] = useState([]);
  const [Categorias, setCategorias] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [openExistente, setOpenExistente] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedProducto, setSelectedProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

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
        selectedCategory === "All" ||
        product.Descripcion_Categoria === selectedCategory;

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
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
              className=" bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        border border-gray-700 rounded-xl shadow-lg h-5/6"
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
                onClick={() => {
                  setSelectedProduct(product);
                  console.log(selectedProducto);
                }}
              />
            ))}
            
          </div>

          <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-transparent text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
        onClick={() => {
          setOpenAdd(true);
        }}
        >
          <Plus/>Nuevo
        </button>
        <button
          className="bg-transparent text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
        onClick={() => {
          setOpenExistente(true);
        }}
        >
          <Plus/>Existente
        </button>
        </div>
        <button
          className="bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
          onClick={() => {
            setOpenEdit(true);}}
        > 
          Editar
        </button>
    
        <button
          className="bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          Eliminar
        </button>
      
      </div>
        </motion.div>



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

        
        <ModalCompra
        openAdd={openAdd}
        AddModalClose={() => setOpenAdd(false)}
        refrescarProductos={() => {
          obtenerProductos().then((data) => {
            setProductos(data);
            setFilteredProducts(data); // Refrescar la lista después de editar
          });
        }}
        />

<ModalCompraExistente
  openExistente={openExistente}
  ExistenteModalClose={() => setOpenExistente(false)}
  refrescarProductos={() => {
    obtenerProductos().then((data) => {
      setProductos(data);
      setFilteredProducts(data); // Refresh the product list after adding
    });
  }}
  selectedProducto={selectedProducto} // Pass the selected product to the modal
/>;

        <ModalEditar
          openEdit={openEdit}
          EditModalClose={() => setOpenEdit(false)}
          refrescarProductos={() => {
            obtenerProductos().then((data) => {
              setProductos(data);
              setFilteredProducts(data); // Refrescar la lista después de editar
            });
          }}
          fetchProductoByID={obtenerProductoPorID} // Nueva prop para cargar producto por ID
          productoID={selectedProducto?.ID_Producto || null} // Pasar ID del producto seleccionado
        />

        <ModalDetalles
          openDetails={openDetails}
          DetailsModalClose={() => setOpenDetails(false)}
          product={selectedProducto}
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
