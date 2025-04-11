import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, ChartNoAxesCombined, Contact, User } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/panelinicial/SalesOverviewChart";
import SellsPerCategory from "../components/panelinicial/VentasPorCategoria";
import SalesChannelChart from "../components/panelinicial/SalesChannelChart";

import { obtenerTotalesPorSucursal } from "../services/SucursalService";

const OverviewPage = () => {
    const [totalesPrincipal, setTotalesPrincipal] = useState(null); // Datos de Tienda Principal
    const [totalesPrimaria, setTotalesPrimaria] = useState(null);  // Datos de Tienda Primaria

    useEffect(() => {
        // Obtener totales para la Tienda Principal
        obtenerTotalesPorSucursal(1).then((data) => {
            setTotalesPrincipal(data);
        });

        // Obtener totales para la Tienda Primaria
        obtenerTotalesPorSucursal(2).then((data) => {
            setTotalesPrimaria(data);
        });
    }, []);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Overview" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS - Tienda Principal */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Mostrar datos dinámicos o "Cargando..." si no están listos */}
                    <StatCard
                        name="Clientes"
                        icon={User}
                        value={totalesPrincipal ? totalesPrincipal.Clientes : "Cargando..."}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Productos"
                        icon={ShoppingBag}
                        value={totalesPrincipal ? totalesPrincipal.Productos : "Cargando..."}
                        color="#EC4899"
                    />
                    <StatCard
                        name="Ventas"
                        icon={ChartNoAxesCombined}
                        value={totalesPrincipal ? totalesPrincipal.Ventas : "Cargando..."}
                        color="#10B981"
                    />
                    <StatCard
                        name="Ganancia Neta"
                        icon={Contact}
                        value={totalesPrincipal ? `$${totalesPrincipal.GananciasTotales}` : "Cargando..."}
                        color="#8B5CF6"
                    />
                    <StatCard
                        name="Marcas"
                        icon={BarChart2}
                        value={totalesPrincipal ? totalesPrincipal.Marcas : "Cargando..."}
                        color="#10B981"
                    />
                </motion.div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SalesOverviewChart />
                    <SellsPerCategory />
                    <SalesChannelChart />
                </div>

                <br />

                {/* STATS - Tienda Primaria */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Mostrar datos dinámicos o "Cargando..." si no están listos */}
                    <StatCard
                        name="Clientes"
                        icon={User}
                        value={totalesPrimaria ? totalesPrimaria.Clientes : "Cargando..."}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Productos"
                        icon={ShoppingBag}
                        value={totalesPrimaria ? totalesPrimaria.Productos : "Cargando..."}
                        color="#EC4899"
                    />
                    <StatCard
                        name="Ventas"
                        icon={ChartNoAxesCombined}
                        value={totalesPrimaria ? totalesPrimaria.Ventas : "Cargando..."}
                        color="#10B981"
                    />
                    <StatCard
                        name="Ganancia Neta"
                        icon={Contact}
                        value={totalesPrimaria ? `$${totalesPrimaria.GananciasTotales}` : "Cargando..."}
                        color="#8B5CF6"
                    />
                    <StatCard
                        name="Marcas"
                        icon={BarChart2}
                        value={totalesPrimaria ? totalesPrimaria.Marcas : "Cargando..."}
                        color="#10B981"
                    />
                </motion.div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SalesOverviewChart />
                    <SellsPerCategory />
                    <SalesChannelChart />
                </div>
            </main>
        </div>
    );
};

export default OverviewPage;