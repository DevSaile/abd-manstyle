import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  UserCircle,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  StoreIcon
} from "lucide-react";

const SaleCard = ({
  employee,
  client,
  date,
  total,
  products = [],
  amountGiven,
  exchange
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-300 ring-1 ring-blue-500/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -3, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.10)" }}
    >
      <div className="relative px-4 pt-6 pb-2 sm:p-6">
        {/* Row layout for main info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Empleado y Sucursal */}
          <div className="flex flex-row gap-6 flex-1">
            <div className="flex items-center text-sm text-blue-900">
              <User className="mr-2 text-blue-400" size={18} />
              <span>Empleado: {employee || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm text-blue-900">
              <StoreIcon className="mr-2 text-green-400" size={18} />
              <span>Sucursal: {client || "N/A"}</span>
            </div>
          </div>
          {/* Fecha y Total */}
          <div className="flex flex-row gap-6 flex-1 md:justify-end">
            <div className="flex items-center text-sm text-blue-900">
              <Calendar className="mr-2 text-yellow-400" size={18} />
              <span>Fecha: {date || "Sin fecha"}</span>
            </div>
            <div className="flex items-center text-sm text-blue-900">
              <DollarSign className="mr-2 text-purple-400" size={18} />
              <span>Total: C${parseFloat(total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Expand Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:text-blue-900 transition flex items-center"
          >
            {expanded ? (
              <>
                <ChevronUp size={20} className="mr-1" />
                <span>Menos detalles</span>
              </>
            ) : (
              <>
                <ChevronDown size={20} className="mr-1" />
                <span>Más detalles</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="px-4 pb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <table className="w-full text-sm text-left text-blue-900 mt-2">
              <thead className="text-xs uppercase text-blue-700 border-b border-blue-200">
                <tr>
                  <th className="py-2">Producto</th>
                  <th>Precio Unidad</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-b border-blue-100 hover:bg-blue-50/60">
                    <td className="py-2">{p.name || "N/A"}</td>
                    <td>C${parseFloat(p.unitPrice || 0).toFixed(2)}</td>
                    <td>{p.quantity || 0}</td>
                    <td>
                      C${(parseFloat(p.unitPrice || 0) * parseInt(p.quantity || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-blue-700">Cantidad Recibida:</p>
                <p className="text-xl font-bold text-green-700">
                  C${parseFloat(amountGiven || 0).toFixed(2)}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-blue-700">Cambio:</p>
                <p className="text-xl font-bold text-blue-700">
                  C${parseFloat(exchange || 0).toFixed(2)}
                </p>
              </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SaleCard;