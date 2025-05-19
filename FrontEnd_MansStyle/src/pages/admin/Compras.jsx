import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import ProductCardSales from "../../components/ventas/ProductCardSales";
import { Plus, CheckCircle } from "lucide-react";
import CartSummaryBuying from "../../components/compras/BuyingCartSummary";
import NewProduct from "../../components/compras/NewProductModal";
import { ExtraerInfoCompra } from "../../services/ProductosService";
import { agregarCompraProducto } from "../../services/CompraHitorialService";

const BuyingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [tipoPago, setTipoPago] = useState('contado');

  // Obtener productos al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productos = await ExtraerInfoCompra();
        setProducts(productos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Datos de proveedores
  const providers = [
    { label: "Proveedor A", value: "A" },
    { label: "Proveedor B", value: "B" },
    { label: "Proveedor C", value: "C" },
  ];

  // Filtrar productos
  const filteredProducts = products.filter(
    (product) => product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones del carrito
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

  // Función para completar compra
  const handleCompletePurchase = async () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      const compraData = {
        Estado: 1,
        Fecha_Compra: new Date().toISOString(),
        DetallesCompra: cartItems.map(item => ({
          ID_Producto: item.ID_Producto,
          Cantidad: item.quantity,
          Precio_Compra: item.buyingPrice || item.Precio_Producto,
          ID_Sucursal: products.ID_Sucursal // Ajusta según tu lógica
        })),
        Precio_Compra: cartItems.reduce(
          (total, item) => total + (item.buyingPrice || item.Precio_Producto) * item.quantity, 0
        ),
        CantidadCompra: cartItems.reduce((total, item) => total + item.quantity, 0)
      };

      const resultado = await agregarCompraProducto(compraData);

      if (resultado) {
        alert('Compra registrada exitosamente!');
        setCartItems([]);
      } else {
        alert('Error al registrar la compra');
      }
    } catch (error) {
      console.error('Error al completar compra:', error);
      alert('Ocurrió un error al procesar la compra');
    }
  };

  return (
    <motion.div className="flex-1 overflow-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <Header title="Buying" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="mb-4 flex gap-4">

          {/* Buscador */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-8/12 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <Plus className="mr-2" size={18} />
            Nuevo Producto
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
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

          {/* Resumen del carrito */}
          <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Carrito</h2>
            <CartSummaryBuying
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              updateCartItemPrice={updateCartItemPrice}
              removeFromCart={removeFromCart}
            />
            <button
              onClick={handleCompletePurchase}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full"
              disabled={cartItems.length === 0}
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
    </motion.div>
  );
};

export default BuyingPage;