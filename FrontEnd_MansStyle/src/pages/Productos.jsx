import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { obtenerProductos } from "../services/ProductosService";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, Search, TrendingUp } from "lucide-react";
import SellsPerCategory from "../components/overview/VentasPorCategoria";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ComboBox from "../components/common/ComboBox";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {

    // Categorías, precios y marcas para el filtro
    const CATEGORIES = ["All", "Electronics", "Accessories", "Fitness", "Home"];
    const PRICES = ["All", "Under $50", "$50 - $100", "Above $100"];
    const BRANDS = ["All", "Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];

    // Estado para productos y filtros
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");

    // Llamada a la API para obtener productos
    useEffect(() => {
        obtenerProductos().then((data) => setProductos(data));
    }, []);


    // Filtrar productos según los criterios
    const filteredProducts = productos.filter((product) => {

        const matchesSearchTerm = product.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.Descripcion_Categoria === selectedCategory;
        const matchesPrice =
            selectedPrice === "All" ||
            (selectedPrice === "Under $50" && product.Precio_Producto < 50) ||
            (selectedPrice === "$50 - $100" && product.Precio_Producto >= 50 && product.Precio_Producto <= 100) ||
            (selectedPrice === "Above $100" && product.Precio_Producto > 100);
        const matchesBrand = selectedBrand === "All" || product.Marca === selectedBrand;

        return matchesSearchTerm && matchesCategory && matchesPrice && matchesBrand;

    });

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Products" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Filtros */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <ComboBox name={"Categorias"} options={CATEGORIES} onSelect={setSelectedCategory} />
                    <ComboBox name={"Precio"} options={PRICES} onSelect={setSelectedPrice} />
                    <ComboBox name={"Marca"} options={BRANDS} onSelect={setSelectedBrand} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Tarjetas de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {productos.map((product) => (
                        <ProductCard
                            key={product.ID_Producto}
                            name={product.Nombre}
                            price={product.Precio_Producto}
                            brand={product.Marca}
                            category={product.Descripcion_Categoria}
                            stock={product.Cantidad}
                            image={product.image ? product.image : "https://via.placeholder.com/150"} // Usa una imagen predeterminada si está vacía
                        />
                    ))}

                </div>

                                {/* CHARTS */}
                <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                    <SalesTrendChart />
                    <SellsPerCategory />
                </div>
            </main>
        </div>
    );

};

export default ProductsPage;