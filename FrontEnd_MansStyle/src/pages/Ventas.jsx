import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import ProductCard from "../components/productos/ProductCard";
import CartSummary from "../components/ventas/CartSummary";
import { CheckCircle } from "lucide-react";

const CashierPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const products = [
        { id: 1, name: "Product 1", price: 10.0 },
        { id: 2, name: "Product 2", price: 15.0 },
        { id: 3, name: "Product 3", price: 20.0 },
        { id: 4, name: "Product 4", price: 25.0 },
        { id: 5, name: "Product 5", price: 30.0 },
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

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Cashier" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* PRODUCT LIST */}
                    <motion.div
                        className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={`$${product.price.toFixed(2)}`}
                                onClick={() => addToCart(product)} // Add product to cart on click
                            />
                        ))}
                    </motion.div>

                    {/* CART AND CHECKOUT */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">Cart</h2>
                        <CartSummary cartItems={cartItems} />
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