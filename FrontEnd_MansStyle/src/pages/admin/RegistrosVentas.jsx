import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingBag,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import StatCard from "@/components/common/StatCard";
import SaleCard from "@/components/registrosventa/SalesCard";
import TopSection from "../../components/common/TopSection";
import { obtenerTodasLasVentas } from "@/services/VentasService";
import * as XLSX from "xlsx";


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
   const { setTitle } = useOutletContext();
    useEffect(() => {
      setTitle("Registro de Ventas");
    }, [setTitle]);
  
    const exportToExcel = (ventas) => {
  const data = [];

  ventas.forEach((venta) => {
    const { ID_Venta, Fecha_Venta, Detalles, NombreSucursal, NombreVendedor, Total } = venta;

    (Detalles || []).forEach((producto) => {
      data.push({
        "ID Venta": ID_Venta,
        Fecha: new Date(Fecha_Venta).toLocaleDateString(),
        Sucursal: NombreSucursal,
        Vendedor: NombreVendedor,
        Producto: producto.NombreProducto,
        Cantidad: producto.Cantidad,
        "Precio Unitario": producto.PrecioProducto,
        "Total Producto": (producto.Cantidad * producto.PrecioProducto).toFixed(2),
        "Total Venta": Total,
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ventas");
  XLSX.writeFile(workbook, "reporte_ventas.xlsx");
};

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
      console.log(data)
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
    const numProducts = Array.isArray(venta.Detalles)
      ? venta.Detalles.length
      : 0;
    const meetsMinProducts = !minProducts || numProducts >= Number(minProducts);

    // Total income filter
    const meetsMinTotal = !minTotal || (venta.Total || 0) >= Number(minTotal);

    // Sucursal filter
    const meetsSucursal = !sucursal || venta.NombreSucursal === sucursal;

    return (
      afterStart &&
      beforeEnd &&
      meetsMinProducts &&
      meetsMinTotal &&
      meetsSucursal
    );
  });

  // Ordenar según el estado
  const ventasOrdenadas = orderAsc
    ? filteredVentas
    : filteredVentas.toReversed();

  return (
    <div className="flex-1 relative z-10">
        <TopSection>
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
</TopSection>
        {/* Filter Bar */}
        {/* Filter Bar */}
        <motion.div className="flex flex-wrap justify-evenly my-6 items-end"
        initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
          <div className="flex flex-col">
            <label className="text-blue-900 text-sm mb-1">Desde</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            className="input-filter"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-900 text-sm mb-1">Hasta</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            className="input-filter"
            />
          </div>
          <div className="flex flex-col w-32">
            <label className="text-blue-900 text-sm mb-1">Mín. productos</label>
            <input
              type="number"
              min={1}
              value={minProducts}
              onChange={(e) => setMinProducts(e.target.value)}
              placeholder="Ej: 2"
            className="input-filter"
            />
          </div>
          <div className="flex flex-col w-36">
            <label className="text-blue-900 text-sm mb-1">
              Mín. ingreso ($)
            </label>
            <input
              type="number"
              min={0}
              value={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
              placeholder="Ej: 100"
            className="input-filter"
            />
          </div>
          <div className="flex flex-col w-44">
            <label className="text-blue-900 text-sm mb-1">Sucursal</label>
            <select
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
            className="input-filter"
            >
              <option value="">Todas</option>
              {sucursales.map((suc) => (
                <option key={suc} value={suc}>
                  {suc}
                </option>
              ))}
            </select>
          </div>
          {/* Botón de orden */}
          <button
            type="button"
            onClick={() => setOrderAsc((prev) => !prev)}
            className="flex items-center bg-blue-100 text-blue-700 rounded-lg px-3 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            title={orderAsc ? "Orden ascendente" : "Orden descendente"}
          >
            {orderAsc ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            <span className="ml-2">
              {orderAsc ? "Ascendente" : "Descendente"}
            </span>
          </button>
               <button
        onClick={() => exportToExcel(ventasOrdenadas)}
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow transition"
      >
        Exportar a Excel
      </button>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 mb-8 mx-8"
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
    </div>
  );
};

export default RegistrosVenta;
