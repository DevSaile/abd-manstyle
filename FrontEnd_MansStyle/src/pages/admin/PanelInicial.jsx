import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	BarChart2,
	ShoppingBag,
	Users,
	ChartNoAxesCombined,
	Contact,
	User,
} from "lucide-react";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import SalesOverviewChart from "../../components/panelinicial/SalesOverviewChart";
import SellsPerCategory from "../../components/panelinicial/VentasPorCategoria";
import SalesChannelChart from "../../components/panelinicial/SalesChannelChart"; // ← este es el reutilizable
import { obtenerTotalesPorSucursal, ObtenerTop5MayorStock, ObtenerProductosBajoStock } from "../../services/SucursalService";
import StoreToggleCard from "../../components/panelinicial/StoreChange";

const OverviewPage = () => {
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
			const bajosMapped = bajos.map((p) => ({ name: p.Nombre, value: p.Cantidad }));

			setTopStock(topMapped);
			setBajoStock(bajosMapped);
		};

		fetchStockData();
	}, [currentStoreId]); 

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
					<SalesOverviewChart idSucursal={currentStoreId} />
					<SellsPerCategory idSucursal={currentStoreId} />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
					<SalesChannelChart data={topStock} title="Top 5 productos con más stock" />
					<SalesChannelChart data={bajoStock} title="Productos con bajo stock" />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;
