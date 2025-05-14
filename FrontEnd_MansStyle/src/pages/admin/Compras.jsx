import React, { useState } from "react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import ProductCardSales from "../../components/ventas/ProductCardSales";
import ComboBoxID from "../../components/common/ComboxID";
import { Plus, CheckCircle } from "lucide-react";
import CartSummaryBuying from "../../components/compras/BuyingCartSummary";
import NewProduct from "../../components/compras/NewProductModal";

const BuyingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Test data for providers
  const providers = [
    { label: "Proveedor A", value: "A" },
    { label: "Proveedor B", value: "B" },
    { label: "Proveedor C", value: "C" },
  ];

  // Test data for products
  const products = [
    { ID_Producto: 1, Nombre: "Producto 1", Precio_Producto: 10, Proveedor: "A", url_image: "" },
    { ID_Producto: 2, Nombre: "Producto 2", Precio_Producto: 20, Proveedor: "B", url_image: "" },
    { ID_Producto: 3, Nombre: "Producto 3", Precio_Producto: 30, Proveedor: "A", url_image: "" },
    { ID_Producto: 4, Nombre: "Producto 4", Precio_Producto: 40, Proveedor: "C", url_image: "" },
  ];

  // Filter products based on the selected provider and search term
  const filteredProducts = products.filter(
    (product) =>
      (!selectedProvider || product.Proveedor === selectedProvider.value) &&
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.ID_Producto === product.ID_Producto);
      return existingItem
        ? prevCart.map((item) =>
            item.ID_Producto === product.ID_Producto
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1, buyingPrice: 0 }];
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.ID_Producto === id ? { ...item, quantity } : item))
    );
  };

  const updateCartItemPrice = (id, price) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.ID_Producto === id ? { ...item, buyingPrice: price } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.ID_Producto !== id));
  };

  const handleAddNewProduct = () => {
    alert("Add new product functionality triggered!");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Buying" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* ComboBoxes for Provider */}
        <div className="mb-4 flex gap-4">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-8/12 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <ComboBoxID
            name="Proveedor"
            options={providers}
            selected={selectedProvider}
            onSelect={(provider) => setSelectedProvider(provider)}
          />
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <Plus className="mr-2" size={18} />
            Nuevo Producto
          </button>
        </div>

        {/* Flex Container for Products and Cart Summary */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product List */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
            {filteredProducts.map((product) => (
              <ProductCardSales
                key={product.ID_Producto}
                name={product.Nombre}
                price={product.Precio_Producto}
                image={product.url_image}
                onClick={() => addToCart(product)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Carrito</h2>
            <CartSummaryBuying
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              updateCartItemPrice={updateCartItemPrice}
              removeFromCart={removeFromCart}
            />
            <button
              onClick={() => alert("Compra completada!")}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full"
            >
              <CheckCircle className="mr-2" size={18} />
              Completar Compra
            </button>
          </div>
        </div>
        <NewProduct
          openAdd={showAddProductModal}
          AddModalClose={() => setShowAddProductModal(false)}
          />
      </main>
    </div>
  );
};

export default BuyingPage;