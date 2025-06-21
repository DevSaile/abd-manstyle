import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { obtenerProductosPorCategoria } from "../../services/SucursalService";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SellsPerCategory = ({ idSucursal }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener datos por categoría
    obtenerProductosPorCategoria(idSucursal).then((data) => {
      // Mapeamos la respuesta para que coincida con la estructura del gráfico
      const formattedData = data.map((item) => ({
        name: item.Categoria,
        value: item.Cantidad,
      }));
      setCategoryData(formattedData);
    });
  }, [idSucursal]);

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-slate-300 shadow-custom"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-[#282A33] mb-4">
        Distribución por Categoría
      </h2>{" "}
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#cbd5e1",
              }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ color: "#334155", fontSize: 14 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SellsPerCategory;
