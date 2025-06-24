import { useState, useEffect } from "react";
import {
  Clock,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/common/StatCard";
import BoughtCard from "@/components/registroscompra/BoughtCard";
import { obtenerRegistroCompras } from "@/services/CompraHitorialService";
import { useOutletContext } from "react-router-dom";
import TopSection from "@/components/common/TopSection";


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

  // Filtros
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minProducts, setMinProducts] = useState("");
  const [minTotal, setMinTotal] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState([]);
  const [orderAsc, setOrderAsc] = useState(false);
   const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Registro de Compras");
  }, [setTitle]);


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

        // Sucursales únicas para el filtro
        const uniqueSucursales = Array.from(
          new Set(resultado.map((c) => c.Nombre_Sucursal || ""))
        ).filter((s) => s);
        setSucursales(uniqueSucursales);

        // Calcular estadísticas
        const totalCompras = resultado.length;
        const comprasActivas = resultado.filter((c) => c.Estado === 1).length;

        const inversionTotal = resultado.reduce((total, compra) => {
          return (
            total +
            (compra.DetallesCompra?.reduce((sum, detalle) => {
              return sum + detalle.Precio_Compra * detalle.Cantidad;
            }, 0) || 0)
          );
        }, 0);

        const totalProductos = resultado.reduce((total, compra) => {
          return (
            total +
            (compra.DetallesCompra?.reduce((sum, detalle) => {
              return sum + detalle.Cantidad;
            }, 0) || 0)
          );
        }, 0);

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

  // Aplicar filtros
  const comprasFiltradas = compras.filter((compra) => {
    // Fecha
    const compraDate = new Date(compra.Fecha_Compra);
    const compraDateStr = compraDate.toISOString().slice(0, 10);
    const afterStart = !startDate || compraDateStr >= startDate;
    const beforeEnd = !endDate || compraDateStr <= endDate;

    // Número de productos
    const numProducts = Array.isArray(compra.DetallesCompra)
      ? compra.DetallesCompra.length
      : 0;
    const meetsMinProducts = !minProducts || numProducts >= Number(minProducts);

    // Total de la compra
    const totalCompra =
      compra.DetallesCompra?.reduce((total, detalle) => {
        return total + detalle.Precio_Compra * detalle.Cantidad;
      }, 0) || 0;
    const meetsMinTotal = !minTotal || totalCompra >= Number(minTotal);

    // Sucursal
    const meetsSucursal = !sucursal || compra.Nombre_Sucursal === sucursal;

    return (
      afterStart &&
      beforeEnd &&
      meetsMinProducts &&
      meetsMinTotal &&
      meetsSucursal
    );
  });

  // Ordenar según el estado
  const comprasOrdenadas = orderAsc
    ? comprasFiltradas
    : comprasFiltradas.toReversed();

  if (loading) {
    return (
      <div className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center py-10">Cargando compras...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative z-10 overflow-y-auto">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
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
        </motion.div>

        {/* Filtros */}
        {/* Filtros */}
        <div className="flex flex-wrap justify-around gap-2 mb-6 items-end">
          <div className="flex flex-col">
            <label className="text-blue-900 text-sm mb-1">Desde</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white text-blue-900 placeholder-blue-400 rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-900 text-sm mb-1">Hasta</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white text-blue-900 placeholder-blue-400 rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-white text-blue-900 placeholder-blue-400 rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-36">
            <label className="text-blue-900 text-sm mb-1">
              Mín. inversión (C$)
            </label>
            <input
              type="number"
              min={0}
              value={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
              placeholder="Ej: 100"
              className="bg-white text-blue-900 placeholder-blue-400 rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-44">
            <label className="text-blue-900 text-sm mb-1">Sucursal</label>
            <select
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
              className="bg-white text-blue-900 rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>

        {/* Listado de Compras */}
        <div className="flex flex-col gap-6">
          {comprasOrdenadas.map((compra) => {
            // Calcular total de la compra sumando todos los detalles
            const totalCompra =
              compra.DetallesCompra?.reduce((total, detalle) => {
                return total + detalle.Precio_Compra * detalle.Cantidad;
              }, 0) || 0;

            // Calcular cantidad total de productos en la compra
            const cantidadTotal =
              compra.DetallesCompra?.reduce((total, detalle) => {
                return total + detalle.Cantidad;
              }, 0) || 0;

            return (
              <BoughtCard
                key={compra.ID_Entrada}
                id={compra.ID_Entrada}
                date={new Date(compra.Fecha_Compra).toLocaleDateString()}
                proveedor={compra.NombreProveedor}
                sucursal={compra.Nombre_Sucursal}
                status={compra.Estado === 1 ? "Completada" : "Cancelada"}
                amount={compra.DetallesCompra?.length || 0}
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
        </div>

        {comprasOrdenadas.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No se encontraron compras registradas
          </div>
        )}
      </main>
    </div>
  );
};

export default RegistroCompra;
