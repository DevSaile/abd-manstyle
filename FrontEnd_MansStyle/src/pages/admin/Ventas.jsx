import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import ProductCardSales from "@/components/ventas/ProductCardSales";
import CartSummary from "@/components/ventas/CartSummary";
import { CheckCircle } from "lucide-react";
import { obtenerProductosPorSucursal } from "@/services/ProductosService";
import { agregarVenta } from "@/services/VentasService";

const CashierPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [amountGiven, setAmountGiven] = useState(""); // Nuevo estado

  useEffect(() => {
    const storedSucursalId = localStorage.getItem("idSucursal");
    if (storedSucursalId) {
      obtenerProductosPorSucursal(storedSucursalId).then((productosData) => {
        setProducts(productosData);
      });
    }
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.ID_Producto === product.ID_Producto
      );
      return existingItem
        ? prevCart.map((item) =>
            item.ID_Producto === product.ID_Producto
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.ID_Producto === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.ID_Producto !== id)
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleSale = async () => {
    if (cartItems.length === 0) {
      alert("Selecciona un cliente y agrega productos al carrito.");
      return;
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.Precio_Producto * item.quantity,
      0
    );

    const pago = parseFloat(amountGiven);
    if (isNaN(pago) || pago < total) {
      alert("El monto pagado no es válido o es insuficiente.");
      return;
    }

    const venta = {
      Estado: 1,
      ID_Cliente: 1,
      ID_Sucursal: localStorage.getItem("idSucursal"), // Use Sucursal ID from localStorage
      Fecha_Venta: new Date(),
      Subtotal: total,
      Total: total,
      pagacon: pago,
      cambio: pago - total,
      Cantidad: getTotalItems(),
      Detalles: cartItems.map((item) => ({
        ID_Producto: item.ID_Producto,
        Cantidad: item.quantity,
        PrecioProducto: item.Precio_Producto,
      })),
    };

    const resultado = await agregarVenta(venta);

    if (resultado) {
      alert("Venta registrada correctamente.");
      setCartItems([]);
      setAmountGiven("");
    } else {
      alert("Error al registrar la venta.");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.Cantidad > 0
  );

  return (
    <motion.div
      className="flex-1 overflow-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Header title="Ventas" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* ComboBoxes for Cliente */}
        <div className="mb-4 flex gap-4">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-8/12 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
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
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Carrito
            </h2>
            <CartSummary
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              removeFromCart={removeFromCart}
              amountGiven={amountGiven}
              setAmountGiven={setAmountGiven}
            />
            <button
              onClick={handleSale}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full"
            >
              <CheckCircle className="mr-2" size={18} />
              Completar Venta
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default CashierPage;
