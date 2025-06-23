import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Truck,
  Building,
  CheckCircle,
  XCircle
} from "lucide-react";

const BoughtCard = ({
  id,
  date,
  proveedor,
  sucursal,
  status,
  amount,
  total,
  products = [],
}) => {
  const [expanded, setExpanded] = useState(false);

  // Calcular total pagado (suma de todos los productos)
  const totalPagado = products.reduce((sum, p) => sum + (p.unitPrice * p.quantity), 0);
  
  // Calcular ganancia potencial (asumiendo que tienes precio de venta)
  const gananciaPotencial = products.reduce((sum, p) => {
    const precioVenta = p.precioVenta || (p.unitPrice * 1.3); // Ejemplo: 30% de margen
    return sum + ((precioVenta - p.unitPrice) * p.quantity);
  }, 0);

  return (
    <motion.div
      className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-300 ring-1 ring-blue-500/30"
      whileHover={{ y: -3, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.10)" }}
    >
      <div className="relative px-4 pt-6 pb-2 sm:p-6">
        {/* Encabezado con información básica */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg flex items-center text-blue-900">
              <Truck className="mr-2 text-blue-400" size={18} />
              Compra #{id}
            </h3>
            <p className="text-sm text-blue-600 flex items-center mt-1">
              <Building className="mr-2 text-purple-400" size={16} />
              {sucursal}
            </p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs flex items-center ${
            status === "Completada" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {status === "Completada" ? (
              <CheckCircle className="mr-1" size={14} />
            ) : (
              <XCircle className="mr-1" size={14} />
            )}
            {status}
          </div>
        </div>

        {/* Información resumida */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="flex items-center text-sm text-blue-700">
            <Calendar className="mr-2 text-yellow-400" size={18} />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center justify-center text-sm text-blue-700">
            <ShoppingBag className="mr-2 text-green-400" size={18} />
            <span>{amount} items</span>
          </div>
          
          <div className="flex items-center justify-end text-sm text-blue-700">
            <DollarSign className="mr-2 text-purple-400" size={18} />
            <span>C${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón para expandir */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:text-blue-700 transition flex items-center"
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

      {/* Contenido expandido */}
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
                  <th className="text-right">P. Compra</th>
                  <th className="text-right">Cantidad</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-blue-100 hover:bg-blue-50/60">
                    <td className="py-3">{product.name}</td>
                    <td className="text-right">C${product.unitPrice.toFixed(2)}</td>
                    <td className="text-right">{product.quantity}</td>
                    <td className="text-right font-medium">
                      C${(product.unitPrice * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Resumen financiero */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-blue-700">Total invertido:</p>
                <p className="text-xl font-bold text-green-700">
                  C${totalPagado.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-blue-700">Ganancia potencial:</p>
                <p className="text-xl font-bold text-blue-700">
                  C${gananciaPotencial.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BoughtCard;