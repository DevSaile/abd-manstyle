import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DefaultImageIcon = () => (
  <div className="flex items-center justify-center w-full h-full bg-gray-800">
    <svg
      className="w-24 h-24 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 48 48"
    >
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" fill="none"/>
      <circle cx="18" cy="18" r="4" stroke="currentColor" />
      <path d="M6 36l10-10 7 7 9-9 10 10" stroke="currentColor" />
    </svg>
  </div>
);

const CatalogProductCard = ({ producto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCardClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Destructure product properties
  const {
    Nombre: name,
    Precio_Producto: price,
    Descripcion_Categoria: category,
    Cantidad: stock,
    url_image: image,
    Marca: brand,
    Descripcion_Sucursal: sucursal,
    Detalles: descripcion,
  } = producto;

  return (
    <>
      <div
        className="bg-transparent border border-gray-700 rounded-lg p-4 shadow-md hover:border-white cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Product Image */}
        <div className="w-full h-44 bg-gray-800 rounded-lg overflow-hidden mb-4">
          {image ? (
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={name}
            />
          ) : (
            <DefaultImageIcon />
          )}
        </div>
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-100 truncate">{name}</h3>
        {/* Product Price */}
        <p className="text-sm text-gray-300 mt-2 mb-3">
          <span className="font-medium">Precio:</span> <strong>C${price}</strong>
        </p>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#10131a] text-white border border-blue-700 rounded-2xl shadow-2xl w-full max-w-md md:max-w-2xl mx-2 relative flex flex-col md:grid md:grid-cols-2"
              style={{ maxHeight: "90vh" }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 text-2xl z-10"
                onClick={handleClose}
              >
                ✕
              </button>

              {/* Left: Image + info (desktop), stacked on mobile */}
              <div className="flex flex-col items-center md:items-stretch">
                <div className="w-full aspect-square bg-gray-900 flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="object-cover w-full h-full"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  ) : (
                    <DefaultImageIcon />
                  )}
                </div>
                  <div className="md:hidden w-full px-6 py-2">
    <h2 className="text-xl font-bold text-blue-400 text-center">{name}</h2>
  </div>

                {/* Info below image on desktop, stacked on mobile */}
                <div className="w-full flex flex-col gap-2 px-6 py-4 md:py-6">
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Sucursal:</span>
                    <span className="font-semibold text-blue-300">{sucursal}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Precio:</span>
                    <span className="font-semibold text-green-400">C${price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Stock:</span>
                    <span className="font-semibold text-yellow-300">{stock}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Marca:</span>
                    <span className="font-semibold text-purple-300">{brand}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Categoría:</span>
                    <span className="font-semibold text-pink-300">{category}</span>
                  </div>
                </div>
              </div>

              {/* Right: Product name + description */}
              <div className="flex flex-col justify-start p-6 md:p-8 w-full">
                <div className="mb-4">
                  <span className="block text-2xl font-bold text-blue-400 mb-2">{name}</span>
                </div>
                <div className="bg-gray-950 rounded-xl p-4">
                  <span className="block text-gray-300 text-base whitespace-pre-line">{descripcion}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CatalogProductCard;