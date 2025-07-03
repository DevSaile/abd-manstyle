import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  eliminarProducto,
  obtenerProductoPorID,
  obtenerProductos,
} from "@/services/ProductosService";
import { eliminarImagen } from "../../services/UploadService";
import useProductos from "@/hooks/useProducts";
import ComboBox from "@/components/common/ComboBox";
import ProductCard from "@/components/productos/ProductCard";
import ModalEditar from "@/components/productos/ModalEditar";
import { Modal } from "@rewind-ui/core";
import ModalDetalles from "@/components/productos/ModalDetalles";
import { useOutletContext } from "react-router-dom";
import TopSection from "../../components/common/TopSection";
import ShowToast from "@/components/common/ShowToast";

const ProductsPage = () => {
  const { productos, recargar } = useProductos();

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

  // Toast states
  const [openToastDelete, setOpenToastDelete] = useState(false);
  const [openToastEdit, setOpenToastEdit] = useState(false);

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

  // Eliminar producto con toast
  const deletefuncion = async () => {
    if (!selectedProducto?.ID_Producto) return;

    try {
      const url = selectedProducto.url_image;
      if (url && url.includes("/uploads/")) {
        await eliminarImagen(url);
      }

      await eliminarProducto(selectedProducto.ID_Producto, {
        ID_Producto: selectedProducto.ID_Producto,
        Estado: 0,
      });

      setOpenToastDelete(true); // Mostrar toast de eliminación
      await recargar();
    } catch (error) {
      // Puedes agregar un toast de error si lo deseas
    }
  };

  // Para ModalEditar, pasa un callback para mostrar el toast al guardar


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
            className="bg-white  placeholder-gray-400 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
               refrescarProductos={recargar}
            />
          ))}
        </motion.div>

        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Eliminar producto"
          size="md"
          className="bg-white text-blue-900 border border-blue-200 rounded-xl shadow-2xl p-8 grid grid-cols-2"
          transition={{ duration: 0.3 }}
        >
          <p className="text-blue-800 text-lg text-center mb-6 col-span-2">
            ¿Seguro que quieres eliminar el producto{" "}
            <strong className="text-blue-900">
              {selectedProducto?.Nombre}
            </strong>
            ?
          </p>
          <div className="flex justify-center gap-4 col-span-2">
            <button
              onClick={() => setOpenDelete(false)}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg border border-blue-200 transition"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await deletefuncion();
                setOpenDelete(false);
                recargar();
              }}
              className="bg-red-600 text-white hover:bg-red-500 px-6 py-2 rounded-lg transition"
            >
              Eliminar
            </button>
          </div>
        </Modal>

        <ModalEditar
          openEdit={openEdit}
          EditModalClose={() => setOpenEdit(false)}
          refrescarProductos={recargar}
          fetchProductoByID={obtenerProductoPorID}
          productoID={selectedProducto?.ID_Producto || null}
        />

        <ModalDetalles
          openDetails={openDetails}
          DetailsModalClose={() => setOpenDetails(false)}
          product={selectedProducto}
        />

   
        <ShowToast
          show={openToastDelete}
          onClose={() => setOpenToastDelete(false)}
          message="Producto eliminado correctamente"
          iconType="success"
          color="red"
          tone="solid"
          position="bottom-right"
        />
      </main>
    </div>
  );
};

export default ProductsPage;