import { motion } from "framer-motion";
import { Image, Info } from "lucide-react";
import { Button } from "@rewind-ui/core";
import { useState } from "react";

const ProductCardSales = ({
  name,
  Sucursal,
  price,
  brand,
  category,
  stock,
  image,
  onClick,
  onClickDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md flex gap-4 items-center cursor-pointer p-3 transition-transform"
        onClick={onClick}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.15, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.97,
          boxShadow: "-3px 3px 1px rgba(0, 0, 0, 0.10)",
          transition: { duration: 0.08, ease: "easeIn" },
        }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        {/* Image */}
        <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-lg shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="object-contain max-h-full max-w-full rounded"
            />
          ) : (
            <Image size={32} className="text-blue-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-blue-900 truncate">{name}</h3>
          <p className="text-xs text-blue-700">C${price}</p>
          <div className="flex flex-wrap gap-1 mt-1 items-center">
            {brand && (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                {brand}
              </span>
            )}
            {category && (
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                {category}
              </span>
            )}
      
            <span className="text-[10px] text-gray-400 ml-2">Stock: {stock}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 items-end">
          {onClickDelete && (
            <Button
              size="xs"
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete();
              }}
            >
              Eliminar
            </Button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Ver detalles"
          >
            <Info size={18} />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Detalles del Producto</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              <li><strong>Nombre:</strong> {name}</li>
              <li><strong>Precio:</strong> C${price}</li>
              <li><strong>Marca:</strong> {brand || "N/A"}</li>
              <li><strong>Categoría:</strong> {category || "N/A"}</li>
              <li><strong>Sucursal:</strong> {Sucursal || "N/A"}</li>
              <li><strong>Stock:</strong> {stock}</li>
            </ul>
            <Button
              className="mt-4"
              onClick={() => setShowModal(false)}
              color="blue"
              fullWidth
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardSales;
