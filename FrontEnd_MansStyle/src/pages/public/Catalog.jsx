import React, { useState, useEffect } from "react";
import CatalogProductCard from "../../components/public/catalog/CatalogProductCard";
import Navbar from "../../components/public/landing/Navbar";
import ComboBox from "../../components/common/ComboBox";
import { obtenerProductos } from "../../services/ProductosService";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerMarcas } from "../../services/MarcasService";
import { obtenerSucursales } from "../../services/SucursalService";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  // Filtros seleccionados
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [selectedSucursal, setSelectedSucursal] = useState("Todos");

  // Opciones filtradas dinámicamente
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredSucursales, setFilteredSucursales] = useState([]);

  // Obtener categorías, marcas y sucursales activas
  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      const opciones = data.map((Categoria) => Categoria.Descripcion_Categoria);
      setCategories(["Todos", ...opciones]);
    });
    obtenerMarcas().then((data) => {
      const opciones = data.map((Marca) => Marca.Nombre);
      setBrands(["Todos", ...opciones]);
    });
    obtenerSucursales().then((data) => {
      const opciones = data.map((Sucursal) => Sucursal.Nombre);
      setSucursales(["Todos", ...opciones]);
    });
  }, []);

  // Obtener productos
  useEffect(() => {
    obtenerProductos().then((data) => {
      setProducts(data);
    });
  }, []);

  // Filtrado dinámico de opciones de sucursal, categorías y marcas
  useEffect(() => {
    // Sucursales disponibles según marca y categoría seleccionadas
    const sucursalesDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          products
            .filter(
              (p) =>
                (selectedBrand === "Todos" || p.Marca === selectedBrand) &&
                (selectedCategory === "Todos" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Descripcion_Sucursal)
            .filter(Boolean)
        )
      ),
    ];

    // Marcas disponibles según sucursal y categoría seleccionadas
    const marcasDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          products
            .filter(
              (p) =>
                (selectedSucursal === "Todos" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedCategory === "Todos" ||
                  p.Descripcion_Categoria === selectedCategory)
            )
            .map((p) => p.Marca)
            .filter(Boolean)
        )
      ),
    ];

    // Categorías disponibles según sucursal y marca seleccionadas
    const categoriasDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          products
            .filter(
              (p) =>
                (selectedSucursal === "Todos" ||
                  p.Descripcion_Sucursal === selectedSucursal) &&
                (selectedBrand === "Todos" || p.Marca === selectedBrand)
            )
            .map((p) => p.Descripcion_Categoria)
            .filter(Boolean)
        )
      ),
    ];

    setFilteredSucursales(sucursalesDisponibles);
    setFilteredBrands(marcasDisponibles);
    setFilteredCategories(categoriasDisponibles);

    // Reset si la selección actual ya no es válida
    if (
      selectedSucursal !== "Todos" &&
      !sucursalesDisponibles.includes(selectedSucursal)
    ) {
      setSelectedSucursal("Todos");
    }
    if (selectedBrand !== "Todos" && !marcasDisponibles.includes(selectedBrand)) {
      setSelectedBrand("Todos");
    }
    if (
      selectedCategory !== "Todos" &&
      !categoriasDisponibles.includes(selectedCategory)
    ) {
      setSelectedCategory("Todos");
    }
  }, [products, selectedSucursal, selectedBrand, selectedCategory]);

  // Filtrar productos según los filtros activos
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "Todos" ||
      p.Descripcion_Categoria === selectedCategory;
    const matchBrand =
      selectedBrand === "Todos" ||
      (p.Marca && p.Marca.toLowerCase() === selectedBrand.toLowerCase());
    const matchSucursal =
      selectedSucursal === "Todos" || p.Descripcion_Sucursal === selectedSucursal;
    return matchCategory && matchBrand && matchSucursal;
  });

  return (
    <>
      <Navbar
        filters={
          <div className="flex gap-2 ml-8">
            <ComboBox
              name={"Categoria"}
              options={filteredCategories}
              onSelect={setSelectedCategory}
              selected={selectedCategory}
              bgColor="bg-[#0f0f0f]"
              dropdownBgColor="bg-neutral-900"
              inputBgColor="bg-neutral-900"
              hoverBgColor="hover:bg-[#0f0f0f]"
            />
            <ComboBox
              name={"Marca"}
              options={filteredBrands}
              onSelect={setSelectedBrand}
              selected={selectedBrand}
              bgColor="bg-[#0f0f0f]"
              dropdownBgColor="bg-neutral-900"
              inputBgColor="bg-neutral-900"
              hoverBgColor="hover:bg-[#0f0f0f]"
            />
            <ComboBox
              name={"Sucursal"}
              options={filteredSucursales}
              onSelect={setSelectedSucursal}
              selected={selectedSucursal}
              bgColor="bg-[#0f0f0f]"
              dropdownBgColor="bg-neutral-900"
              inputBgColor="bg-neutral-900"
              hoverBgColor="hover:bg-[#0f0f0f]"
            />
          </div>
        }
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mx-5 mt-32">
        {filteredProducts.map((product) => (
          <CatalogProductCard
            key={product.ID_Producto}
            name={product.Nombre}
            price={product.Precio_Producto}
            image={
              product.url_image
                ? product.url_image
                : "https://via.placeholder.com/150"
            }
          />
        ))}
      </div>
    </>
  );
};

export default Catalog;
