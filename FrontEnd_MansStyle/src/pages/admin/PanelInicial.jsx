import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Contact,
  User,
  Store,
  StoreIcon,
} from "lucide-react";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import SalesOverviewChart from "../../components/panelinicial/SalesOverviewChart";
import SellsPerCategory from "../../components/panelinicial/VentasPorCategoria";
import SalesChannelChart from "../../components/panelinicial/SalesChannelChart";
import { obtenerTotalesPorSucursal } from "../../services/SucursalService";
import StoreToggleCard from "../../components/panelinicial/StoreChange";
const OverviewPage = () => {
  const [totalesPrincipal, setTotalesPrincipal] = useState(null);
  const [totalesPrimaria, setTotalesPrimaria] = useState(null);
  const [activeStore, setActiveStore] = useState("principal");

  const isPrimary = activeStore === "primaria";
  const activeTotals = isPrimary ? totalesPrimaria : totalesPrincipal;
  const currentStoreId = isPrimary ? 2 : 1;

  const toggleStore = () =>
    setActiveStore((prev) => (prev === "principal" ? "primaria" : "principal"));

  useEffect(() => {
    obtenerTotalesPorSucursal(1).then(setTotalesPrincipal);
    obtenerTotalesPorSucursal(2).then(setTotalesPrimaria);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Panel Inicial" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* TOGGLE + DYNAMIC STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StoreToggleCard isPrimary={isPrimary} toggleStore={toggleStore} />

          <StatCard
            name="Clientes"
            icon={User}
            value={activeTotals ? activeTotals.Clientes : "Cargando..."}
            color="#6366F1"
          />
          <StatCard
            name="Productos"
            icon={ShoppingBag}
            value={activeTotals ? activeTotals.Productos : "Cargando..."}
            color="#EC4899"
          />
          <StatCard
            name="Ventas"
            icon={ChartNoAxesCombined}
            value={activeTotals ? activeTotals.Ventas : "Cargando..."}
            color="#10B981"
          />
          <StatCard
            name="Ganancia Neta"
            icon={Contact}
            value={
              activeTotals ? `$${activeTotals.GananciasTotales}` : "Cargando..."
            }
            color="#8B5CF6"
          />
          <StatCard
            name="Marcas"
            icon={BarChart2}
            value={activeTotals ? activeTotals.Marcas : "Cargando..."}
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <SellsPerCategory idSucursal={currentStoreId} />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
