import { useState, useEffect } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import BoughtCard from "../../components/registroscompra/BoughtCard";
import { obtenerRegistroCompras } from "../../services/CompraHitorialService";

const RegistroCompra = () => {
  const [compras, setCompras] = useState([]);
  const [stats, setStats] = useState({
    totalCompras: 0,
    comprasActivas: 0,
    comprasCanceladas: 0,
    inversionTotal: 0,
    promedioCompra: 0,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const comprasData = await obtenerRegistroCompras();
        setCompras(comprasData);

        // Calcular estadísticas
        const total = comprasData.length;
        const activas = comprasData.filter(c => c.Estado === 1).length;
        const totalInversion = comprasData.reduce(
          (sum, c) => sum + (c.Precio_Compra * c.CantidadCompra),
          0
        );

        setStats({
          totalCompras: total,
          comprasActivas: activas,
          comprasCanceladas: total - activas,
          inversionTotal: totalInversion,
          promedioCompra: total > 0 ? totalInversion / total : 0,
        });
      } catch (error) {
        console.error("Error cargando compras:", error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Registro de Compras"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Compras" icon={ShoppingBag} value={stats.totalCompras} color="#6366F1" />
          <StatCard name="Compras Activas" icon={CheckCircle} value={stats.comprasActivas} color="#10B981" />
          <StatCard name="Compras Canceladas" icon={Clock} value={stats.comprasCanceladas} color="#F59E0B" />
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
        </motion.div>

        {/* Listado de Compras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compras.map((compra) => {
            const total = compra.Precio_Compra ?? 0;
            const cantidad = compra.CantidadCompra ?? 0;

            return (
              <BoughtCard
                key={compra.ID_Entrada}
                date={new Date(compra.Fecha_Compra).toLocaleDateString()}
                amount={cantidad}
                total={total}
                amountGiven={total * cantidad}
                exchange={(compra.Precio_Producto - total) * cantidad || 0} // puedes ajustarlo cuando tengas Precio_Producto
                products={[
                  {
                    name: compra.Nombre_Producto || "Producto",
                    unitPrice: total,
                    quantity: cantidad,
                  },
                ]}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default RegistroCompra;
