import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import ProductCardSales from "../../components/ventas/ProductCardSales";
import CartSummary from "../../components/ventas/CartSummary";
import ComboBoxID from "../../components/common/ComboxID";
import { CheckCircle } from "lucide-react";

// Metodos para registrar la venta
import { obtenerProductosPorSucursal } from "../../services/ProductosService";
import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerClientesActivos } from "../../services/ClientesService";
import { agregarVenta } from "../../services/VentasService";


const CashierPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [sucursales, setSucursales] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        obtenerSucursales().then((sucursalesData) => {
            setSucursales(sucursalesData.map((s) => ({ label: s.Nombre, value: s.ID_Sucursal })));
        });

        obtenerClientesActivos().then((clientesData) => {
            setClients(clientesData.map((c) => ({ label: c.Nombre, value: c.ID_Cliente })));
        });
    }, []);

    useEffect(() => {
        if (selectedSucursal) {
            obtenerProductosPorSucursal(selectedSucursal.value).then((productosData) => {
                setProducts(productosData);
            });
        }
    }, [selectedSucursal]);

    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.ID_Producto === product.ID_Producto);
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
            prevCart.map((item) => (item.ID_Producto === id ? { ...item, quantity } : item))
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.ID_Producto !== id));
    };

    const handleSale = async () => {
        if (!selectedClient || cartItems.length === 0) {
            alert("Selecciona un cliente y agrega productos al carrito.");
            return;
        }
    
        const total = cartItems.reduce(
            (acc, item) => acc + item.Precio_Producto * item.quantity,
            0
        );
    
        const pago = parseFloat(prompt("¿Con cuánto paga el cliente?")); // O usa input con estado
        if (isNaN(pago) || pago < total) {
            alert("El monto pagado no es válido o es insuficiente.");
            return;
        }
    
        const venta = {
            Estado: 1,
            ID_Cliente: selectedClient.value,
            ID_Sucursal: selectedSucursal?.value || 1, // Requiere selección de sucursal
            Fecha_Venta: new Date(),
            Subtotal: total, // o calcula subtotal si aplicas impuestos después
            Total: total,
            pagacon: pago,
            cambio: pago - total,
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
        } else {
            alert("Error al registrar la venta.");
        }
    };
    

    const filteredProducts = products.filter((product) =>
        product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Cashier" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="mb-4 flex gap-4">
                    <ComboBoxID
                        name="Sucursal"
                        options={sucursales}
                        selected={selectedSucursal}
                        onSelect={(sucursal) => setSelectedSucursal(sucursal)}
                    />
                    <ComboBoxID
                        name="Cliente"
                        options={clients}
                        selected={selectedClient}
                        onSelect={(client) => setSelectedClient(client)}
                    />
                </div>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 auto-rows-min">
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

                <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-100 mb-4">Carrito</h2>
                    <CartSummary
                        cartItems={cartItems}
                        updateCartItemQuantity={updateCartItemQuantity}
                        removeFromCart={removeFromCart}
                    />
                    <button
                        onClick={handleSale}
                        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full"
                    >
                        <CheckCircle className="mr-2" size={18} />
                        Completar Venta
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CashierPage;
