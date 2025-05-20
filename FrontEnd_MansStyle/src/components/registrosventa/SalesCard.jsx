import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  UserCircle,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp
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
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
      whileHover={{ y: -3, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4)" }}
    >
      <div className='relative px-4 pt-6 pb-2 sm:p-6'>
        {/* Top Corners */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center text-sm text-gray-400'>
            <User className='mr-2 text-blue-400' size={18} />
            <span>Empleado: {employee || "N/A"}</span>
          </div>
          <div className='flex items-center justify-end text-sm text-gray-400'>
            <UserCircle className='mr-2 text-green-400' size={18} />
            <span>Sucursal: {client || "N/A"}</span>
          </div>
        </div>

        {/* Bottom Corners */}
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex items-center text-sm text-gray-400'>
            <Calendar className='mr-2 text-yellow-400' size={18} />
            <span>Fecha: {date || "Sin fecha"}</span>
          </div>
          <div className='flex items-center justify-end text-sm text-gray-400'>
            <DollarSign className='mr-2 text-purple-400' size={18} />
            <span>Total: C${parseFloat(total || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Expand Button */}
        <div className='flex justify-center mt-4'>
          <button onClick={() => setExpanded(!expanded)} className='text-gray-400 hover:text-gray-200 transition'>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
      {expanded && (
          <motion.div
            className='px-4 pb-6'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <table className='w-full text-sm text-left text-gray-300 mt-2'>
              <thead className='text-xs uppercase text-gray-400 border-b border-gray-600'>
                <tr>
                  <th className='py-2'>Product</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className='border-b border-gray-700'>
                    <td className='py-2'>{p.name || "N/A"}</td>
                    <td>C${parseFloat(p.unitPrice || 0).toFixed(2)}</td>
                    <td>{p.quantity || 0}</td>
                    <td>C${(parseFloat(p.unitPrice || 0) * parseInt(p.quantity || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='mt-4 text-sm text-gray-300'>
              <p>Cantidad Recibida: <span className='text-gray-100'>C${parseFloat(amountGiven || 0).toFixed(2)}</span></p>
              <p>Cambio: <span className='text-gray-100'>C${parseFloat(exchange || 0).toFixed(2)}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SaleCard;
