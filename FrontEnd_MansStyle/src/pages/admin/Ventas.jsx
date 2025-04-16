import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import ProductCardSales from "../../components/ventas/ProductCardSales";
import CartSummary from "../../components/ventas/CartSummary";
import ComboBox from "../../components/common/ComboBox";
import { CheckCircle } from "lucide-react";

const CashierPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [selectedSucursal, setSelectedSucursal] = useState("Sucursal 1"); // Default branch
    const [selectedClient, setSelectedClient] = useState("Cliente 1"); // Default client

    const clients = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4"]; // Example clients

    const products = [
        { id: 1, name: "Product 1", price: 10.0, stock: 10, sucursal: "Sucursal 1" },
        { id: 2, name: "Product 2", price: 15.0, stock: 5, sucursal: "Sucursal 2" },
        { id: 3, name: "Product 3", price: 20.0, stock: 8, sucursal: "Sucursal 1" },
        { id: 4, name: "Product 4", price: 25.0, stock: 12, sucursal: "Sucursal 2" },
        { id: 5, name: "Product 5", price: 30.0, stock: 20, sucursal: "Sucursal 1" },
    ];

    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // Update quantity if the product is already in the cart
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new product to the cart
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Filter products based on the search term and selected branch
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.sucursal === selectedSucursal
    );

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Cashier" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Search Bar and ComboBoxes */}
                <div className="mb-4 flex gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ flex: "2" }} // Reduce the width of the search input
                    />
                    <div className="min-w-[200px]">
                        <ComboBox
                            name={selectedSucursal}
                            options={["Sucursal 1", "Sucursal 2"]}
                            onSelect={(sucursal) => setSelectedSucursal(sucursal)}
                        />
                    </div>
                    <div className="min-w-[200px]">
                        <ComboBox
                            name={selectedClient}
                            options={clients}
                            onSelect={(client) => setSelectedClient(client)}
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* PRODUCT LIST */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 auto-rows-min">
                        {filteredProducts.map((product) => (
                            <ProductCardSales
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                onClick={() => addToCart(product)} // Add product to cart on click
                            />
                        ))}
                    </div>

                    {/* CART AND CHECKOUT */}
                    <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">Cart</h2>
                        <CartSummary
                            cartItems={cartItems}
                            updateCartItemQuantity={updateCartItemQuantity}
                        />
                        <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full">
                            <CheckCircle className="mr-2" size={18} />
                            Complete Sale
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CashierPage;