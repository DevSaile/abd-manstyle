import { useEffect, useState } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag, ArrowDown, ArrowUp } from "lucide-react";
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

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minProducts, setMinProducts] = useState("");
  const [minTotal, setMinTotal] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState([]);
  const [orderAsc, setOrderAsc] = useState(false); // Nuevo estado para el orden

  useEffect(() => {
    obtenerTodasLasVentas().then((data) => {
      setVentas(data);

      // Unique sucursales for dropdown
      const uniqueSucursales = Array.from(
        new Set(data.map((v) => v.NombreSucursal || ""))
      ).filter((s) => s);
      setSucursales(uniqueSucursales);

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

  // Filter ventas by all criteria
  const filteredVentas = ventas.filter((venta) => {
    if (!venta.Fecha_Venta) return false;
    // Date filter
    const ventaDate = new Date(venta.Fecha_Venta);
    const ventaDateStr = ventaDate.toISOString().slice(0, 10);
    const afterStart = !startDate || ventaDateStr >= startDate;
    const beforeEnd = !endDate || ventaDateStr <= endDate;

    // Number of products filter
    const numProducts = Array.isArray(venta.Detalles) ? venta.Detalles.length : 0;
    const meetsMinProducts = !minProducts || numProducts >= Number(minProducts);

    // Total income filter
    const meetsMinTotal = !minTotal || (venta.Total || 0) >= Number(minTotal);

    // Sucursal filter
    const meetsSucursal = !sucursal || (venta.NombreSucursal === sucursal);

    return afterStart && beforeEnd && meetsMinProducts && meetsMinTotal && meetsSucursal;
  });

  // Ordenar según el estado
  const ventasOrdenadas = orderAsc ? filteredVentas : filteredVentas.toReversed();

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Registro de Ventas"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Ventas"
            icon={ShoppingBag}
            value={stats.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name="Completadas"
            icon={CheckCircle}
            value={stats.completedOrders}
            color="#10B981"
          />
          <StatCard
            name="Ingresos Totales"
            icon={DollarSign}
            value={`$${stats.totalRevenue.toFixed(2)}`}
            color="#EF4444"
          />
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-1">Desde</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="bg-gray-700 text-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-1">Hasta</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="bg-gray-700 text-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-32">
            <label className="text-gray-300 text-sm mb-1">Mín. productos</label>
            <input
              type="number"
              min={1}
              value={minProducts}
              onChange={e => setMinProducts(e.target.value)}
              placeholder="Ej: 2"
              className="bg-gray-700 text-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-36">
            <label className="text-gray-300 text-sm mb-1">Mín. ingreso ($)</label>
            <input
              type="number"
              min={0}
              value={minTotal}
              onChange={e => setMinTotal(e.target.value)}
              placeholder="Ej: 100"
              className="bg-gray-700 text-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-44">
            <label className="text-gray-300 text-sm mb-1">Sucursal</label>
            <select
              value={sucursal}
              onChange={e => setSucursal(e.target.value)}
              className="bg-gray-700 text-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              {sucursales.map((suc) => (
                <option key={suc} value={suc}>{suc}</option>
              ))}
            </select>
          </div>
          {/* Botón de orden */}
          <button
            type="button"
            onClick={() => setOrderAsc((prev) => !prev)}
            className="flex items-center bg-gray-700 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            title={orderAsc ? "Orden ascendente" : "Orden descendente"}
          >
            {orderAsc ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            <span className="ml-2">{orderAsc ? "Ascendente" : "Descendente"}</span>
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {ventasOrdenadas.length > 0 ? (
            ventasOrdenadas.map((venta, index) => (
              <SaleCard
                key={index}
                employee={venta.NombreVendedor || "Sin asignar"}
                client={venta.NombreSucursal || "Cliente desconocido"}
                date={new Date(venta.Fecha_Venta).toLocaleDateString()}
                total={venta.Total || 0}
                amountGiven={venta.pagacon || 0}
                exchange={venta.cambio || 0}
                products={(venta.Detalles || []).map((d) => ({
                  name: d.NombreProducto || "Producto",
                  unitPrice: d.PrecioProducto || 0,
                  quantity: d.Cantidad || 0,
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