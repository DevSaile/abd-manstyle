import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCardClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Destructure product properties for easier access
  const {
    Nombre: name,
    Precio_Producto: price,
    Descripcion_Categoria: category,
    Cantidad: stock,
    url_image: image,
    Marca: brand,
    Descripcion_Sucursal: sucursal,
    Detalles: descripcion,
  } = product;

  return (
    <>
      <motion.div
        layoutId={`card-${name}`}
        onClick={handleCardClick}
        className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md transition-transform cursor-pointer flex flex-col h-full"
        initial={{
          boxShadow: "-6px 6px 1px rgba(0, 0, 0, 0.15)",
        }}
        whileHover={{
          scale: 1.03,
          y: -6,
          x: 6,
          boxShadow: "-12px 12px 2px rgba(0, 0, 0, 0.18)",
          transition: { duration: 0.15, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.97,
          boxShadow: "-3px 3px 1px rgba(0, 0, 0, 0.10)",
          transition: { duration: 0.08, ease: "easeIn" },
        }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-36 object-cover rounded-lg border border-blue-100 mb-3 bg-gray-100"
        />
        <div className="flex-1 flex flex-col justify-between px-4 pb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800">{name}</h3>
            <p className="text-xs text-blue-600 font-medium">{category}</p>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-xs text-gray-400">Stock: {stock}</span>
            <span className="text-lg font-bold text-blue-600">${price}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div
            layoutId={`card-${name}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
           
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-slate-900 border border-blue-200 rounded-2xl shadow-2xl max-w-3xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 text-2xl"
                onClick={handleClose}
              >
                ✕
              </button>

              {/* Image (left) */}
              <div className="flex flex-col items-center">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="rounded-xl object-contain max-h-96 w-full bg-gray-100 border border-blue-100 mb-4"
                  />
                ) : (
                  <p className="bg-gray-100 text-gray-500 rounded-lg px-4 py-2">
                    No hay imagen disponible
                  </p>
                )}
                <div className="flex flex-col gap-1 mt-2 w-full">
                  <span className="text-xs text-blue-700 font-semibold">
                    <span className="font-bold">Marca:</span> {brand}
                  </span>
                  <span className="text-xs text-blue-700 font-semibold">
                    <span className="font-bold">Sucursal:</span> {sucursal}
                  </span>
                  <span className="text-xs text-blue-700 font-semibold">
                    <span className="font-bold">Categoría:</span> {category}
                  </span>
                </div>
              </div>

              {/* Info (right) */}
              <div className="flex flex-col gap-4 justify-center">
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">
                    Nombre del producto
                  </span>
                  <span className="block bg-blue-50 rounded-lg px-4 py-2 font-bold text-base text-blue-900 border border-blue-100">
                    {name}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">
                    Precio de Venta
                  </span>
                  <span className="block bg-blue-50 rounded-lg px-4 py-2 font-semibold text-blue-700 border border-blue-100">
                    ${price}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">
                    Stock disponible
                  </span>
                  <span className="block bg-blue-50 rounded-lg px-4 py-2 text-blue-900 border border-blue-100">
                    {stock}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">
                    Descripción
                  </span>
                  <span className="block bg-blue-50 rounded-lg px-4 py-2 text-sm text-blue-900 max-h-40 overflow-y-auto whitespace-pre-line border border-blue-100">
                    {descripcion}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    onClick={() => {
                      onEdit?.();
                      handleClose();
                    }}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
                  >
                    Editar producto
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.();
                      handleClose();
                    }}
                    className="bg-white hover:bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-semibold border border-blue-700 transition"
                  >
                    Eliminar producto
                  </button>
                  <span className="text-xs text-gray-400 pt-2 text-center">
                    * Puedes editar o eliminar este producto desde aquí.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
