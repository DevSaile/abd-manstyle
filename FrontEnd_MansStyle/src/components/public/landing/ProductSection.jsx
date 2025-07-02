import React, { useState, useEffect } from "react";
import CatalogProductCard from "../catalog/CatalogProductCard";
import ComboBox from "../../common/ComboBox";
import useProductos from "../../../hooks/useProducts";
import { CircleAlert } from "lucide-react";

const ProductSection = () => {
  const { productos } = useProductos();

  // Selected filters
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [selectedSucursal, setSelectedSucursal] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

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
    if (
      selectedBrand !== "Todos" &&
      !marcasDisponibles.includes(selectedBrand)
    ) {
      setSelectedBrand("Todos");
    }
    if (
      selectedCategory !== "Todos" &&
      !categoriasDisponibles.includes(selectedCategory)
    ) {
      setSelectedCategory("Todos");
    }
  }, [productos, selectedSucursal, selectedBrand, selectedCategory]);

  // Filter products according to active filters and search term
  const filteredProducts = productos.filter((p) => {
    const matchCategory =
      selectedCategory === "Todos" ||
      p.Descripcion_Categoria === selectedCategory;
    const matchBrand =
      selectedBrand === "Todos" ||
      (p.Marca && p.Marca.toLowerCase() === selectedBrand.toLowerCase());
    const matchSucursal =
      selectedSucursal === "Todos" ||
      p.Descripcion_Sucursal === selectedSucursal;
    const matchSearch =
      !searchTerm ||
      (p.Nombre && p.Nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchBrand && matchSucursal && matchSearch;
  });

  // Color palette for dark interface
  const comboBoxProps = {
    bgColor: "bg-[#23272f] text-white",
    dropdownBgColor: "bg-[#23272f]",
    inputBgColor: "bg-[#23272f] text-white",
    hoverBgColor: "hover:bg-[#2563eb]/30",
  };
  console.log(`filterd produc ${filteredProducts}`);

  return (
    <section className="py-6 px-4 bg-[#18181b] rounded-xl">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-5">
          <input
            type="text"
            className="w-full bg-[#23272f] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder-gray-400"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative group">
            <CircleAlert className="text-white cursor-pointer" size={20} />
            <div className="absolute top-1/2 right-full mr-2 -translate-y-1/2 w-64 p-2 text-center bg-gray-800 text-sm text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-80 transition-opacity z-50">
              Seleccione un producto para ver mas detalles.
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center rounded">
          <ComboBox
            name={"Categoria"}
            options={filteredCategories}
            onSelect={setSelectedCategory}
            selected={selectedCategory}
            {...comboBoxProps}
          />
          <ComboBox
            name={"Marca"}
            options={filteredBrands}
            onSelect={setSelectedBrand}
            selected={selectedBrand}
            {...comboBoxProps}
          />
          <ComboBox
            name={"Sucursal"}
            options={filteredSucursales}
            onSelect={setSelectedSucursal}
            selected={selectedSucursal}
            {...comboBoxProps}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mx-5 max-h-[660px] overflow-y-auto">
        {filteredProducts.map((product) => (
          <CatalogProductCard
            key={product.id || product.Nombre}
            producto={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
