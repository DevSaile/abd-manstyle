import { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import StatCard from "@/components/common/StatCard";
import BoughtCard from "@/components/registroscompra/BoughtCard";
import { obtenerRegistroCompras } from "@/services/CompraHitorialService";
import TopSection from "@/components/common/TopSection";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const exportToExcel = (compras) => {
  const data = [];

  compras.forEach((compra) => {
    const { ID_Entrada, Fecha_Compra, DetallesCompra } = compra;

    DetallesCompra?.forEach((producto) => {
      data.push({
        "ID Entrada": ID_Entrada,
        Fecha: new Date(Fecha_Compra).toLocaleDateString(),
        Producto: producto.NombreProducto,
        Cantidad: producto.Cantidad,
        "Precio Unitario": producto.Precio_Compra,
        "Total Producto": (producto.Cantidad * producto.Precio_Compra).toFixed(
          2
        ),
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Compras");
  XLSX.writeFile(workbook, "reporte_compras.xlsx");
};

const RegistroCompra = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCompras: 0,
    comprasActivas: 0,
    comprasCanceladas: 0,
    inversionTotal: 0,
    promedioCompra: 0,
    totalProductos: 0,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minProducts, setMinProducts] = useState("");
  const [minTotal, setMinTotal] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState([]);
  const [orderAsc, setOrderAsc] = useState(false);

  const { setTitle } = useOutletContext();
  useEffect(() => setTitle("Registro de Compras"), [setTitle]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        const resultado = await obtenerRegistroCompras();

        if (!resultado || !Array.isArray(resultado)) {
          throw new Error("Formato de datos inválido");
        }

        setCompras(resultado);

        const uniqueSucursales = [
          ...new Set(resultado.map((c) => c.Nombre_Sucursal || "")),
        ].filter(Boolean);
        setSucursales(uniqueSucursales);

        const totalCompras = resultado.length;
        const comprasActivas = resultado.filter((c) => c.Estado === 1).length;

        const inversionTotal = resultado.reduce(
          (total, compra) =>
            total +
            (compra.DetallesCompra?.reduce(
              (sum, d) => sum + d.Precio_Compra * d.Cantidad,
              0
            ) || 0),
          0
        );

        const totalProductos = resultado.reduce(
          (total, compra) =>
            total +
            (compra.DetallesCompra?.reduce((sum, d) => sum + d.Cantidad, 0) ||
              0),
          0
        );

        setStats({
          totalCompras,
          comprasActivas,
          comprasCanceladas: totalCompras - comprasActivas,
          inversionTotal,
          promedioCompra: totalCompras > 0 ? inversionTotal / totalCompras : 0,
          totalProductos,
        });
      } catch (error) {
        console.error("Error cargando compras:", error);
        setError(error.message);
        setCompras([]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const comprasFiltradas = compras.filter((compra) => {
    const compraDate = new Date(compra.Fecha_Compra).toISOString().slice(0, 10);
    const afterStart = !startDate || compraDate >= startDate;
    const beforeEnd = !endDate || compraDate <= endDate;

    const numProducts = Array.isArray(compra.DetallesCompra)
      ? compra.DetallesCompra.length
      : 0;
    const meetsMinProducts = !minProducts || numProducts >= Number(minProducts);

    const totalCompra =
      compra.DetallesCompra?.reduce(
        (total, d) => total + d.Precio_Compra * d.Cantidad,
        0
      ) || 0;
    const meetsMinTotal = !minTotal || totalCompra >= Number(minTotal);

    const meetsSucursal = !sucursal || compra.Nombre_Sucursal === sucursal;

    return (
      afterStart &&
      beforeEnd &&
      meetsMinProducts &&
      meetsMinTotal &&
      meetsSucursal
    );
  });

  const comprasOrdenadas = orderAsc
    ? comprasFiltradas
    : comprasFiltradas.toReversed();
  console.log("Compras del registro:", compras);

  if (loading || error) {
    return (
      <div className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center py-10">
          {loading ? (
            "Cargando compras..."
          ) : (
            <span className="text-red-500">Error: {error}</span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 relative z-10">
      {/* Estadísticas */}
      <TopSection>
        <StatCard
          name="Total Compras"
          icon={ShoppingBag}
          value={stats.totalCompras}
          color="#6366F1"
        />
        <StatCard
          name="Inversión Total"
          icon={DollarSign}
          value={`$${stats.inversionTotal.toFixed(2)}`}
          color="#EF4444"
        />
        <StatCard
          name="Promedio por Compra"
          icon={TrendingUp}
          value={`$${stats.promedioCompra.toFixed(2)}`}
          color="#3B82F6"
        />
        <StatCard
          name="Total Productos"
          icon={TrendingUp}
          value={stats.totalProductos}
          color="#8B5CF6"
        />
      </TopSection>

      {/* Filtros */}
      <motion.div
        className="flex flex-wrap justify-around items-end gap-4 px-5 my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col">
          <label className="text-slate-900 text-sm mb-1">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            className="input-filter"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-slate-900 text-sm mb-1">Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-filter"
          />
        </div>
        <div className="flex flex-col w-32">
          <label className="text-slate-900 text-sm mb-1">Mín. productos</label>
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
          <label className="text-slate-900 text-sm mb-1">
            Mín. inversión (C$)
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
          onClick={() => exportToExcel(comprasOrdenadas)}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          Exportar a Excel
        </button>
      </motion.div>
      <div className="flex justify-end px-5"></div>

      {/* Listado de Compras */}
      <motion.div
        className="flex flex-col gap-6 mx-9"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {comprasOrdenadas.map((compra) => {
          const totalCompra =
            compra.DetallesCompra?.reduce(
              (sum, d) => sum + d.Precio_Compra * d.Cantidad,
              0
            ) || 0;
          const cantidadTotal =
            compra.DetallesCompra?.reduce((sum, d) => sum + d.Cantidad, 0) || 0;

          return (
            <BoughtCard
              key={compra.ID_Entrada}
              id={compra.ID_Entrada}
              date={new Date(compra.Fecha_Compra).toLocaleDateString()}
              proveedor={compra.NombreProveedor}
              sucursal={compra.Nombre_Sucursal}
              status={compra.Estado === 1 ? "Completada" : "Cancelada"}
              amount={cantidadTotal}
              total={totalCompra}
              products={
                compra.DetallesCompra?.map((d) => ({
                  name: d.NombreProducto,
                  unitPrice: d.Precio_Compra,
                  quantity: d.Cantidad,
                })) || []
              }
            />
          );
        })}

        {comprasOrdenadas.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No se encontraron compras registradas
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RegistroCompra;
