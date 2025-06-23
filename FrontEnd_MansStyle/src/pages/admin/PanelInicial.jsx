import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  ShoppingBag,
  DollarSign,
  ChartNoAxesCombined,
  Contact,
  User,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

import StatCard from "@/components/common/StatCard";
import SalesOverviewChart from "@/components/panelinicial/SalesOverviewChart";
import SellsPerCategory from "@/components/panelinicial/VentasPorCategoria";
import SalesChannelChart from "@/components/panelinicial/SalesChannelChart"; // ← este es el reutilizable
import {
  obtenerTotalesPorSucursal,
  ObtenerTop5MayorStock,
  ObtenerProductosBajoStock,
} from "@/services/SucursalService";
import StoreToggleCard from "@/components/panelinicial/StoreChange";
import TopSection from "@/components/common/TopSection";

const OverviewPage = () => {
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Panel Inicial");
  }, [setTitle]);

  const [totalesPrincipal, setTotalesPrincipal] = useState(null);
  const [totalesPrimaria, setTotalesPrimaria] = useState(null);
  const [activeStore, setActiveStore] = useState("principal");

  const [topStock, setTopStock] = useState([]);
  const [bajoStock, setBajoStock] = useState([]);
  const umbral = 5;

  const isPrimary = activeStore === "primaria";
  const activeTotals = isPrimary ? totalesPrimaria : totalesPrincipal;
  const currentStoreId = isPrimary ? 2 : 1;

  const toggleStore = () =>
    setActiveStore((prev) => (prev === "principal" ? "primaria" : "principal"));

  // Cargar datos al inicio
  useEffect(() => {
    obtenerTotalesPorSucursal(1).then(setTotalesPrincipal);
    obtenerTotalesPorSucursal(2).then(setTotalesPrimaria);
  }, []);

  // Cargar datos dinámicos al cambiar sucursal
  useEffect(() => {
    const fetchStockData = async () => {
      const top = await ObtenerTop5MayorStock(currentStoreId);
      const bajos = await ObtenerProductosBajoStock(currentStoreId, umbral);

      const topMapped = top.map((p) => ({ name: p.Nombre, value: p.Cantidad }));
      const bajosMapped = bajos.map((p) => ({
        name: p.Nombre,
        value: p.Cantidad,
      }));

      setTopStock(topMapped);
      setBajoStock(bajosMapped);
    };

    fetchStockData();
  }, [currentStoreId]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main>
        {/* TOGGLE + DYNAMIC STATS */}
        <TopSection>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8">
            <StoreToggleCard isPrimary={isPrimary} toggleStore={toggleStore} />

            <StatCard
              name="Clientes"
              icon={User}
              value={activeTotals ? activeTotals.Clientes : "Cargando..."}
              color="#d9c252"
            />
            <StatCard
              name="Productos"
              icon={ShoppingBag}
              value={activeTotals ? activeTotals.Productos : "Cargando..."}
              color="#b572f7"
            />
            <StatCard
              name="Ventas"
              icon={ChartNoAxesCombined}
              value={activeTotals ? activeTotals.Ventas : "Cargando..."}
              color="#e04fa4"
            />
            <StatCard
              name="Ganancia Neta"
              icon={DollarSign}
              value={
                activeTotals
                  ? `$${activeTotals.GananciasTotales}`
                  : "Cargando..."
              }
              color="#42CF65"
            />
            <StatCard
              name="Marcas"
              icon={BarChart2}
              value={activeTotals ? activeTotals.Marcas : "Cargando..."}
              color="#10B981"
            />
          </div>
        </TopSection>
              
        {/* CHARTS */}
        <section className="px-20 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesOverviewChart idSucursal={currentStoreId} />
            <SellsPerCategory idSucursal={currentStoreId} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <SalesChannelChart
              data={topStock}
              title="Top 5 productos con más stock"
            />
            <SalesChannelChart
              data={bajoStock}
              title="Productos con bajo stock"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default OverviewPage;
