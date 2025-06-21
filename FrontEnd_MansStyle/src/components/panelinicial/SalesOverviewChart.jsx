import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ObtenerVentasPorDiaSemana } from "../../services/SucursalService";

const SalesOverviewChart = ({ idSucursal }) => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        setLoading(true);
        const data = await ObtenerVentasPorDiaSemana(idSucursal);

        // Mapear los datos al formato que esperan los recharts
        const formattedData = data.map((item) => ({
          name: item.Name,
          sales: item.Sales,
        }));

        setSalesData(formattedData);
      } catch (err) {
        console.error("Error fetching sales data:", err);
        setError("Error al cargar datos de ventas");
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, [idSucursal]);

  if (loading) {
    return (
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 min-h-[372px] flex items-center justify-center">
        <p className="text-gray-400">Cargando datos de ventas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 min-h-[372px] flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!salesData || salesData.length === 0) {
    return (
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 min-h-[372px] flex items-center justify-center">
        <p className="text-gray-400">No hay datos de ventas disponibles</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-blue-50 shadow-custom rounded-xl p-6 border "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Ventas por día</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#cbd5e1",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => [`$${value}`, "Ventas"]}
              labelStyle={{ fontWeight: "bold", color: "#6366F1" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
