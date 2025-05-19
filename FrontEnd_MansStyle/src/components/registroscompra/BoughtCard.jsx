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
  // Esto es un ejemplo - ajusta según tu lógica de negocio
  const gananciaPotencial = products.reduce((sum, p) => {
    const precioVenta = p.precioVenta || (p.unitPrice * 1.3); // Ejemplo: 30% de margen
    return sum + ((precioVenta - p.unitPrice) * p.quantity);
  }, 0);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -3, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4)" }}
    >
      <div className="relative px-4 pt-6 pb-2 sm:p-6">
        {/* Encabezado con información básica */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <Truck className="mr-2 text-blue-400" size={18} />
              Compra #{id}
            </h3>
            <p className="text-sm text-gray-400 flex items-center mt-1">
              <Building className="mr-2 text-purple-400" size={16} />
              {sucursal}
            </p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs flex items-center ${
            status === "Completada" 
              ? "bg-green-900 text-green-300" 
              : "bg-red-900 text-red-300"
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
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="mr-2 text-yellow-400" size={18} />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center justify-center text-sm text-gray-400">
            <ShoppingBag className="mr-2 text-green-400" size={18} />
            <span>{amount} items</span>
          </div>
          
          <div className="flex items-center justify-end text-sm text-gray-400">
            <DollarSign className="mr-2 text-purple-400" size={18} />
            <span>${total.toFixed(2)}</span>
          </div>
        </div>


        {/* Botón para expandir */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-200 transition flex items-center"
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
            <table className="w-full text-sm text-left text-gray-300 mt-2">
              <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
                <tr>
                  <th className="py-2">Producto</th>
                  <th className="text-right">P. Compra</th>
                  <th className="text-right">Cantidad</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="py-3">{product.name}</td>
                    <td className="text-right">${product.unitPrice.toFixed(2)}</td>
                    <td className="text-right">{product.quantity}</td>
                    <td className="text-right font-medium">
                      ${(product.unitPrice * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Resumen financiero */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-gray-400">Total invertido:</p>
                <p className="text-xl font-bold text-green-400">
                  ${totalPagado.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-gray-400">Ganancia potencial:</p>
                <p className="text-xl font-bold text-blue-400">
                  ${gananciaPotencial.toFixed(2)}
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