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
        className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg cursor-pointer hover:scale-[1.02] transition"
      >
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
        <p className="text-sm text-green-500 font-bold mt-2">${price}</p>
        <p className="text-xs text-gray-400">Stock: {stock}</p>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#10131a] text-white border border-blue-700 rounded-2xl shadow-2xl max-w-4xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 relative"
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 text-2xl"
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
                    className="rounded-xl object-contain max-h-96 w-full bg-gray-800 mb-4"
                  />
                ) : (
                  <p className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2">
                    No hay imagen disponible
                  </p>
                )}
                <div className="flex flex-col gap-1 mt-2 w-full">
                  <span className="text-xs text-blue-300 font-semibold">
                    <span className="font-bold">Marca:</span> {brand}
                  </span>
                  <span className="text-xs text-blue-300 font-semibold">
                    <span className="font-bold">Sucursal:</span> {sucursal}
                  </span>
                  <span className="text-xs text-blue-300 font-semibold">
                    <span className="font-bold">Categoría:</span> {category}
                  </span>
                </div>
              </div>

              {/* Info (right) */}
              <div className="flex flex-col gap-4 justify-center">
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">Nombre del producto</span>
                  <span className="block bg-gray-900 rounded-lg px-4 py-2 font-bold text-base">{name}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">Precio de Venta</span>
                  <span className="block bg-gray-900 rounded-lg px-4 py-2 font-semibold text-blue-400">${price}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">Stock disponible</span>
                  <span className="block bg-gray-900 rounded-lg px-4 py-2">{stock}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-semibold mb-1">Descripción</span>
                  <span className="block bg-gray-900 rounded-lg px-4 py-2 text-sm text-gray-200 max-h-40 overflow-y-auto whitespace-pre-line">
                    {descripcion}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    onClick={() => { onEdit?.(); handleClose(); }}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
                  >
                    Editar producto
                  </button>
                  <button
                    onClick={() => { onDelete?.(); handleClose(); }}
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