import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { obtenerProductos } from "../services/ProductosService";
import { obtenerSucursales} from "../services/SucursalService";


import Header from "../components/common/Header";
import ComboBox from "../components/common/ComboBox";
import ProductCard from "../components/products/ProductCard";
import SalesTrendChart from "../components/products/SalesTrendChart";
import SellsPerCategory from "../components/overview/VentasPorCategoria";

const ProductsPage = () => {

    const [productos, setProductos] = useState([]);
    const [Sucursales, setSucursales] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");

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

    // Filter products whenever filters change
    useEffect(() => {
        const filtered = productos.filter((product) => {
            const matchesSearchTerm = product.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.versucu === selectedCategory;
            const matchesPrice =
                selectedPrice === "All" ||
                (selectedPrice === "Under $50" && product.Precio_Producto < 50) ||
                (selectedPrice === "$50 - $100" && product.Precio_Producto >= 50 && product.Precio_Producto <= 100) ||
                (selectedPrice === "Above $100" && product.Precio_Producto > 100);
            const matchesBrand = selectedBrand === "All" || product.Marca === selectedBrand;

            return matchesSearchTerm && matchesCategory && matchesPrice && matchesBrand;
        });

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedPrice, selectedBrand, productos]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Products" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Filters */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <ComboBox name={"Categorias"} options={Sucursales} onSelect={setSelectedCategory} />
                    <ComboBox name={"Precio"} options={["All", "Under $50", "$50 - $100", "Above $100"]} onSelect={setSelectedPrice} />
                    <ComboBox name={"Marca"} options={["All", "Brand A", "Brand B", "Brand C"]} onSelect={setSelectedBrand} />
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

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.ID_Producto}
                            name={product.Nombre}
                            Sucursal={product.versucu}
                            price={product.Precio_Producto}
                            brand={product.Marca}
                            category={product.Descripcion_Categoria}
                            stock={product.Cantidad}
                            image={product.image ? product.image : "https://via.placeholder.com/150"}
                        />
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    <SalesTrendChart />
                    <SellsPerCategory />
                </div>
            </main>
        </div>
    );
};

export default ProductsPage;