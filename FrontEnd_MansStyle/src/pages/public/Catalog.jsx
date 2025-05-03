import React, { useState, useEffect } from "react";
import CatalogProductCard from "../../components/public/catalog/CatalogProductCard";
import Navbar from "../../components/public/landing/Navbar";
import ComboBox from "../../components/common/ComboBox";
import { obtenerProductos } from "../../services/ProductosService";
import { obtenerCategoriasActivas } from "../../services/CategoriasService";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategoryName, setSelectedCategoryName] = useState("All");
  const [selectedBrandName, setSelectedBrandName] = useState("All");

  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      console.log("Categorías activas:", data);
      const opciones = data.map((Categoria) => Categoria.Nombre); // Extract only the names
      setCategories(["All", ...opciones]); // Add "All" as the default option
    });
  }, []);

  useEffect(() => {
    obtenerProductos().then((data) => {
      setProducts(data);
    });
  }, []);

  // Filter products based on selections
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategoryName === "All" ||
      p.Categoria?.Nombre_Categoria === selectedCategoryName;
    const matchBrand =
      selectedBrandName === "All" ||
      p.Marca?.toLowerCase() === selectedBrandName.toLowerCase();
    return matchCategory && matchBrand;
  });

  return (
    <>
      <Navbar />
      <div className="mt-32 mb-4 mx-5 flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <ComboBox
          name={selectedCategoryName || "Todas las categorías"}
          options={categories}
          onSelect={(name) => setSelectedCategoryName(name)}
        />

        {/* Brand Filter */}
        <ComboBox
          name={selectedBrandName || "Todas las marcas"}
          options={["All", "Marca A", "Marca B", "Marca C"]} // Add "All" as the default option
          onSelect={(name) => setSelectedBrandName(name)}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mx-5">
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