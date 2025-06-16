import React, { useState, useEffect } from "react";
import CatalogProductCard from "../catalog/CatalogProductCard";
import ComboBox from "../../common/ComboBox";
import  useProductos  from "../../../hooks/useProducts";


const ProductSection = () => {
  // Use hooks as in Productos.jsx
  const { productos, setProductos } = useProductos();

  // Selected filters
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [selectedSucursal, setSelectedSucursal] = useState("Todos");

  // Dynamically filtered options
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredSucursales, setFilteredSucursales] = useState([]);

  // Dynamic filtering of options
  useEffect(() => {
    const sucursalesDisponibles = [
      "Todos",
      ...Array.from(
        new Set(
          productos
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
            .filter(Boolean)
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

    // Reset if current selection is no longer valid
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
  }, [productos, selectedSucursal, selectedBrand, selectedCategory]);

  // Filter products according to active filters
  const filteredProducts = productos.filter((p) => {
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
    <section className="py-12 px-4 bg-[#141414] bg-opacity-90">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <ComboBox
          name={"Categoria"}
          options={filteredCategories}
          onSelect={setSelectedCategory}
          selected={selectedCategory}
        />
        <ComboBox
          name={"Marca"}
          options={filteredBrands}
          onSelect={setSelectedBrand}
          selected={selectedBrand}
        />
        <ComboBox
          name={"Sucursal"}
          options={filteredSucursales}
          onSelect={setSelectedSucursal}
          selected={selectedSucursal}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mx-5 max-h-[660px] overflow-y-auto">
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
    </section>
  );
};

export default ProductSection;