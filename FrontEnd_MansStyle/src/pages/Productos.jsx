import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, Search, TrendingUp } from "lucide-react";
import SellsPerCategory from "../components/overview/VentasPorCategoria";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ComboBox from "../components/common/ComboBox";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {
    // Test data for ComboBox options
    const CATEGORIES = ["All", "Electronics", "Accessories", "Fitness", "Home"];
    const PRICES = ["All", "Under $50", "$50 - $100", "Above $100"];
    const BRANDS = ["All", "Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];

    // Product data
    const PRODUCTS = [
        {
            id: 1,
            name: "Wireless Earbuds",
            price: 59.99,
            brand: "Brand A",
            category: "Electronics",
            stock: 143,
            image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
        },
        {
            id: 2,
            name: "Leather Wallet",
            price: 39.99,
            brand: "Brand B",
            category: "Accessories",
            stock: 89,
            image: "https://images.unsplash.com/photo-1512499617640-c2f999018cb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA",
        },
        {
            id: 3,
            name: "Smart Watch",
            price: 199.99,
            brand: "Brand C",
            category: "Electronics",
            stock: 56,
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA",
        },
        {
            id: 4,
            name: "Yoga Mat",
            price: 29.99,
            brand: "Brand D",
            category: "Fitness",
            stock: 210,
            image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA",
        },
        {
            id: 5,
            name: "Coffee Maker",
            price: 79.99,
            brand: "Brand E",
            category: "Home",
            stock: 78,
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA",
        },
    ];

    // State for filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");

    // Filtered products
    const filteredProducts = PRODUCTS.filter((product) => {
        // Filter by search term
        const matchesSearchTerm =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by category
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

        // Filter by price
        const matchesPrice =
            selectedPrice === "All" ||
            (selectedPrice === "Under $50" && product.price < 50) ||
            (selectedPrice === "$50 - $100" && product.price >= 50 && product.price <= 100) ||
            (selectedPrice === "Above $100" && product.price > 100);

        // Filter by brand
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;

        return matchesSearchTerm && matchesCategory && matchesPrice && matchesBrand;
    });

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Products' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* ComboBoxes for filtering */}
                    <ComboBox name={"Categorias"} options={CATEGORIES} onSelect={setSelectedCategory} />
                    <ComboBox name={"Precio"} options={PRICES} onSelect={setSelectedPrice} />
                    <ComboBox name={"Marca"} options={BRANDS} onSelect={setSelectedBrand} />

                    {/* Search Bar */}
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search products...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                </motion.div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            brand={product.brand}
                            category={product.category}
                            stock={product.stock}
                            image={product.image}
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