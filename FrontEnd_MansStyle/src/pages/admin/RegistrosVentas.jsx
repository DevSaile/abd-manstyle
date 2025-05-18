import { useEffect, useState } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import SaleCard from "../../components/registrosventa/SalesCard";

import { obtenerTodasLasVentas } from "../../services/VentasService";

const RegistrosVenta = () => {
    const [ventas, setVentas] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        obtenerTodasLasVentas().then((data) => {
            setVentas(data);

            const totalOrders = data.length;
            const totalRevenue = data.reduce((acc, v) => acc + (v.Total || 0), 0);
            const completedOrders = totalOrders;

            setStats({
                totalOrders,
                completedOrders,
                pendingOrders: 0,
                totalRevenue,
            });
        });
    }, []);

    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"Registro de Ventas"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Ventas' icon={ShoppingBag} value={stats.totalOrders} color='#6366F1' />
                    <StatCard name='Pendientes' icon={Clock} value={stats.pendingOrders} color='#F59E0B' />
                    <StatCard
                        name='Completadas'
                        icon={CheckCircle}
                        value={stats.completedOrders}
                        color='#10B981'
                    />
                    <StatCard name='Ingresos Totales' icon={DollarSign} value={`$${stats.totalRevenue.toFixed(2)}`} color='#EF4444' />
                </motion.div>

                <motion.div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'
                  initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
                    {ventas.length > 0 ? (
                        ventas.map((venta, index) => (
                            <SaleCard
                                key={index}
                                employee={venta.NombreVendedor || "Sin asignar"}
                                client={venta.NombreCliente || "Cliente desconocido"}
                                date={new Date(venta.Fecha_Venta).toLocaleDateString()}
                                total={venta.Total || 0}
                                amountGiven={venta.pagacon || 0}
                                exchange={venta.cambio || 0}
                                products={(venta.Detalles || []).map((d) => ({
                                    name: d.NombreProducto || "Producto",
                                    unitPrice: d.PrecioProducto || 0,
                                    quantity: d.Cantidad || 0
                                }))}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No hay ventas registradas aún.</p>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default RegistrosVenta;