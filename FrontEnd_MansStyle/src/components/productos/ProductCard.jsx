import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalDescarte from "./ModalDescarte";
import { DescartarProducto } from "@/services/productosService";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  refrescarProductos,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDescarte, setOpenDescarte] = useState(false);

  const handleCardClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const isAdmin =
    localStorage.getItem("rol") === "Administrador" ? true : false;

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
    ID_Producto,
  } = product;

  const handleConfirmDescarte = async (cantidadDescarte) => {
    if (!product?.ID_Producto) return;

    try {
      await DescartarProducto(product.ID_Producto, {
        ID_Producto: product.ID_Producto,
        Descarte: cantidadDescarte,
      });
      refrescarProductos();
    } catch (error) {
      console.error("Error al descartar el producto:", error);
    }
    };

  return (
    <>
      <motion.div
        layoutId={`card-${name}`}
        onClick={() => {
          handleCardClick();
        }}
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
        <div className="w-full h-[60%] aspect-square max-h-[60%] rounded-lg overflow-hidden border border-blue-100 mb-3 bg-gray-100 self-center">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
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
              className="bg-white text-slate-900 border border-blue-200 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col md:flex-row gap-6 mx-4 relative"
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

              {/* Left: Image + info */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden mb-4">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="object-cover w-full h-full"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  ) : (
                    <p className="text-gray-500">No hay imagen disponible</p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Marca:</span>
                    <span className="font-semibold text-blue-700">{brand}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Sucursal:</span>
                    <span className="font-semibold text-blue-700">
                      {sucursal}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Categoría:</span>
                    <span className="font-semibold text-blue-700">
                      {category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Stock:</span>
                    <span className="font-semibold text-blue-700">{stock}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="text-gray-400">Precio:</span>
                    <span className="font-semibold text-blue-700">
                      ${price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Product name + description + actions */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="mb-4">
                  <span className="block text-2xl font-bold text-blue-700 mb-2">
                    {name}
                  </span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                  <span className="block text-slate-900 text-base whitespace-pre-line">
                    {descripcion}
                  </span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          onEdit?.(product);
                          handleClose();
                        }}
                        className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
                      >
                        Editar producto
                      </button>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            onDelete?.(product);
                            handleClose();
                          }}
                          className="bg-white hover:bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-semibold border border-blue-700 transition w-full"
                        >
                          Eliminar
                        </button>
                        {stock>0 && (
                        <button
                          onClick={() => setOpenDescarte(true)}
                          className="bg-white hover:bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-semibold border border-blue-700 transition"
                        >
                          Descartar
                        </button>)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal para descartar productos */}
      <ModalDescarte
        open={openDescarte}
        onClose={() => {
          setOpenDescarte(false);
        }}
        onConfirm={handleConfirmDescarte}
        maxCantidad={stock}
        productoNombre={name}
      />
    </>
  );
};

export default ProductCard;
