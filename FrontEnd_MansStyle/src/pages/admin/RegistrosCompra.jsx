import { useState, useEffect } from "react";
import { Clock, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import BoughtCard from "../../components/registroscompra/BoughtCard";
import { obtenerRegistroCompras } from "../../services/CompraHitorialService";

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

        // Calcular estadísticas mejoradas
        const totalCompras = resultado.length;
        const comprasActivas = resultado.filter(c => c.Estado === 1).length;
        
        // Calcular inversión total sumando todos los detalles
        const inversionTotal = resultado.reduce((total, compra) => {
          return total + (compra.DetallesCompra?.reduce((sum, detalle) => {
            return sum + (detalle.Precio_Compra * detalle.Cantidad);
          }, 0) || 0);
        }, 0);

        // Calcular total de productos comprados
        const totalProductos = resultado.reduce((total, compra) => {
          return total + (compra.DetallesCompra?.reduce((sum, detalle) => {
            return sum + detalle.Cantidad;
          }, 0) || 0);
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

  if (loading) {
    return (
      <div className="flex-1 relative z-10 overflow-auto">
        <Header title={"Registro de Compras"} />
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center py-10">Cargando compras...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 relative z-10 overflow-auto">
        <Header title={"Registro de Compras"} />
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center py-10 text-red-500">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

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
          <StatCard 
            name="Total Compras" 
            icon={ShoppingBag} 
            value={stats.totalCompras} 
            color="#6366F1" 
          />
          <StatCard 
            name="Compras Activas" 
            icon={ShoppingBag} 
            value={stats.comprasActivas} 
            color="#10B981" 
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

        {/* Listado de Compras */}
        <div className="grid grid-cols-1 gap-6">
          {compras.map((compra) => {
            // Calcular total de la compra sumando todos los detalles
            const totalCompra = compra.DetallesCompra?.reduce((total, detalle) => {
              return total + (detalle.Precio_Compra * detalle.Cantidad);
            }, 0) || 0;

            // Calcular cantidad total de productos en la compra
            const cantidadTotal = compra.DetallesCompra?.reduce((total, detalle) => {
              return total + detalle.Cantidad;
            }, 0) || 0;

            return (
              <BoughtCard
                key={compra.ID_Entrada}
                id={compra.ID_Entrada}
                date={new Date(compra.Fecha_Compra).toLocaleDateString()}
                proveedor={compra.NombreProveedor}
                sucursal={compra.Nombre_Sucursal} // este de aqui esta directamente seteado en Compra_Detalles
                status={compra.Estado === 1 ? "Completada" : "Cancelada"}
                amount={compra.DetallesCompra?.length || 0}
                total={compra.DetallesCompra?.reduce((sum, d) => sum + (d.Precio_Compra * d.Cantidad), 0) || 0}
                products={compra.DetallesCompra?.map(d => ({
                  name: d.NombreProducto,
                  unitPrice: d.Precio_Compra, // o sea que eso de SUCURSAL iria directamente seteadito aqui
                  quantity: d.Cantidad,
                })) || []}
              />
            );
          })}
        </div>

        {compras.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No se encontraron compras registradas
          </div>
        )}
      </main>
    </div>
  );
};

export default RegistroCompra;