import React, { useState, useEffect } from "react";
import CatalogProductCard from "../../components/public/catalog/CatalogProductCard";
import Navbar from "../../components/public/landing/Navbar";
import ComboBox from "../../components/common/ComboBox";
import { obtenerProductos } from "../../services/ProductosService";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerMarcas } from "../../services/MarcasService";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Filtros seleccionados
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Opciones filtradas dinámicamente
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  // Obtener categorías y marcas activas
  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      const opciones = data.map((Categoria) => Categoria.Descripcion_Categoria);
      setCategories(["All", ...opciones]);
    });
    obtenerMarcas().then((data) => {
      const opciones = data.map((Marca) => Marca.Nombre);
      setBrands(["All", ...opciones]);
    });
  }, []);

  // Obtener productos
  useEffect(() => {
    obtenerProductos().then((data) => {
      setProducts(data);
    });
  }, []);

  // Filtrado dinámico de opciones de categorías y marcas
  useEffect(() => {
    // Marcas disponibles según la categoría seleccionada
    const marcasDisponibles = [
      "All",
      ...Array.from(
        new Set(
          products
            .filter(
              (p) =>
                selectedCategory === "All" ||
                p.Descripcion_Categoria === selectedCategory
            )
            .map((p) => p.Marca)
            .filter(Boolean)
        )
      ),
    ];

    // Categorías disponibles según la marca seleccionada
    const categoriasDisponibles = [
      "All",
      ...Array.from(
        new Set(
          products
            .filter(
              (p) =>
                selectedBrand === "All" ||
                (p.Marca && p.Marca.toLowerCase() === selectedBrand.toLowerCase())
            )
            .map((p) => p.Descripcion_Categoria)
            .filter(Boolean)
        )
      ),
    ];

    setFilteredBrands(marcasDisponibles);
    setFilteredCategories(categoriasDisponibles);

    // Reset si la selección actual ya no es válida
    if (
      selectedBrand !== "All" &&
      !marcasDisponibles.includes(selectedBrand)
    ) {
      setSelectedBrand("All");
    }
    if (
      selectedCategory !== "All" &&
      !categoriasDisponibles.includes(selectedCategory)
    ) {
      setSelectedCategory("All");
    }
  }, [products, selectedCategory, selectedBrand]);

  // Filtrar productos según los filtros activos
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" ||
      p.Descripcion_Categoria === selectedCategory;
    const matchBrand =
      selectedBrand === "All" ||
      (p.Marca && p.Marca.toLowerCase() === selectedBrand.toLowerCase());
    return matchCategory && matchBrand;
  });

  return (
    <>
      <Navbar
        filters={
          <div className="flex gap-2 ml-8">
            <ComboBox
              name={selectedCategory || "Todas las categorías"}
              options={filteredCategories}
              onSelect={setSelectedCategory}
              selected={selectedCategory}
            />
            <ComboBox
              name={selectedBrand || "Todas las marcas"}
              options={filteredBrands}
              onSelect={setSelectedBrand}
              selected={selectedBrand}
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